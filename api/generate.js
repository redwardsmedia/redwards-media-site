// Vercel Edge Function — proxies Claude API with rate limiting.
// 30 requests/hour per IP (in-memory, resets on cold start).
//
// Contract (scripter-v2):
//   POST { projectType, step, input, selectedHook? }
//   projectType: "listing" (v1 parity). "neighborhood" + "sold-story" land in later commits.
//   step: "hooks" | "body" | "polish"
//   input: the variable portion of the prompt (built client-side)
//   selectedHook: required for step="body", formatted hook string
//
// Prompt files live in /prompts/*.js and expose { SYSTEM, USER_TEMPLATE }.
// USER_TEMPLATE placeholders: {userInput}, {selectedHook}.

import * as listingHooks from "../prompts/listingHooks.js";
import * as listingBody from "../prompts/listingBody.js";
import * as listingPolish from "../prompts/listingPolish.js";

const PROMPTS = {
  "listing-hooks": listingHooks,
  "listing-body": listingBody,
  "listing-polish": listingPolish,
};

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 2048;

const RATE_LIMIT = 30;
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

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now - entry.start > RATE_WINDOW) hits.delete(ip);
  }
}, 5 * 60 * 1000);

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateCheck(ip)) {
    return json({ error: "Rate limit exceeded. Try again in a few minutes." }, 429);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: "Server misconfigured" }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { projectType, step, input, selectedHook } = body;
  if (!projectType || !step) {
    return json({ error: "Missing projectType or step" }, 400);
  }

  const promptKey = `${projectType}-${step}`;
  const prompt = PROMPTS[promptKey];
  if (!prompt) {
    return json({ error: `Unknown prompt: ${promptKey}` }, 400);
  }

  if (step === "body" && !selectedHook) {
    return json({ error: "selectedHook is required for step=body" }, 400);
  }

  const system = prompt.SYSTEM;
  const user = prompt.USER_TEMPLATE
    .split("{userInput}").join(input || "")
    .split("{selectedHook}").join(selectedHook || "");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Anthropic API error:", res.status, errText);
      return json({ error: "AI service error" }, 502);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Claude response as JSON:", cleaned.slice(0, 500));
      return json({ error: "Failed to parse script. Try again." }, 502);
    }

    return json(parsed, 200);
  } catch (err) {
    console.error("Generate handler error:", err);
    return json({ error: "Internal server error" }, 500);
  }
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
