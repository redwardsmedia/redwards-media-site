import { useState, useRef, useCallback } from "react";
import { AddressInput } from "./AddressInput";

// ============================================================
// Reel Scripter by Redwards Media
// Listing Reel Script Writer — Instagram Reels
// Brand: Charcoal / Redwood / Warm White
// Fonts: Playfair Display + DM Sans
// ============================================================

const B = {
  bg: "var(--color-sand-light)", surface: "#FFFFFF", surfaceAlt: "var(--color-sand)",
  card: "#FFFFFF", cardHover: "#FEFDFB", cardBorder: "var(--color-cream)",
  charcoal: "var(--color-charcoal)", charcoalSoft: "var(--color-charcoal-light)",
  redwood: "var(--color-redwood)", redwoodSoft: "var(--color-redwood-soft)",
  redwoodBg: "#AE4A3E0C", redwoodBorder: "#AE4A3E22",
  sage: "var(--color-sage)", gold: "#B8943E", sky: "#5A7F94",
  textPri: "var(--color-charcoal)", textSec: "#6B6560", textMut: "#A39E98", textLt: "#C4BFB8",
  border: "var(--color-cream)", borderFocus: "#D4CCC2",
  shadow: "0 1px 3px rgba(44,41,38,0.04), 0 4px 12px rgba(44,41,38,0.03)",
  shadowLift: "0 4px 20px rgba(44,41,38,0.08)",
  r: 14, rs: 10,
  sans: "var(--font-body)", serif: "var(--font-display)",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// Prompts live server-side in /prompts/*.js (see scripter-v2 Commit 1).
// This file builds the variable input blob that the server substitutes into the template.

// ═══════════════════════════════════════
// PRICE PARSER
// ═══════════════════════════════════════

function parsePrice(input) {
  if (!input) return 0;
  const s = input.toString().toLowerCase().replace(/[$,\s]/g, "").trim();
  const cleaned = s.replace(/[^0-9.a-z]/g, "");
  if (!cleaned) return 0;

  const mMatch = cleaned.match(/^([0-9]*\.?[0-9]+)\s*(m|mil|million)?$/);
  const kMatch = cleaned.match(/^([0-9]*\.?[0-9]+)\s*(k|thousand)?$/);

  if (mMatch && (mMatch[2] || parseFloat(mMatch[1]) < 200)) {
    const num = parseFloat(mMatch[1]);
    if (mMatch[2]) return Math.round(num * 1_000_000);
    if (num < 200) return Math.round(num * 1_000_000);
    return Math.round(num);
  }
  if (kMatch && kMatch[2]) {
    return Math.round(parseFloat(kMatch[1]) * 1_000);
  }
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  if (num < 200) return Math.round(num * 1_000_000);
  if (num < 1000) return Math.round(num * 1_000);
  return Math.round(num);
}

function formatPrice(p) {
  if (!p || p === 0) return "";
  if (p >= 1_000_000) return "$" + (p / 1_000_000).toFixed(p % 1_000_000 === 0 ? 0 : 1) + "M";
  return "$" + (p / 1_000).toFixed(0) + "K";
}

function priceTier(price) {
  const p = parsePrice(price);
  if (!p || p === 0) return "";
  if (p < 600_000) return `\nPRICE TIER: VALUE MARKET (under $600K)\nThe price IS the story. Lead with affordability, opportunity, access.\n- Hook: Price should appear in hook or overlay. "$475K in Medford" stops scrollers.\n- Buyer: First-time buyers, investors, people priced out of nearby towns. Calculating monthly payments.\n- Focus: Price-to-value ratio, location vs expensive areas, investment potential, what you GET for this price.\n- Skip: Don't oversell finishes. Be honest about condition — buyers here respect transparency.\n- Tone: Excited, direct, "look what I found." This is a deal, not a lifestyle pitch.\n- CTA: Urgency. Affordable listings move fast.`;
  if (p < 1_000_000) return `\nPRICE TIER: MIDDLE MARKET ($600K-$1M)\nBalance of value and lifestyle. Features and price both matter.\n- Hook: Price can appear but isn't the lead. Feature-first, price validates.\n- Buyer: Move-up buyers, young families, professionals comparing neighborhoods.\n- Focus: Layout, outdoor space, neighborhood, commute, updates. Practical lifestyle benefits.\n- Skip: Generic "great for entertaining." Be specific about how spaces work.\n- Tone: Knowledgeable, helpful. "Let me show you why this works."\n- CTA: Neighborhood expertise. Agent as local guide.`;
  if (p < 1_500_000) return `\nPRICE TIER: UPPER MARKET ($1M-$1.5M)\nLifestyle-forward. Show them HOW they'll live here.\n- Hook: Lead with lifestyle detail or neighborhood prestige, not price.\n- Buyer: Established professionals, executives. Owned before, know what they want.\n- Focus: Quality of finishes, outdoor living, primary suite, kitchen as social center, school reputation.\n- Skip: Basic specs. Describe the PRIMARY SUITE, not "3 beds." Nothing standard for this price.\n- Tone: Confident, elevated but not pretentious. Conversational authority.\n- CTA: Exclusive access. "I can get you in before it hits market."`;
  if (p < 3_000_000) return `\nPRICE TIER: PREMIUM ($1.5M-$3M)\nStory-driven. The property has a narrative — find it.\n- Hook: Never lead with price. Lead with story, the unexpected detail, what makes this unlike anything else.\n- Buyer: High-net-worth buying on emotion, justifying with logic. Choosing a lifestyle.\n- Focus: Architectural detail, provenance, land, privacy, views, bespoke features. The story behind the finishes.\n- Skip: Square footage, room counts, basic amenities. Nobody cares about granite at $2M.\n- Tone: Assured, unhurried. Less is more. Every word carries weight. This overrides casual/warm/urgent tone selections — the price tier sets the floor.\n- CTA: Discretion. "Reach out privately for details."`;
  return `\nPRICE TIER: LUXURY ($3M+)\nAspirational. Cinematic. This is a lifestyle film, not a listing video.\n- Hook: Create a FEELING in 3 seconds. Dramatic reveal, single evocative line. Price is NEVER mentioned — not in hook, not in body, not in CTA.\n- Buyer: Ultra-high-net-worth buying identity, legacy, a feeling. Decisions are emotional.\n- Focus: Architecture, land, privacy, views, provenance, bespoke craft. How a space makes you FEEL. One extraordinary quality > a list of features.\n- Skip: Everything standard. No room counts, no "open concept," no amenity lists, no square footage.\n- Tone: ALWAYS cinematic regardless of tone selection. Measured. Almost literary. Short deliberate sentences. Let silence do work. If agent selected "casual," interpret as relaxed confidence — never informal.\n- Retention line: At this tier, the retention moment should be a visual beat, not a spoken redirect. "And then there's this room." not "But wait there's more."\n- CTA: Invitation, not pitch. "I'd love to walk you through this privately." Never "DM me [keyword]" — that's beneath this tier.`;
}

// ═══════════════════════════════════════
// INPUT BUILDERS (prompt templates live in /prompts/*.js)
// ═══════════════════════════════════════

// Strip URLs from details before sending to API
const cleanDetails = (d) => d.replace(/https?:\/\/[^\s]+/gi, "").replace(/www\.[^\s]+/gi, "").trim();

const notesBlock = (fb) => fb && fb.trim() ? `\n\nAGENT NOTES: "${fb.trim()}" — incorporate this.` : "";
const toneBlock = (tone) => tone && tone.trim() ? `\nAgent voice: ${tone.trim()}` : "";
const addressBlock = (data) => {
  const addr = data.address;
  if (addr?.formatted) return `ADDRESS: ${addr.formatted}\n\n`;
  if (data.addressText && data.addressText.trim()) return `ADDRESS: ${data.addressText.trim()}\n\n`;
  return "";
};

function buildListingHooksInput(data, fb) {
  return `${addressBlock(data)}LISTING DETAILS:
"""
${cleanDetails(data.details)}
"""${priceTier(data.price)}${notesBlock(fb)}${toneBlock(data.tone)}`;
}

function buildListingBodyInput(data, analysis, fb) {
  return `${addressBlock(data)}FEATURES: ${analysis.hook_seed} | ${analysis.features.join(", ")} | For: ${analysis.target_buyer}

DETAILS: ${cleanDetails(data.details)}${priceTier(data.price)}${notesBlock(fb)}${toneBlock(data.tone)}`;
}

function buildListingPolishInput(details, hookVerbal, body) {
  return `ORIGINAL DETAILS:
${details}

HOOK (for context, don't rewrite): "${hookVerbal}"

DRAFT BODY TO REWRITE:
${body}`;
}

function formatSelectedHook(hook) {
  return `HOOK: "${hook.verbal}"
TEXT: "${hook.text_overlay}"
STRATEGY: ${hook.strategy}`;
}

async function callAI(projectType, step, input, selectedHook = null) {
  const body = { projectType, step, input };
  if (selectedHook) body.selectedHook = selectedHook;
  const r = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const text = await r.text().catch(() => "");
    if (r.status === 429) throw new Error("Rate limit hit — wait a minute and try again.");
    throw new Error(text || "API error " + r.status);
  }
  return r.json();
}

