// Vercel Edge Function — validates access codes
// Supports comma-separated codes in REELSCRIPTER_PASSWORD env var
// e.g. "ryanaccone2026,karinameija2026,master123"

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

  const envPassword = process.env.REELSCRIPTER_PASSWORD;
  if (!envPassword) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }

  try {
    const { password } = await req.json();
    if (!password || typeof password !== "string") {
      return new Response(JSON.stringify({ error: "Missing password" }), {
        status: 400,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    // Support comma-separated codes — case-insensitive, trimmed
    const validCodes = envPassword.split(",").map((c) => c.trim().toLowerCase());
    const attempt = password.trim().toLowerCase();

    if (validCodes.includes(attempt)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid code" }), {
      status: 401,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
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
