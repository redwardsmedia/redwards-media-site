import { useState, useRef, useCallback } from "react";

// ============================================================
// Reel Scripter by Redwards Media
// Listing Reel Script Writer — Instagram Reels
// Brand: Charcoal / Redwood / Warm White
// Fonts: Playfair Display + DM Sans
// ============================================================

const B = {
  bg: "#FAF8F5", surface: "#FFFFFF", surfaceAlt: "#F3EFE9",
  card: "#FFFFFF", cardHover: "#FEFDFB", cardBorder: "#E8E2DA",
  charcoal: "#2C2926", charcoalSoft: "#4A4541",
  redwood: "#AE4A3E", redwoodSoft: "#C47068",
  redwoodBg: "#AE4A3E0C", redwoodBorder: "#AE4A3E22",
  sage: "#7A9468", gold: "#B8943E", sky: "#5A7F94",
  textPri: "#2C2926", textSec: "#6B6560", textMut: "#A39E98", textLt: "#C4BFB8",
  border: "#E8E2DA", borderFocus: "#D4CCC2",
  shadow: "0 1px 3px rgba(44,41,38,0.04), 0 4px 12px rgba(44,41,38,0.03)",
  shadowLift: "0 4px 20px rgba(44,41,38,0.08)",
  r: 14, rs: 10,
  sans: "'DM Sans', -apple-system, sans-serif",
  serif: "'Playfair Display', Georgia, serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// ═══════════════════════════════════════
// PROMPTS
// ═══════════════════════════════════════

const SYS = `You are Reel Scripter, a script writer for professional Instagram Reel listing tours. Produced videos: gimbal, drone, multiple angles, edited with transitions and music.
TARGET: 45-60 second Reel. 105-130 words at 140-150 WPM.
STRUCTURE — every section has a STRATEGIC PURPOSE that the viewer should never feel:
[0-10s] HOOK: Agent ON-CAMERA. Stop the scroll. The algorithm decides here.
[10-18s] FIRST REWARD: Deliver value immediately. Viewers who stayed past the hook need to feel it was worth it — even if they leave at 15 seconds, they got something. This is how you earn the right to keep going. The most visual, tangible, lifestyle-connected feature goes here.
[18-22s] RETENTION RESET: The natural drop-off point. One line that reopens curiosity — not by teasing generically, but by signaling that the BEST part hasn't happened yet. This must feel like a genuine moment of excitement from the agent, not a scripted redirect. IMPORTANT — vary these. Never default to "But honestly." Use a DIFFERENT pattern each time:
  - Location shift: "And then I walked out back." / "Step outside for a second."
  - Reveal tease: "But that's not even what sold me." / "The listing sheet doesn't mention this part."
  - Perspective flip: "Here's what the photos don't show you." / "Forget the specs for a second."
  - Emotional: "I actually paused here." / "This room changed the whole showing."
  Pick the one that fits the property. Never repeat across scripts.
[22-32s] CONTRAST + SHAREABILITY: A different CATEGORY from the first feature. The brain finds pattern changes interesting — if we were inside, go outside. If we showed polished, show raw potential. Include one detail specific enough that a viewer would DM this Reel to a friend house-hunting in this area. That DM share is the strongest signal for reaching new audiences.
[32-42s] PEAK + SAVE TRIGGER: Energy rises. This is the emotional high point — not the CTA. A market insight, a surprising number, a perspective that makes someone tap "save." Saves tell the algorithm "this is worth coming back to." The information here should be useful BEYOND this specific listing — a neighborhood fact, a market observation, a pricing insight.
[42-50s] CLOSE + CALLBACK: Agent back ON-CAMERA. Resolve the hook's open loop. The ending should reference the opening — this circular structure triggers rewatches, which multiply watch time. The CTA feels earned because the viewer just got 40 seconds of genuine value.
THE INVISIBLE STRATEGY PRINCIPLE:
Every line in the script serves a strategic purpose (retention, shareability, saves, rewatches). But the viewer should NEVER feel strategy. They should feel like they're watching someone who genuinely loves real estate walk them through a property. The strategy is the architecture. The human voice is the experience. When these are in tension, the human voice wins — a line that feels natural but is slightly less "optimized" always beats a line that's strategically perfect but sounds written.
ENGAGEMENT TRIGGERS — weave these in naturally, at least 3 per script:
1. SHAREABILITY: A detail so locally specific someone would text this Reel to a friend ("Nine thousand square feet in Bedford — that basically doesn't exist anymore")
2. SAVE-WORTHY: Information useful beyond this listing ("Single families in this town start over a million")
3. OPEN LOOP: A promise from the hook that doesn't resolve until the close
4. CONTRAST: Two things compared — renovated vs. raw, inside vs. outside, price vs. what you get
5. SPECIFICITY: A precise number that builds credibility ("Closed in 14 days" / "Built in 1927")
6. CALLBACK: The ending references the opening, creating a loop that triggers rewatches
These should never feel inserted. They should feel like the natural observations of someone who knows this market.
PILLARS — every script activates at least 2, woven in naturally:
- TRUST: One honest agent perspective that sounds like a real opinion, not marketing
- VALUE: One insight useful beyond this listing — market context, buyer strategy, neighborhood knowledge
- CREDIBILITY: One specific number that grounds the script in reality
- ENTERTAINMENT: One moment of surprise, awe, or delight — the reveal, the contrast, the unexpected
ANTI-GENERIC: Never use stunning/gorgeous/dream home/nestled/boasts/charming/turnkey/sought-after/breathtaking/meticulously/gem/endless potential. Never "Are you looking for..." Max 2 adjectives in a row. Max 15 words per spoken line. Specs become lifestyle benefits. Agent is the star.
HOW THE BODY SHOULD SOUND:
The body is voiceover over B-roll. Think high-energy listing tour — you're walking the viewer through the home with ENTHUSIASM and SPECIFICS. Pack features in. Sell the lifestyle. Paint the picture of what it's like to LIVE here.
THE ENERGY:
- Lead with excitement and forward momentum. "Step inside to sun-splashed open-concept living." / "The first floor flows — living room, dining, generous kitchen, right out to a newer deck."
- Stack features with energy: "Three bedrooms, updated full bath, plus a bonus room on the third floor perfect for a home office."
- Sell the LIFESTYLE, not just the specs: "This backyard is THE place to relax, entertain, and enjoy all summer." / "Minutes from downtown shops, restaurants, two commuter rail stops."
- Location sells — always tie in what's nearby: "A stone's throw from the commuter rail, a short stroll to vibrant downtown shops and cozy cafés."
- Use action verbs that MOVE the viewer through: "Step inside," "Discover," "Head upstairs," "Walk out to"
- Paint what's POSSIBLE: "The flexible third floor offers endless possibilities — additional bedroom, home office, creative studio."
EXAMPLES OF THE VIBE:
"Step inside — warm, inviting, sun-splashed space. The first floor flows: living room to dining room to this generous kitchen. Seamless access to a newer deck that makes indoor-outdoor entertaining effortless."
"Three levels of versatile living space, four-car parking, plus your own private backyard retreat — complete with inground pool. Minutes from bustling downtown shops, restaurants, and two commuter rail stops."
"The main level is built for elevated living. Open-concept chef's kitchen with Thermador range, Sub-Zero refrigeration, a massive center island, and a full butler's pantry. Plus a rare main-level junior suite."
FEATURE STACKING PATTERN — use this rhythm throughout the body:
Feature → Lifestyle implication → Visual payoff.
Example: "Chef's kitchen with a ten-foot island" → "this is where every holiday dinner happens" → "and it opens straight out to the deck."
Don't just list features. Show how someone LIVES with them.
PACING:
- Ideal line length: 7-13 words. Max 15.
- Vary the rhythm. Alternate short punches ("Nine thousand square feet. Flat.") with slightly longer descriptive lines ("The first floor flows from living room to dining to this generous kitchen.")
- After a big reveal, a short line lets it land. Let a beautiful shot breathe without words on top.
Rules for the body:
- PACK IN THE FEATURES. Every line should deliver something specific and valuable. Don't waste words on vague reactions.
- Lines sound like SPEECH but with ENERGY. Fragments. Contractions. Enthusiasm. Things a real person would say while walking someone through a house they're excited about.
- Address the viewer directly: "You're looking at two units and all of this land." / "This is YOUR retreat." This keeps voiceover engaging.
- Sell what's POSSIBLE, not just what IS. "The basement already has plumbing in place — that's a future full bath waiting to happen."
- One genuine agent opinion mid-body that builds trust — but keep the energy up. Not cool detachment, more "I was genuinely impressed by this."
- Location and convenience are features. Always work in proximity to shops, transit, schools, downtown, highways when relevant.
TONE OVERRIDE: If a PRICE TIER is provided, it takes priority over tone selection for voice and approach. A $4M listing always sounds cinematic regardless of tone choice. A $400K listing always leads with price energy. The tone selection adjusts WITHIN the tier — "casual" at $4M means relaxed confidence, not actually casual.
THIN INPUT HANDLING: If the details are minimal (few features, shorthand, messy voice-to-text), work with what you have. Never comment on or mention the input quality — just write the best script possible from what's there. Extract every usable detail. You MAY interpret lifestyle implications from thin details ("large yard" → outdoor entertaining, kids playing, gardening space) but NEVER invent factual claims (don't add bedrooms, bathrooms, or features that aren't mentioned). When specs are thin, pivot hard to the ZIP CODE LIFESTYLE — the specific coffee shops, the commute time, the school district, the neighborhood vibe, what makes this block/town desirable. Make the location the star. If truly insufficient (just a town and price with nothing else), write a script focused on the agent's market knowledge and the area rather than specific property features, and note in the analysis what additional details would improve the script.
GENERIC INPUT HANDLING: When details are bare-bones ("house in Newton 3 beds garage good location"), the TOWN becomes the differentiator. Use neighborhood knowledge as a feature: What is this town known for? Why do buyers choose it over neighboring towns? What's the lifestyle there? School reputation, walkability, commute, vibe, price relative to neighbors. Weave this into the hooks and body. The town IS the story when the property details are thin. Also lean on the price tier to set the approach — a $700K "house in Newton" is a very different script than a $1.3M "house in Newton."
PRODUCTION FORMAT — write for this filming structure:
The script has two modes: ON-CAMERA (agent talking directly to viewer) and VOICEOVER (agent's voice over B-roll of the property). The body is mostly voiceover.
- HOOK [0-10s]: Agent ON-CAMERA. Standing at or near the property. Direct to viewer. This is the personality moment.
- BODY [10-42s]: Mostly VOICEOVER over B-roll tour. The agent is narrating while we see the house. Tour flows naturally: main living area → kitchen → bedrooms/baths → any unique spaces (finished basement, converted attic, outdoor living) → town/area context. The voiceover should sound like someone walking you through the house even though we're seeing edited B-roll, not a continuous walk.
- CLOSE [42-50s]: Agent ON-CAMERA again. Direct to viewer. This is where trust is built — a real person, looking at you, delivering the close.
BODY FORMATTING: Separate the body into 2-3 breath groups with blank lines between them. Each group is a natural beat — e.g. interior features, then a transition beat, then exterior/location. This makes the script scannable and easier to read on a teleprompter. Never use brackets, stage directions, or visual cues like [Step outside] or [Head upstairs] — just write the spoken words.
VOICE: Energetic. Enthusiastic. Feature-rich. Fragments. Contractions. Em dashes. Action verbs. Written to be said out loud with excitement — like a walkthrough you can't wait to share.
QUALITY CHECK — before outputting, verify:
1. Total body word count is 80-100 words
2. Every spoken line is ≤15 words
3. At least 3 engagement triggers are present (shareability, save-worthy, open loop, contrast, specificity, callback)
4. At least 2 pillars are activated (trust, value, credibility, entertainment)
5. Hook opens a curiosity loop or tension — closing resolves it
6. No banned words from the Anti-Generic list
7. Script sounds human and energetic when read aloud, not formulaic
If any check fails, revise before responding.
OUTPUT: ONLY valid JSON. No markdown, no backticks, no preamble.`;

const TONES = [
  { id: "confident", label: "Confident", m: "Authoritative. Short declaratives. No hedging." },
  { id: "warm", label: "Warm", m: "Friendly, genuine. Like advice over coffee." },
  { id: "urgent", label: "Urgent", m: "Time pressure. This is happening NOW." },
  { id: "casual", label: "Casual", m: "Off-the-cuff. Walking through, talking to camera." },
  { id: "expert", label: "Expert", m: "Data-forward. The market authority." },
];

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
// PROMPT BUILDERS
// ═══════════════════════════════════════

function promptHooks(details, tone, fb, price) {
  const t = TONES.find(x => x.id === tone);
  const n = fb && fb.trim() ? `\n\nAGENT NOTES: "${fb.trim()}" — incorporate this direction into the hooks.` : "";
  const tier = priceTier(price);
  return {
    system: SYS,
    user: `You are generating the 3 most important seconds of a Reel. The hook determines everything — whether the algorithm pushes the video, whether viewers stay, whether the agent gets a single lead. Treat this as the highest-stakes writing in the entire script.
LISTING DETAILS:
"""
${details}
"""${tier}${n}
STEP 1 — DEEP ANALYSIS:
- HOOK SEED: The single most unusual, compelling, or scroll-stopping aspect. Ask: "If I could only say ONE thing about this property, what would make a stranger stop scrolling?" It's usually NOT the nicest feature — it's the most SURPRISING or SPECIFIC one.
- TWO SUPPORTING FEATURES from different categories (interior vs. exterior, lifestyle vs. investment, etc.)
- TARGET BUYER: One specific person in one specific situation. Not "families" — "A couple with a toddler who just got priced out of Brookline."
- WHAT TO SKIP: Identify which features are standard for this price point and should NOT appear in hooks.
STEP 2 — 4 HOOKS:
Each hook is 12-18 words spoken on camera + a separate text overlay optimized for muted viewers.
A — CONTRARIAN: Challenge what people assume about this market, price point, town, or property type. The viewer thinks they know something — you show them they're wrong.
Good contrarian hooks have TENSION. They set up an expectation and immediately subvert it.
Examples of the pattern: "Everyone's leaving the city for the suburbs. This [city] listing is why I'm not." / "You'd think $2M in Weston gets you new construction. This 1938 colonial proves you wrong." / "$475K can't get you anything good near the T. Let me show you Malden."
BAD contrarian: Vague disagreements with no specifics. "This isn't your typical listing" — says nothing.
B — CURIOSITY GAP: Reveal PART of the best feature but withhold the payoff. The viewer must watch to close the loop. The gap between what you reveal and what you withhold is what creates the pull.
Good curiosity hooks are SPECIFIC about what they tease. The viewer knows WHAT they'll see, just not HOW good it is.
Examples of the pattern: "One side of this duplex is completely renovated. The other side? That's where it gets interesting." / "The listing sheet says 4 bedrooms. It doesn't mention what's behind the kitchen." / "This house has been in one family for 40 years. Wait until you see what they did to the library."
BAD curiosity: Too vague to create pull. "You won't believe this house" — no specific tease.
C — DIRECT VALUE: The clearest, most complete value proposition in one line. Price + location + standout feature. This hook works because it reads like a search filter come to life — anyone looking for these exact things stops immediately.
Good direct hooks stack 3-4 specific details that each independently attract attention.
Examples of the pattern: "Two-family in Bedford. Live in one, rent the other. Nine thousand square feet of land." / "$785K. Four beds. Cul-de-sac. Framingham. Finished basement."
BAD direct: Generic stacking. "Beautiful home, great location, amazing price" — no specifics.
D — STORY: Open with a tiny narrative or emotional moment that puts the viewer IN the property. A story hook paints a scene — morning coffee, hosting a dinner, a kid running in the yard — then ties it to a real feature.
Good story hooks are VIVID and SPECIFIC. They create a feeling, not just list features.
Examples of the pattern: "Picture this — Saturday morning, floor-to-ceiling windows, coffee in hand, and the entire Boston skyline." / "Your kid runs through the back door, across 40 feet of grass, and straight into a treehouse you didn't know existed." / "You walk in at 6pm. The fireplace is already going. The kitchen island seats eight."
BAD story: Too generic or cheesy. "Imagine living in your dream home" — no scene, no detail.
${t ? "\nTone: " + t.m : ""}
HOOK QUALITY CHECKLIST (every hook must pass ALL of these):
1. Contains at least one SPECIFIC detail from the listing (a number, a town name, a feature)
2. A stranger with zero context would understand it and be intrigued
3. Works when READ as text overlay with no audio (80%+ of viewers are muted)
4. Creates a reason to keep watching — either an open loop, a surprising claim, or a clear value stack
5. Does NOT start with "Are you looking for" / "Welcome to" / "Check out" / "This is"
6. The agent would actually say this line on camera without feeling awkward
TEXT OVERLAY — this is NOT just a summary of the verbal hook. It's a separate piece of creative optimized for scanning in 2-3 seconds. Rules:
- ALL CAPS or Title Case
- Max 8 words (people scan, they don't read)
- Must hook independently — someone watching muted should stop scrolling from the text alone
- Include the most magnetic detail: price, town, property type, or the surprise
- Format options: "TOWN · PRICE · TYPE" / "THE [FEATURE] THAT CHANGES EVERYTHING" / a provocative short statement
RESPOND:
{"analysis":{"hook_seed":"...","features":["...","..."],"target_buyer":"...","skipped":"features that are standard for this price and NOT hook-worthy"},"hooks":[{"verbal":"...","text_overlay":"...","strategy":"contrarian","why":"What psychological trigger this uses and why it stops a scroll."},{"verbal":"...","text_overlay":"...","strategy":"curiosity","why":"..."},{"verbal":"...","text_overlay":"...","strategy":"direct","why":"..."},{"verbal":"...","text_overlay":"...","strategy":"story","why":"..."}]}`,
  };
}

function promptScript(details, tone, hook, analysis, fb, price) {
  const t = TONES.find(x => x.id === tone);
  const n = fb && fb.trim() ? `\n\nAGENT NOTES: "${fb.trim()}" — incorporate this.` : "";
  const tier = priceTier(price);
  return {
    system: SYS,
    user: `Write a COMPLETE Instagram Reel listing tour script.\n\nHOOK: "${hook.verbal}"\nTEXT: "${hook.text_overlay}"\nSTRATEGY: ${hook.strategy}\n\nFEATURES: ${analysis.hook_seed} | ${analysis.features.join(", ")} | For: ${analysis.target_buyer}\n\nDETAILS: ${details}${tier}${n}\n${t ? "Tone: " + t.m : ""}\n\nHOOK is already written (agent delivers it ON-CAMERA).\n\nWrite the BODY as VOICEOVER (80-100 words, ~35s). This plays over B-roll of the property. Write it with ENERGY and ENTHUSIASM — like a high-energy listing tour that packs in features and sells the lifestyle. Walk the viewer through the home with excitement:\n\n1. Start inside the main living area / kitchen — the visual heart. Lead with an action verb that MOVES the viewer in: "Step inside to..." / "The first floor flows..." Then stack the standout features with energy.\n2. Retention line around the midpoint — reopen curiosity. Use a FRESH approach each time. NOT "But honestly." Try: location shift ("Step outside for a second"), reveal tease ("The listing sheet doesn't mention this"), perspective flip ("Here's what the photos don't show you"), excitement beat ("And then there's this"). Match to the property.\n3. Move to a contrasting space — different category (interior→exterior, finished→raw, upstairs→yard). Sell the LIFESTYLE and what's POSSIBLE, not just what exists.\n4. Peak moment — energy peaks. Market context, location convenience, a surprising number, or the wow feature. Tie in proximity to shops, transit, schools, downtown when relevant.\n5. Setup the close — one line that hands it back to the agent on camera.\n\nPack in the features. Every line should deliver something specific and valuable. Lines should sound like enthusiastic speech — someone excited to show you what they found.\n\nNO brackets or stage directions — just the spoken words. Separate the body into 2-3 breath groups with blank lines between them. Max 15 words per spoken line.\n\nIf input is thin/messy, work with what exists. Do NOT invent features.\n\nWrite 3 ENDINGS (agent is back ON-CAMERA, 15-25 words each):\nA — PAYOFF: Strong close. No ask. Value IS the ending.\nB — SOFT: Light nudge. "Full details on my page." / "You know where to find me."\nC — DIRECT: "DM me [KEYWORD]" with urgency. Unless luxury tier — then invitation language.\n\nRESPOND:\n{"body":"...","endings":[{"closing":"...","cta":"","text_overlay":"...","type":"payoff"},{"closing":"...","cta":"...","text_overlay":"...","type":"soft"},{"closing":"...","cta":"...","text_overlay":"...","type":"direct"}]}`,
  };
}

// Strip URLs from details before sending to API
const cleanDetails = (d) => d.replace(/https?:\/\/[^\s]+/gi, "").replace(/www\.[^\s]+/gi, "").trim();

async function callAI(s, u) {
  const r = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: s, user: u }),
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

