// Vercel Edge Function — scrapes listing URLs and extracts details via Claude Haiku
// 10 requests/hour per IP (in-memory, resets on cold start)

const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour
const hits = new Map();

function rateCheck(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Periodic cleanup to prevent memory leak on long-lived instances
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now - entry.start > RATE_WINDOW) hits.delete(ip);
  }
}, 5 * 60 * 1000);

const EXTRACT_PROMPT = `You are a real estate listing data extractor. Given raw HTML from a property listing page, extract the listing details.

Return ONLY valid JSON with these fields:
{
  "address": "Full street address or null",
  "price": 750000,
  "beds": 3,
  "baths": 2,
  "sqft": 1800,
  "description": "A natural 3-5 sentence description of the property covering key features, layout, lot, and location. Write it as MLS remarks — not bullet points. Synthesize all available details into flowing prose.",
  "features": ["Notable features: garage, pool, finished basement, hardwood floors, etc."],
  "town": "Town or city name or null",
  "state": "State abbreviation or null"
}

Rules:
- price must be a number (no $ or commas), or null if not found
- beds, baths, sqft must be numbers or null
- features should be an array of strings, or empty array
- For the description, synthesize everything you can find into natural prose — address, layout, finishes, lot, location context
- Extract from whatever is available: JSON-LD structured data, meta tags, og:tags, visible text, title tags
- If a field truly cannot be determined, use null
- Return ONLY the JSON object, nothing else`;

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateCheck(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in a few minutes." }), {
      status: 429,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
      return new Response(JSON.stringify({ error: "Invalid URL" }), {
        status: 400,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    // --- Fetch the listing page ---
    let html;
    try {
      const pageRes = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      if (!pageRes.ok) {
        return new Response(JSON.stringify({ error: "Couldn't reach that URL — paste the details manually." }), {
          status: 422,
          headers: { ...corsHeaders(), "Content-Type": "application/json" },
        });
      }
      html = await pageRes.text();
    } catch (fetchErr) {
      console.error("Fetch error:", fetchErr.message);
      return new Response(JSON.stringify({ error: "Couldn't reach that URL — paste the details manually." }), {
        status: 422,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    // --- Early bail: blocked or empty pages ---
    if (html.length < 500 || /captcha|please verify|access denied/i.test(html.slice(0, 5000))) {
      return new Response(JSON.stringify({ error: "That site blocked the request — paste the details manually." }), {
        status: 422,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    // --- Extract JSON-LD blocks before stripping scripts (highest signal data) ---
    const jsonLdBlocks = [];
    html.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      (_, content) => { jsonLdBlocks.push(content.trim()); return ""; });

    // --- Extract meta tags (og:, description, etc.) ---
    const metaTags = [];
    html.replace(/<meta[^>]*>/gi, (tag) => {
      const name = tag.match(/(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
      const content = tag.match(/content=["']([^"']+)["']/i)?.[1] || "";
      if (content && /description|og:|title|price|address|location/i.test(name)) {
        metaTags.push(`${name}: ${content}`);
      }
      return "";
    });

    // --- Strip heavy tags ---
    let cleaned = html;
    cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "");
    cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");
    cleaned = cleaned.replace(/<svg[\s\S]*?<\/svg>/gi, "");
    cleaned = cleaned.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");
    // Strip remaining HTML tags, keep text
    cleaned = cleaned.replace(/<[^>]+>/g, " ");
    // Collapse whitespace
    cleaned = cleaned.replace(/\s{2,}/g, " ").trim();

    // --- Build the content for Haiku, prioritizing structured data ---
    let userContent = "";
    if (jsonLdBlocks.length > 0) {
      userContent += "=== JSON-LD STRUCTURED DATA ===\n" + jsonLdBlocks.join("\n\n") + "\n\n";
    }
    if (metaTags.length > 0) {
      userContent += "=== META TAGS ===\n" + metaTags.join("\n") + "\n\n";
    }
    userContent += "=== PAGE TEXT ===\n" + cleaned.slice(0, 30000);

    // Truncate total to 40K chars
    userContent = userContent.slice(0, 40000);

    // --- Call Claude Haiku for extraction ---
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: EXTRACT_PROMPT,
        messages: [{ role: "user", content: userContent }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Anthropic API error:", res.status, errText);
      return new Response(JSON.stringify({ error: "Extraction service unavailable. Try again." }), {
        status: 502,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    // Parse JSON — strip markdown fences if present
    let jsonStr = text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse Haiku response:", jsonStr.slice(0, 500));
      return new Response(JSON.stringify({ error: "Couldn't extract details — paste them manually." }), {
        status: 502,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    // Validate we got something useful
    if (!parsed.description && !parsed.price && !parsed.address) {
      return new Response(JSON.stringify({ error: "Couldn't find listing details on that page — paste them manually." }), {
        status: 422,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Scrape handler error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong — paste the details manually." }), {
      status: 500,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