// ═══════════════════════════════════════
// SHARED STYLES
// ═══════════════════════════════════════

const focusRing = {
  onFocus: (e) => { e.target.style.borderColor = B.redwood; e.target.style.boxShadow = "0 0 0 3px rgba(174,74,62,0.08)"; },
  onBlur: (e) => { e.target.style.borderColor = B.border; e.target.style.boxShadow = B.shadow; },
};

const inputBase = {
  background: B.surface,
  border: `1.5px solid ${B.border}`,
  borderRadius: B.r,
  fontFamily: B.sans,
  color: B.charcoal,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxShadow: B.shadow,
};

const labelStyle = {
  fontFamily: B.sans, fontSize: 12, fontWeight: 600, color: B.textMut,
  textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6,
};

// ═══════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════

const Btn = ({ onClick, disabled, loading, children, secondary }) => (
  <button onClick={onClick} disabled={disabled || loading} style={{
    width: "100%", padding: secondary ? "13px" : "16px 24px",
    background: secondary ? "transparent" : (disabled ? B.surfaceAlt : B.redwood),
    border: secondary ? `1.5px solid ${B.border}` : "none", borderRadius: B.r,
    fontFamily: B.sans, fontSize: secondary ? 13 : 15, fontWeight: 600,
    color: secondary ? B.textSec : (disabled ? B.textMut : "#fff"),
    cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s",
    opacity: loading ? 0.75 : 1,
    boxShadow: !secondary && !disabled ? "0 2px 8px rgba(174,74,62,0.15)" : "none",
  }}>
    {loading ? (
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{
          width: 15, height: 15,
          border: `2px solid ${secondary ? B.border : "rgba(255,255,255,0.3)"}`,
          borderTopColor: secondary ? B.redwood : "#fff",
          borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block",
        }} />
        {secondary ? "Generating\u2026" : "Writing\u2026"}
      </span>
    ) : children}
  </button>
);