const Pill = ({ sel, onClick, children }) => (
  <button onClick={onClick} style={{
    background: sel ? B.redwoodBg : B.surface,
    border: `1.5px solid ${sel ? B.redwood : B.border}`,
    borderRadius: 24, padding: "8px 18px", cursor: "pointer", transition: "all 0.2s",
  }}>
    <span style={{ fontFamily: B.sans, fontSize: 13, fontWeight: 500, color: sel ? B.redwood : B.textSec }}>
      {children}
    </span>
  </button>
);

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

function S1({ data, setData, onGo, loading }) {
  const ready = data.details.trim().length >= 16;
  return (
    <div style={{ padding: "12px 20px 130px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 24, fontWeight: 500, color: B.charcoal, margin: "0 0 6px" }}>
        What are we filming?
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 20px", lineHeight: 1.5 }}>
        Price shapes the whole approach. Then paste or describe the listing.
      </p>

      {/* Price */}
      <div style={{ marginBottom: 16 }}>
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
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Listing details</label>
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

      {/* Tone */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>
          Tone <span style={{ fontWeight: 400 }}>\u00B7 optional</span>
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TONES.map((t) => (
            <Pill key={t.id} sel={data.tone === t.id} onClick={() => setData((d) => ({ ...d, tone: d.tone === t.id ? "" : t.id }))}>
              {t.label}
            </Pill>
          ))}
        </div>
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

export default function App() {
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
  const [data, setData] = useState({ details: "", tone: "", price: "" });
  const [hooks, setHooks] = useState([]);
  const [an, setAn] = useState(null);
  const [hook, setHook] = useState(null);
  const [body, setBody] = useState("");
  const [ends, setEnds] = useState([]);

  const go = async (fn) => {
    setLd(true); setEr("");
    try { await fn(); }
    catch (e) { setEr(e.message || "Something went wrong. Try again."); console.error(e); }
    setLd(false);
  };

  const genH = () => go(async () => {
    const p = promptHooks(cleanDetails(data.details), data.tone, null, data.price);
    const r = await callAI(p.system, p.user);
    setHooks(r.hooks); setAn(r.analysis); setSc(1);
  });

  const pickH = (h) => go(async () => {
    setHook(h);
    const p = promptScript(cleanDetails(data.details), data.tone, h, an, null, data.price);
    const r = await callAI(p.system, p.user);
    setBody(r.body); setEnds(r.endings || []); setSc(2);
  });

  const reH = (fb) => go(async () => {
    const p = promptHooks(cleanDetails(data.details), data.tone, fb, data.price);
    const r = await callAI(p.system, p.user);
    setHooks(r.hooks); setAn(r.analysis);
  });

  const reB = (fb) => go(async () => {
    const p = promptScript(cleanDetails(data.details), data.tone, hook, an, fb, data.price);
    const r = await callAI(p.system, p.user);
    setBody(r.body); setEnds(r.endings || []);
  });

  const rst = () => {
    setSc(0); setData({ details: "", tone: "", price: "" });
    setHooks([]); setAn(null); setHook(null);
    setBody(""); setEnds([]); setEr("");
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

      {sc === 0 && <S1 data={data} setData={setData} onGo={genH} loading={ld} />}
      {sc === 1 && <S2 hooks={hooks} analysis={an} onPick={pickH} onRegen={reH} onUpdateAnalysis={setAn} loading={ld} />}
      {sc === 2 && <S3 hook={hook} body={body} endings={ends} onBack={() => { setSc(1); setBody(""); setEnds([]); }} onReset={rst} onRegenBody={reB} loading={ld} />}
    </div>
  );
}