const Mic = ({ onText }) => {
  const [on, setOn] = useState(false);
  const ref = useRef(null);

  const toggle = () => {
    if (on && ref.current) { ref.current.stop(); setOn(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice not supported \u2014 try Chrome."); return; }
    const r = new SR();
    r.continuous = true; r.interimResults = false; r.lang = "en-US";
    r.onresult = (e) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
      onText(t.trim());
    };
    r.onerror = () => setOn(false);
    r.onend = () => setOn(false);
    ref.current = r; r.start(); setOn(true);
  };

  return (
    <button onClick={toggle} aria-label={on ? "Stop recording" : "Start voice input"} style={{
      width: 50, height: 50, borderRadius: "50%", flexShrink: 0,
      background: on ? B.redwood : B.surface,
      border: `1.5px solid ${on ? B.redwood : B.border}`,
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
      boxShadow: on ? "0 0 0 4px rgba(174,74,62,0.12)" : B.shadow,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : B.textMut} strokeWidth="2" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    </button>
  );
};

// Fixed bottom bar wrapper
const BottomBar = ({ children }) => (
  <div style={{
    position: "fixed", bottom: 0, left: 0, right: 0,
    padding: "16px 20px calc(env(safe-area-inset-bottom, 0px) + 24px)",
    background: `linear-gradient(transparent, ${B.bg} 35%)`,
    maxWidth: 480, margin: "0 auto",
  }}>
    {children}
  </div>
);

// ═══════════════════════════════════════
// SCREEN 1 — INPUT
// ═══════════════════════════════════════

function S1({ data, setData, onGo, loading, onScrape, scraping, scrapeErr }) {
  const [url, setUrl] = useState("");
  const ready = data.details.trim().length >= 16;
  return (
    <div style={{ padding: "24px 20px 140px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 26, fontWeight: 500, color: B.charcoal, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        What are we filming?
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 28px", lineHeight: 1.55 }}>
        {"Start with the address \u2014 we\u2019ll confirm the town from Google. Price and details come next."}
      </p>

      {/* Address */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Listing address</label>
        <AddressInput
          value={data.addressText || ""}
          onChange={(t) => setData((d) => ({ ...d, addressText: t }))}
          onSelect={(addr) => setData((d) => ({ ...d, address: addr }))}
          inputStyle={{ ...inputBase, width: "100%", padding: "14px 16px", fontSize: 15, fontWeight: 500 }}
          inputProps={focusRing}
        />
        {data.address?.town && data.address?.state && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 600, color: B.sage, background: B.sage + "0D", border: `1px solid ${B.sage}22`, padding: "3px 10px", borderRadius: 6 }}>
              {data.address.town}, {data.address.state}
            </span>
            <span style={{ fontFamily: B.sans, fontSize: 11.5, color: B.textMut }}>verified</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>List price</label>
        <input
          value={data.price || ""}
          onChange={(e) => setData((d) => ({ ...d, price: e.target.value }))}
          placeholder="750k"
          inputMode="decimal"
          style={{ ...inputBase, width: "100%", padding: "14px 16px", fontSize: 18, fontWeight: 600, letterSpacing: "0.01em" }}
          {...focusRing}
        />
        {data.price && (() => {
          const p = parsePrice(data.price);
          const tier = p < 1 ? null
            : p < 600_000 ? ["Value Market", "Price is the story", B.sage]
            : p < 1_000_000 ? ["Middle Market", "Features + value", B.sky]
            : p < 1_500_000 ? ["Upper Market", "Lifestyle-forward", B.gold]
            : p < 3_000_000 ? ["Premium", "Story-driven", B.redwood]
            : ["Luxury", "Aspirational \u00B7 cinematic", B.redwood];
          return tier ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 600, color: tier[2], background: tier[2] + "0D", border: `1px solid ${tier[2]}22`, padding: "3px 10px", borderRadius: 6 }}>
                {tier[0]}
              </span>
              <span style={{ fontFamily: B.sans, fontSize: 11.5, color: B.textMut }}>{tier[1]}</span>
              <span style={{ fontFamily: B.mono, fontSize: 10, color: B.textLt, marginLeft: "auto" }}>
                {formatPrice(p)}
              </span>
            </div>
          ) : null;
        })()}
      </div>

      {/* Details */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Listing details</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a Zillow / Redfin / MLS link"
            disabled={scraping}
            style={{ ...inputBase, flex: 1, padding: "10px 14px", fontSize: 13, borderRadius: B.rs }}
            {...focusRing}
            onKeyDown={(e) => { if (e.key === "Enter" && url.trim()) { onScrape(url.trim()); } }}
          />
          <button
            onClick={() => { if (url.trim()) onScrape(url.trim()); }}
            disabled={scraping || !url.trim()}
            style={{
              background: scraping ? B.surfaceAlt : B.surface,
              border: `1.5px solid ${B.border}`, borderRadius: B.rs,
              padding: "10px 16px", cursor: scraping ? "wait" : "pointer",
              fontFamily: B.sans, fontSize: 12, fontWeight: 600,
              color: scraping ? B.textMut : B.textSec,
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >
            {scraping ? (
              <span style={{
                width: 13, height: 13,
                border: `2px solid ${B.border}`,
                borderTopColor: B.redwood,
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
                display: "inline-block",
              }} />
            ) : "Pull"}
          </button>
        </div>
        {scrapeErr && (
          <div style={{ fontFamily: B.sans, fontSize: 12, color: B.redwood, marginBottom: 8, lineHeight: 1.4 }}>
            {scrapeErr}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={data.details}
            onChange={(e) => setData((d) => ({ ...d, details: e.target.value }))}
            placeholder={"Paste MLS remarks, type notes, or describe the property.\n\nAdd requests at the end:\n\u2022 \u201Cfocus on the backyard\u201D\n\u2022 \u201Cthis is for first-time buyers\u201D\n\u2022 \u201Cdon\u2019t mention the basement\u201D"}
            rows={7}
            style={{ ...inputBase, flex: 1, padding: "16px", fontSize: 14.5, lineHeight: 1.6, resize: "vertical" }}
            {...focusRing}
          />
          <Mic onText={(t) => setData((d) => ({ ...d, details: d.details ? d.details + " " + t : t }))} />
        </div>
      </div>

      {/* Agent voice */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>
          {"Agent voice \u00B7 optional"}
        </label>
        <input
          value={data.tone || ""}
          onChange={(e) => setData((d) => ({ ...d, tone: e.target.value }))}
          placeholder="e.g. warm and confident, like a knowledgeable friend"
          style={{ ...inputBase, width: "100%", padding: "12px 16px", fontSize: 14 }}
          {...focusRing}
        />
      </div>

      <BottomBar>
        {!data.price && data.details.trim().length > 15 && (
          <div style={{ fontFamily: B.sans, fontSize: 11.5, color: B.gold, textAlign: "center", marginBottom: 8 }}>
            Adding a price helps me calibrate the script to the right buyer.
          </div>
        )}
        {data.details.trim().length > 15 && data.details.trim().length < 45 && (
          <div style={{ fontFamily: B.sans, fontSize: 11.5, color: B.textMut, textAlign: "center", marginBottom: 8 }}>
            The more details you give me, the better the hooks. What's the standout feature?
          </div>
        )}
        <Btn onClick={onGo} disabled={!ready} loading={loading}>Generate Hook Options</Btn>
      </BottomBar>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 2 — HOOKS
// ═══════════════════════════════════════

function S2({ hooks, analysis, onPick, onRegen, onUpdateAnalysis, loading }) {
  const [fb, setFb] = useState("");
  const [editFor, setEditFor] = useState(false);
  const [forVal, setForVal] = useState(analysis?.target_buyer || "");
  const sc = { contrarian: B.redwood, curiosity: B.gold, direct: B.sage, story: B.sky };
  const sl = { contrarian: "Contrarian", curiosity: "Curiosity Gap", direct: "Direct Value", story: "Story Hook" };

  return (
    <div style={{ padding: "12px 20px 155px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 24, fontWeight: 500, color: B.charcoal, margin: "0 0 6px" }}>
        Pick your hook
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 16px", lineHeight: 1.5 }}>
        Tap the one you'd say on camera. I'll build the full script around it.
      </p>

      {analysis && (
        <div style={{ background: B.surfaceAlt, borderRadius: B.rs, padding: "12px 14px", marginBottom: 16, border: `1px solid ${B.border}` }}>
          <div style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 600, color: B.sky, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
            Identified
          </div>
          <div style={{ fontFamily: B.sans, fontSize: 13, color: B.textSec, lineHeight: 1.45 }}>
            <strong style={{ color: B.charcoal }}>Lead:</strong> {analysis.hook_seed}
          </div>
          <div style={{ fontFamily: B.sans, fontSize: 13, color: B.textSec, lineHeight: 1.45, marginTop: 2, display: "flex", alignItems: "flex-start", gap: 4 }}>
            <strong style={{ color: B.charcoal, flexShrink: 0 }}>For:</strong>
            {editFor ? (
              <div style={{ flex: 1, display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  value={forVal}
                  onChange={(e) => setForVal(e.target.value)}
                  autoFocus
                  style={{ flex: 1, fontFamily: B.sans, fontSize: 13, color: B.textSec, border: `1px solid ${B.border}`, borderRadius: 6, padding: "4px 8px", background: B.surface, outline: "none" }}
                  onKeyDown={(e) => { if (e.key === "Enter") { onUpdateAnalysis({ ...analysis, target_buyer: forVal }); setEditFor(false); } }}
                />
                <button onClick={() => { onUpdateAnalysis({ ...analysis, target_buyer: forVal }); setEditFor(false); }} style={{ background: B.sage, color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: B.sans }}>Save</button>
              </div>
            ) : (
              <span onClick={() => setEditFor(true)} style={{ cursor: "pointer", borderBottom: `1px dashed ${B.textLt}` }} title="Tap to edit">{analysis.target_buyer}</span>
            )}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {hooks.map((h, i) => {
          const c = sc[h.strategy] || B.redwood;
          return (
            <button
              key={i}
              onClick={() => onPick(h)}
              disabled={loading}
              style={{
                background: B.card, border: `1.5px solid ${B.cardBorder}`, borderRadius: B.r,
                padding: 0, cursor: loading ? "wait" : "pointer", textAlign: "left",
                overflow: "hidden", transition: "all 0.2s",
                animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
                opacity: loading ? 0.6 : 1, boxShadow: B.shadow,
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.borderColor = c; e.currentTarget.style.boxShadow = B.shadowLift; } }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = B.cardBorder; e.currentTarget.style.boxShadow = B.shadow; }}
            >
              <div style={{ padding: "10px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 700, color: c, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {sl[h.strategy]}
                </span>
                <span style={{ fontFamily: B.sans, fontSize: 11, color: B.textMut }}>
                  {loading ? "building\u2026" : "tap for full script \u2192"}
                </span>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: B.sans, fontSize: 17, fontWeight: 500, color: B.charcoal, lineHeight: 1.5, marginBottom: 10 }}>
                  &ldquo;{h.verbal}&rdquo;
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ background: B.surfaceAlt, borderRadius: 6, padding: "6px 10px", display: "inline-block", border: `1px solid ${B.border}` }}>
                    <span style={{ fontFamily: B.mono, fontSize: 10, fontWeight: 600, color: B.textSec }}>{h.text_overlay}</span>
                  </div>
                  <span style={{ fontFamily: B.sans, fontSize: 9, fontWeight: 600, color: B.textMut, textTransform: "uppercase", letterSpacing: "0.06em" }}>Text Hook</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <BottomBar>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            value={fb}
            onChange={(e) => setFb(e.target.value)}
            placeholder="more urgent\u2026 focus on the yard\u2026 less clickbaity\u2026"
            style={{ ...inputBase, flex: 1, borderRadius: 24, padding: "10px 16px", fontSize: 13 }}
            onFocus={(e) => (e.target.style.borderColor = B.redwood)}
            onBlur={(e) => (e.target.style.borderColor = B.border)}
            onKeyDown={(e) => { if (e.key === "Enter" && !loading) { onRegen(fb); setFb(""); } }}
          />
        </div>
        <Btn secondary onClick={() => { onRegen(fb); setFb(""); }} loading={loading}>
          {fb.trim() ? "Regenerate with notes" : "Show me different hooks"}
        </Btn>
      </BottomBar>
    </div>
  );
}

// ═══════════════════════════════════════
// SCREEN 3 — SCRIPT
// ═══════════════════════════════════════

function S3({ hook, body, endings, onBack, onReset, onRegenBody, loading }) {
  const [ei, setEi] = useState(0);
  const [editing, setEditing] = useState(false);
  const [et, setEt] = useState(body);
  const [copied, setCopied] = useState(false);
  const [bn, setBn] = useState("");
  const [saved, setSaved] = useState(false);

  const end = endings[ei] || endings[0];
  const ec = { payoff: B.gold, soft: B.sage, direct: B.redwood };
  const el = { payoff: "Payoff Close", soft: "Soft CTA", direct: "Direct CTA" };
  const db = editing ? et : body;

  const buildFull = useCallback(() => {
    return [
      `"${hook.verbal}"`,
      `TEXT: ${hook.text_overlay}`,
      "",
      db,
      "",
      `"${end.closing}"`,
      end.cta ? `"${end.cta}"` : "",
      end.text_overlay ? `TEXT: ${end.text_overlay}` : "",
    ].filter(Boolean).join("\n");
  }, [hook, db, end]);

  const copyScript = () => {
    navigator.clipboard.writeText(buildFull());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendScript = (method) => {
    const subject = encodeURIComponent("Reel Scripter \u2014 Listing Reel Script");
    const bodyEnc = encodeURIComponent(buildFull());
    if (method === "email") window.open(`mailto:?subject=${subject}&body=${bodyEnc}`);
    else if (method === "sms") window.open(`sms:?body=${bodyEnc}`);
    setSaved(true);
  };

  return (
    <div style={{ padding: "12px 20px 110px", animation: "fadeUp 0.25s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontFamily: B.serif, fontSize: 24, fontWeight: 500, color: B.charcoal, margin: 0 }}>Your script</h2>
        <button onClick={onBack} style={{ background: "none", border: "none", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: B.redwood, cursor: "pointer" }}>
          \u2190 Different hook
        </button>
      </div>

      {/* Hook */}
      <div style={{ background: B.redwoodBg, border: `1px solid ${B.redwoodBorder}`, borderRadius: B.r, padding: "14px 16px", marginBottom: 10 }}>
        <div style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 700, color: B.redwood, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
          Hook
        </div>
        <div style={{ fontFamily: B.serif, fontSize: 16, fontWeight: 500, color: B.charcoal, lineHeight: 1.45 }}>
          &ldquo;{hook.verbal}&rdquo;
        </div>
        <div style={{ marginTop: 8 }}>
          <span style={{ background: B.surface, borderRadius: 6, padding: "4px 10px", fontFamily: B.mono, fontSize: 10, fontWeight: 600, color: B.textSec, border: `1px solid ${B.border}` }}>
            {hook.text_overlay}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: B.card, border: `1.5px solid ${B.cardBorder}`, borderRadius: B.r, overflow: "hidden", marginBottom: 10, boxShadow: B.shadow }}>
        <div style={{ padding: "10px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 700, color: B.gold, textTransform: "uppercase", letterSpacing: "0.06em" }}>Body</span>
          <button
            onClick={() => { if (editing) setEditing(false); else { setEt(body); setEditing(true); } }}
            style={{ background: "none", border: "none", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: editing ? B.redwood : B.textMut, cursor: "pointer" }}
          >
            {editing ? "Done editing" : "Edit"}
          </button>
        </div>
        {!editing && (
          <div style={{ padding: "6px 16px 10px", display: "flex", gap: 8 }}>
            <input
              value={bn}
              onChange={(e) => setBn(e.target.value)}
              placeholder="shorter\u2026 more energy\u2026 skip the basement\u2026"
              style={{ ...inputBase, flex: 1, borderRadius: 20, padding: "8px 14px", fontSize: 12, background: B.surfaceAlt, border: `1px solid ${B.border}` }}
              onKeyDown={(e) => { if (e.key === "Enter" && !loading) { onRegenBody(bn); setBn(""); } }}
            />
            <button
              onClick={() => { onRegenBody(bn); setBn(""); }}
              disabled={loading}
              style={{
                background: B.surfaceAlt, border: `1px solid ${B.border}`, borderRadius: 20,
                padding: "7px 14px", cursor: loading ? "wait" : "pointer",
                fontFamily: B.sans, fontSize: 11, fontWeight: 600, color: B.textSec, whiteSpace: "nowrap",
              }}
            >
              {loading ? "\u2026" : "Rewrite"}
            </button>
          </div>
        )}
        {editing ? (
          <textarea
            value={et}
            onChange={(e) => setEt(e.target.value)}
            rows={14}
            style={{
              width: "100%", boxSizing: "border-box", background: B.surfaceAlt,
              border: "none", padding: "14px 16px", fontFamily: B.sans, fontSize: 14,
              lineHeight: 1.65, color: B.charcoal, resize: "vertical", outline: "none",
            }}
          />
        ) : (
          <div style={{ padding: "14px 16px", fontFamily: B.sans, fontSize: 14, lineHeight: 1.7, color: B.charcoal, whiteSpace: "pre-wrap" }}>
            {db}
          </div>
        )}
      </div>

      {/* Ending */}
      <div style={{ background: B.card, border: `1.5px solid ${B.cardBorder}`, borderRadius: B.r, overflow: "hidden", marginBottom: 10, boxShadow: B.shadow }}>
        <div style={{ padding: "10px 16px", borderBottom: `1px solid ${B.border}` }}>
          <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 700, color: ec[end.type] || B.sage, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {el[end.type] || "Ending"}
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontFamily: B.serif, fontSize: 15, color: B.charcoal, lineHeight: 1.5, marginBottom: end.cta ? 8 : 0 }}>
            &ldquo;{end.closing}&rdquo;
          </div>
          {end.cta && <div style={{ fontFamily: B.sans, fontSize: 13, color: B.textSec, lineHeight: 1.45 }}>{end.cta}</div>}
          {end.text_overlay && (
            <div style={{ marginTop: 8 }}>
              <span style={{ background: B.surfaceAlt, borderRadius: 6, padding: "4px 10px", fontFamily: B.mono, fontSize: 10, fontWeight: 600, color: B.textMut, border: `1px solid ${B.border}` }}>
                {end.text_overlay}
              </span>
            </div>
          )}
        </div>
        <div style={{ padding: "8px 16px 12px", borderTop: `1px solid ${B.border}`, display: "flex", gap: 8 }}>
          {endings.map((e, i) => (
            <button
              key={i}
              onClick={() => setEi(i)}
              style={{
                flex: 1, padding: "8px 0", borderRadius: 8, cursor: "pointer",
                background: i === ei ? (ec[e.type] || B.sage) + "0D" : "transparent",
                border: `1.5px solid ${i === ei ? (ec[e.type] || B.sage) : B.border}`,
                fontFamily: B.sans, fontSize: 11, fontWeight: 600,
                color: i === ei ? B.charcoal : B.textMut, transition: "all 0.2s",
              }}
            >
              {el[e.type]}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onReset} style={{ background: "none", border: "none", fontFamily: B.sans, fontSize: 12, color: B.textMut, cursor: "pointer", padding: "4px 0" }}>
        Start a new script
      </button>

      {/* Save / share */}
      {!saved ? (
        <div style={{ marginTop: 10, padding: "10px 14px", background: B.surfaceAlt, borderRadius: B.rs, border: `1px solid ${B.border}` }}>
          <div style={{ fontFamily: B.sans, fontSize: 11.5, color: B.textSec, marginBottom: 8 }}>
            Send yourself a copy so you don't lose it:
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["email", "Email it"], ["sms", "Text it"]].map(([m, label]) => (
              <button key={m} onClick={() => sendScript(m)} style={{
                flex: 1, padding: "9px", background: B.surface, border: `1px solid ${B.border}`,
                borderRadius: 8, cursor: "pointer", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: B.charcoal,
              }}>
                {label}
              </button>
            ))}
            <button onClick={() => { navigator.clipboard.writeText(buildFull()); setSaved(true); }} style={{
              flex: 1, padding: "9px", background: B.surface, border: `1px solid ${B.border}`,
              borderRadius: 8, cursor: "pointer", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: B.charcoal,
            }}>
              Just copy
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 10, fontFamily: B.sans, fontSize: 11.5, color: B.sage, textAlign: "center" }}>
          Script saved. You're good to go.
        </div>
      )}

      <BottomBar>
        <button onClick={copyScript} style={{
          width: "100%", padding: "16px 24px",
          background: copied ? B.sage : B.redwood,
          border: "none", borderRadius: B.r,
          fontFamily: B.sans, fontSize: 15, fontWeight: 600, color: "#fff",
          cursor: "pointer", transition: "all 0.25s",
          boxShadow: copied ? "0 2px 8px rgba(122,148,104,0.2)" : "0 2px 8px rgba(174,74,62,0.15)",
        }}>
          {copied ? "\u2713 Copied to clipboard" : "Copy Full Script"}
        </button>
      </BottomBar>
    </div>
  );
}

// ═══════════════════════════════════════
// PASSWORD GATE
// ═══════════════════════════════════════

function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem("rs_auth") === "1"; } catch { return false; }
  });
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!pw.trim()) return;
    setLoading(true); setErr(false);
    try {
      const r = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        try { sessionStorage.setItem("rs_auth", "1"); } catch {}
        setAuthed(true);
      } else {
        setErr(true); setPw("");
      }
    } catch {
      setErr(true);
    }
    setLoading(false);
  };

  if (authed) return children;

  return (
    <div style={{
      width: "100%", maxWidth: 480, minHeight: "100dvh", margin: "0 auto",
      background: B.bg, fontFamily: B.sans,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontFamily: B.serif, fontSize: 28, fontWeight: 500, color: B.charcoal, marginBottom: 4 }}>Reel Scripter</div>
        <div style={{ fontFamily: B.sans, fontSize: 13, color: B.textMut }}>by Redwards Media</div>
      </div>
      <div style={{ width: "100%", maxWidth: 300 }}>
        <input
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => { if (e.key === "Enter" && pw.trim()) submit(); }}
          type="password"
          placeholder="Access code"
          autoFocus
          autoComplete="off"
          style={{
            ...inputBase, width: "100%", padding: "14px 16px", fontSize: 16,
            textAlign: "center", letterSpacing: "0.08em", marginBottom: 12,
            borderColor: err ? "#C2452E" : B.border,
          }}
          onFocus={(e) => { if (!err) e.target.style.borderColor = B.redwood; }}
          onBlur={(e) => { if (!err) e.target.style.borderColor = B.border; }}
        />
        {err && (
          <div style={{ fontFamily: B.sans, fontSize: 12, color: "#AE4A3E", textAlign: "center", marginBottom: 8 }}>
            Wrong code. Try again.
          </div>
        )}
        <Btn onClick={submit} disabled={!pw.trim()} loading={loading}>Enter</Btn>
      </div>
      <div style={{ marginTop: 40, fontFamily: B.sans, fontSize: 11, color: B.textLt, textAlign: "center", lineHeight: 1.5 }}>
        Client access only.<br />Contact Rohan for your access code.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// APP
// ═══════════════════════════════════════

export default function ReelScripterApp() {
  return (
    <PasswordGate>
      <ReelScripter />
    </PasswordGate>
  );
}

function ReelScripter() {
  const [sc, setSc] = useState(0);
  const [ld, setLd] = useState(false);
  const [er, setEr] = useState("");
  const [data, setData] = useState({ details: "", tone: "", price: "", addressText: "", address: null });
  const [hooks, setHooks] = useState([]);
  const [an, setAn] = useState(null);
  const [hook, setHook] = useState(null);
  const [body, setBody] = useState("");
  const [ends, setEnds] = useState([]);
  const [scraping, setScraping] = useState(false);
  const [scrapeErr, setScrapeErr] = useState("");

  const scrapeUrl = async (url) => {
    setScraping(true); setScrapeErr("");
    try {
      const r = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Couldn't pull from this URL");
      // Auto-fill price if extracted and user hasn't set one
      setData((prev) => {
        const n = { ...prev };
        if (d.price && !prev.price) n.price = String(d.price);
        // Build details string
        const parts = [];
        if (d.address) parts.push(d.address);
        if (d.beds || d.baths || d.sqft) {
          const specs = [];
          if (d.beds) specs.push(d.beds + " bed");
          if (d.baths) specs.push(d.baths + " bath");
          if (d.sqft) specs.push(Number(d.sqft).toLocaleString() + " sqft");
          parts.push(specs.join(" · "));
        }
        if (d.description) parts.push(d.description);
        if (d.features?.length) parts.push("Features: " + d.features.join(", "));
        if (d.town && d.state) parts.push(d.town + ", " + d.state);
        n.details = parts.join("\n");
        return n;
      });
    } catch (e) {
      setScrapeErr(e.message || "Couldn't pull from this URL — paste the details manually.");
    }
    setScraping(false);
  };

  const go = async (fn) => {
    setLd(true); setEr("");
    try { await fn(); }
    catch (e) { setEr(e.message || "Something went wrong. Try again."); console.error(e); }
    setLd(false);
  };

  const genH = () => go(async () => {
    const r = await callAI("listing", "hooks", buildListingHooksInput(data, null));
    setHooks(r.hooks); setAn(r.analysis); setSc(1);
  });

  const pickH = (h) => go(async () => {
    setHook(h);
    const cd = cleanDetails(data.details);
    const r = await callAI("listing", "body", buildListingBodyInput(data, an, null), formatSelectedHook(h));
    // Polish pass — editor rewrites the body for natural speech
    const pr = await callAI("listing", "polish", buildListingPolishInput(cd, h.verbal, r.body));
    setBody(pr.body || r.body); setEnds(r.endings || []); setSc(2);
  });

  const reH = (fb) => go(async () => {
    const r = await callAI("listing", "hooks", buildListingHooksInput(data, fb));
    setHooks(r.hooks); setAn(r.analysis);
  });

  const reB = (fb) => go(async () => {
    const cd = cleanDetails(data.details);
    const r = await callAI("listing", "body", buildListingBodyInput(data, an, fb), formatSelectedHook(hook));
    // Polish pass — editor rewrites the body for natural speech
    const pr = await callAI("listing", "polish", buildListingPolishInput(cd, hook.verbal, r.body));
    setBody(pr.body || r.body); setEnds(r.endings || []);
  });

  const rst = () => {
    setSc(0); setData({ details: "", tone: "", price: "", addressText: "", address: null });
    setHooks([]); setAn(null); setHook(null);
    setBody(""); setEnds([]); setEr("");
    setScrapeErr("");
  };

  return (
    <div style={{ width: "100%", maxWidth: 480, minHeight: "100dvh", margin: "0 auto", background: B.bg, fontFamily: B.sans, color: B.charcoal }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform:rotate(360deg) } }
        textarea::placeholder, input::placeholder { color:${B.textLt} }
        * { -webkit-tap-highlight-color:transparent; box-sizing:border-box }
        ::-webkit-scrollbar { display:none }
        body { background:${B.bg}; margin:0 }
      `}</style>

      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(250,248,245,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${B.border}`, padding: "16px 20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: B.serif, fontSize: 18, fontWeight: 500, color: B.charcoal }}>Reel Scripter</span>
            <span style={{
              fontFamily: B.sans, fontSize: 9, fontWeight: 600, color: B.redwoodSoft,
              background: B.redwoodBg, border: `1px solid ${B.redwoodBorder}`,
              padding: "3px 8px", borderRadius: 5, letterSpacing: "0.04em", textTransform: "uppercase",
            }}>
              by Redwards Media
            </span>
          </div>
          {sc > 0 && (
            <button onClick={rst} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: B.textMut }}>
              New
            </button>
          )}
        </div>
      </div>

      {er && (
        <div style={{
          margin: "12px 20px", padding: "12px 16px",
          background: "#FDF2F2", border: "1px solid #F0CDCD", borderRadius: B.rs,
          fontFamily: B.sans, fontSize: 13, color: "#8B3A3A",
        }}>
          {er}
        </div>
      )}

      {sc === 0 && <S1 data={data} setData={setData} onGo={genH} loading={ld} onScrape={scrapeUrl} scraping={scraping} scrapeErr={scrapeErr} />}
      {sc === 1 && <S2 hooks={hooks} analysis={an} onPick={pickH} onRegen={reH} onUpdateAnalysis={setAn} loading={ld} />}
      {sc === 2 && <S3 hook={hook} body={body} endings={ends} onBack={() => { setSc(1); setBody(""); setEnds([]); }} onReset={rst} onRegenBody={reB} loading={ld} />}
    </div>
  );
}
