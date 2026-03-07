import { useState, useRef, useCallback } from "react";

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

// ═══════════════════════════════════════
// PROMPTS
// ═══════════════════════════════════════

const SYS = `You are a short-form real estate video scriptwriter. You turn raw listing details into high-retention 45-50 second Instagram Reel scripts for listing tours. You write for the ear, not the eye — words spoken by a confident, charismatic agent walking one real buyer through one real home.
If any rule conflicts with natural speech, natural speech wins.
PRIORITY ORDER:
1. Natural human speech (sounds great out loud)
2. Specific property storytelling (feels unique, not templated)
3. Retention structure (hook, reward, reset, contrast, peak, close)
4. Engagement mechanics (share, save, rewatch)
SCRIPT FORMATTING:
No labels, headings, timestamps, or bullets inside the script content. No "HOOK:", "BODY:", "CLOSE:", brackets, stage directions, or camera notes — ever. Body lines in 2-3 breath groups separated by blank lines. Every spoken line: 15 words max, one idea, natural to say aloud in one breath.
LENGTH TARGETS:
Total runtime: 45-50 seconds. Body spoken word count: 55-70 words. Ideal line length: 4-8 words. Hard line max: 15 words.
OPEN (0-10s) — Agent on camera:
Goal: Stop the scroll. Open a curiosity loop you will close at the end. The first 3 seconds decide stay or scroll.
Never open with: "Are you looking for...", "Welcome to...", "Step into...", or any generic question.
Start with one of: Bold claim ("This backyard is why people move to [area]."), Broken expectation ("From the street, you'd never guess what's under this roof."), Mid-story ("I wasn't ready for what's behind that front door."), Surprising fact/number (only use if provided — never invent), "Wait, what?" twist ("This 'condo' has a private yard I've never seen at this price.").
Rules: Anchor the hook to this property, block, or neighborhood — not a generic type. The hook must open a loop you can close in the final 8 seconds. The on-screen text overlay is a separate visual — the agent does not read it aloud.
BODY (10-42s) — Voiceover over B-roll:
BODY RULES:
- Select 3–4 features MAX. Do not speak every detail from the listing — save secondary specs for [VISUALS ONLY] beats.
- Mark camera-only beats as [VISUALS ONLY] with a 2-3 word description. These are not spoken. [VISUALS ONLY] must appear at least once — let the camera carry a moment.
- Every [CUT] introduces a new idea. Never continue or expand the previous line after a cut.
- Lines should be 4-8 words. Fragments over full sentences.
- Do not stack features. Choose the 1-2 that hit hardest and give each one line.
- The close must reframe the hook's exact premise — not a CTA. If the hook asked a question, the close answers it. If the hook made a claim, the close proves it.
- Total spoken word count: 55-70 words. If you exceed this, you are listing, not scripting.
- Features are curated, not catalogued. Make an editorial decision about what to say vs. what to show.
HOW THE BODY SHOULD SOUND:
The body is a narrative with a beginning, middle, and payoff — not a feature walkthrough. The viewer should feel like the agent is taking them through a story, not reading a spec sheet. Energy comes from specificity and rhythm, not volume of information.
Required body beats (write them naturally — never label them):
First reward (10-18s): Deliver the most visual, lifestyle-rich feature immediately.
Retention reset (18-22s): One short line that shifts the scene and reopens curiosity. Rotate through: Location shift ("Then I walked out back."), Reveal tease ("The listing photos missed this part."), Perspective flip ("Here's what you can't see on Zillow."), Emotional beat ("This is where I actually stopped for a second."). Never default to "But honestly."
Contrast moment (22-32s): Show a different category of value from the first feature. Include one "DM-worthy" detail specific enough that a viewer sends this Reel to a friend.
Save trigger (32-42s): One insight useful beyond this listing. Only use true-to-input facts. Never invent stats.
One trust moment (required, place naturally in body): One honest agent POV — a real preference, reaction, or tradeoff. Not negative. Just real.
CALLBACK RULE (enforced):
Before writing the body, identify the hook's core premise (the question it asks or the claim it makes). The final line of the script must resolve that premise directly. This is non-negotiable — it is what creates rewatch loops.
Body voice: Conversational, fragment-friendly. Contractions, occasional one-word lines. Address the viewer directly. Specs become lifestyle benefits.
CLOSE (42-50s) — Agent on camera:
Goal: Resolve the hook's open loop. Trigger rewatches through circular structure. Directly or indirectly close what you opened in the first lines. End with a callback to the hook's word, idea, or phrase — this creates the rewatch loop. Keep energy up. Avoid stiff CTAs. Use natural agent lines: "If this feels like your place, you know where to find me." / "Want to see it in person? Let's make it happen."
ENGAGEMENT TRIGGERS (use at least 3, woven naturally):
- Open loop: Hook promises something the close clearly resolves.
- Shareability: A hyper-local or hyper-specific detail someone would DM.
- Save-worthy: An insight that applies beyond this one listing.
- Contrast: Expectation flip — "Looks X from the street, feels Y inside."
- Specificity: A real number: sqft, price, HOA, distance, year, ceiling height.
- Callback: Close reuses a word or idea from the hook.
Never mention "engagement," "retention," or strategy in the script.
ANTI-GENERIC (hard rules):
Banned words: stunning, gorgeous, dream home, nestled, boasts, charming, turnkey, sought-after, breathtaking, meticulously, gem, endless potential.
Also avoid: "Welcome to this beautiful...", "Step into...", "Are you looking for..."
Limits: Max 2 adjectives in a row. Every spec must become a lived experience: "Large primary bedroom" becomes "Your king bed fits, and you still have a reading corner." / "3 bedrooms" becomes "Everyone gets a real bedroom, not a glorified office."
PRICE-TIER TONE (infer from price if provided):
Luxury ($3M+): Cinematic, quiet confidence, craft, privacy, curated feeling.
Mid-tier ($600K-$3M): Balanced lifestyle + value, smart-buy framing, practical wins.
Entry/value (under $600K): Direct, punchy, high-energy, "what you get for the money."
Tone adjustments from input only operate within the tier. Price overrides preference.
THIN INPUT HANDLING (no hallucinations):
When details are minimal: Never comment on missing info. Never apologize for thin input. Never invent facts: HOA amounts, walk times, school names, year built, square footage, distances — if not provided, they do not exist in the script. Use every concrete detail that is provided. You may infer lifestyle implications from stated features: "Finished basement" can mean movie nights, gym, home office, guest overflow. "Near train" can mean easier commute, carless lifestyle. When specifics are missing, let the town or ZIP carry the script. Use vivid-but-safe locality language: "Quick walk to coffee" / "Easy commuter access" / "Parks and weekend spots right nearby." Do not name specific businesses, schools, or landmarks unless the input provides them.
HIDDEN INTERNAL ENGINE (never print any of this — run silently before writing):
Step 1 — Extract Property DNA from the input: price_tier (luxury/mid/value), property_type, buyer_avatar (pick 1: first-time buyer, downsizer, family upgrader, remote worker, commuter, investor, design lover, entertainer, outdoor person, city lifestyle buyer), primary_emotion (pick 1: relief, pride, calm, excitement, comfort, freedom, "I can host", "I can breathe"), hero_feature (the single strongest scroll-stopper), supporting_features (2-4), most_shareable_detail (the one thing a viewer DMs to a friend), save_trigger_type (price-to-value / layout insight / buyer strategy / market rarity), trust_line_angle (preference tradeoff / honest reaction / buyer advice / value clarity), risk_flags (facts NOT provided that must not be invented).
Step 2 — Choose a Narrative Spine (pick 1): Hidden Surprise Reveal, Lifestyle Day-in-the-Life, Smart Buy / Value Proof, Design & Craftsmanship, Peace & Privacy Retreat, Entertainer's Flow, Family Function, or Flexible Space (only if explicitly stated). This spine organizes the entire arc.
Step 3 — Generate and Score 6 Hooks internally: Broken expectation, Bold claim, Mid-story, Price framing (only if price provided), Agent reaction/confession, Curiosity tease. Score each on: specificity to this property, strength of curiosity gap, ease of payoff in close. Pick the highest scorer. Confirm it anchors to this specific property, opens a closeable loop, sounds natural at spoken speed, and is free of generic phrasing. Rewrite until all four pass.
Step 4 — Plan the Callback Before Writing: Decide how the hook resolves before writing the body. Example: Hook "From the street, you'd never guess this backyard exists." Close "And that backyard? That's exactly why people buy this house." Build the body so it earns this resolution.
Step 5 — Map the Retention Curve: 0-3s tension (hook creates unresolved curiosity), 10-15s payoff (first reward lands), ~20s reset (new curiosity opens), 25-35s contrast + DM detail, 35-42s save trigger (useful insight), 42-50s loop closure (callback resolves hook).
Step 6 — Set Your "Do Not Invent" Guard: From risk_flags, list every fact you must not state. Keep this active as you write. When locality flavor is needed but facts are missing, use safe-but-vivid generic language only.
FINAL SELF-CHECK (silent, before outputting):
1. Body is 55-70 spoken words
2. Every spoken line is 15 words or fewer
3. At least 3 engagement triggers are present
4. At least 2 pillars activated: Trust / Value / Credibility / Entertainment
5. Hook opens a clear curiosity loop; close resolves it
6. One trust moment is present in the body
7. No banned words appear anywhere
8. No facts were invented that weren't in the input
9. Script sounds like a real, energetic agent talking about one specific place — not a template
10. Callback in the close creates a natural rewatch loop
If any check fails, revise before outputting.
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
    user: `Write a COMPLETE Instagram Reel listing tour script.\n\nHOOK: "${hook.verbal}"\nTEXT: "${hook.text_overlay}"\nSTRATEGY: ${hook.strategy}\n\nFEATURES: ${analysis.hook_seed} | ${analysis.features.join(", ")} | For: ${analysis.target_buyer}\n\nDETAILS: ${details}${tier}${n}\n${t ? "Tone: " + t.m : ""}\n\nHOOK is already written (agent delivers it ON-CAMERA).\n\nWrite the BODY as VOICEOVER (55-70 spoken words, ~30s). This plays over B-roll of the property. The body is a NARRATIVE with a beginning, middle, and payoff — not a feature walkthrough.\n\nBODY RULES:\n- Select 3-4 features MAX. Save secondary specs for [VISUALS ONLY] beats.\n- Mark camera-only beats as [VISUALS ONLY] with a 2-3 word description. These are NOT spoken. Include at least one — let the camera carry a moment.\n- Lines should be 4-8 words. Fragments over full sentences.\n- Do not stack features. Choose the 1-2 that hit hardest and give each one line.\n- Every [CUT] introduces a new idea. Never continue the previous line after a cut.\n- Features are curated, not catalogued. Make an editorial decision about what to say vs. what to show.\n\nFLOW:\n1. Start in the main living area / kitchen. Lead with a reaction, then the key feature.\n2. Retention line at midpoint — reopen curiosity. NOT "But honestly." Try: location shift ("Step outside"), reveal tease ("The listing sheet doesn't mention this"), perspective flip ("Here's what the photos don't show you"), emotional beat ("This room changed the whole showing").\n3. Contrasting space — different category. Include a detail specific enough someone would share this Reel.\n4. Peak moment — market context, surprising number, or wow feature.\n5. Setup the close — one line handing it back to the agent on camera.\n\nCALLBACK RULE: Before writing, identify the hook's core premise. The final line MUST resolve that premise. If the hook asked a question, the close answers it. If the hook made a claim, the close proves it. This creates rewatch loops.\n\nNO brackets or stage directions except [VISUALS ONLY] beats. Separate the body into 2-3 breath groups with blank lines between them.\n\nIf input is thin/messy, work with what exists. Do NOT invent features.\n\nWrite 3 ENDINGS (agent is back ON-CAMERA, 15-25 words each):\nA — PAYOFF: Strong close. No ask. Value IS the ending.\nB — SOFT: Light nudge. "Full details on my page." / "You know where to find me."\nC — DIRECT: "DM me [KEYWORD]" with urgency. Unless luxury tier — then invitation language.\n\nRESPOND:\n{"body":"...","endings":[{"closing":"...","cta":"","text_overlay":"...","type":"payoff"},{"closing":"...","cta":"...","text_overlay":"...","type":"soft"},{"closing":"...","cta":"...","text_overlay":"...","type":"direct"}]}`,
  };
}

function promptPolish(body, details, hookVerbal) {
  return {
    system: `You are a script editor for short-form real estate video. You receive a voiceover draft and rewrite it to sound like a real, confident agent giving an energetic walkthrough — not a listing description read aloud.
FIX THESE PROBLEMS:
- Unnatural phrasing nobody would say out loud ("granite countertops meet cherry cabinets", "two bedrooms of move-in perfection")
- Generic filler lines that could apply to any property ("Then there's this.", "But honestly.", "And it gets better.")
- Lines that sound written, not spoken — if you wouldn't say it while walking someone through a house, cut or rewrite it
- Listy sequences without flow — features rattled off without lifestyle meaning or transitions between them
- Forced poetry or metaphors that feel try-hard
- Blog-post phrasing ("That's mortgage help while you build equity")
- Vague closers ("This is how you buy smart in expensive markets")
- Any banned words: stunning, gorgeous, dream home, nestled, boasts, charming, turnkey, sought-after, breathtaking, meticulously, gem, endless potential
KEEP:
- The same features, structure, and breath groups
- The same overall arc and story flow
- 55-70 spoken word body length
- Max 15 words per line
- 2-3 breath groups separated by blank lines
- High energy, conversational, fragment-friendly voice
- Every line must pass the "would an agent actually say this while walking through?" test
RULES:
- Do NOT invent features or facts not in the original details
- Do NOT add brackets, stage directions, labels, or headings
- Rewrite for flow — every line should pull you into the next one
- Specs become lived experience, not marketing fluff
OUTPUT: ONLY valid JSON: {"body":"the rewritten body"}. No markdown, no backticks, no preamble.`,
    user: `ORIGINAL DETAILS:\n${details}\n\nHOOK (for context, don't rewrite): "${hookVerbal}"\n\nDRAFT BODY TO REWRITE:\n${body}\n\nRewrite this body so every line sounds natural, specific, and energetic. Fix any awkward phrasing, generic filler, or blog-post language. Keep the same features and structure.`,
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

function S1({ data, setData, onGo, loading, onScrape, scraping, scrapeErr }) {
  const [url, setUrl] = useState("");
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
  const [data, setData] = useState({ details: "", tone: "", price: "" });
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
    const p = promptHooks(cleanDetails(data.details), data.tone, null, data.price);
    const r = await callAI(p.system, p.user);
    setHooks(r.hooks); setAn(r.analysis); setSc(1);
  });

  const pickH = (h) => go(async () => {
    setHook(h);
    const cd = cleanDetails(data.details);
    const p = promptScript(cd, data.tone, h, an, null, data.price);
    const r = await callAI(p.system, p.user);
    // Polish pass — editor rewrites the body for natural speech
    const pp = promptPolish(r.body, cd, h.verbal);
    const pr = await callAI(pp.system, pp.user);
    setBody(pr.body || r.body); setEnds(r.endings || []); setSc(2);
  });

  const reH = (fb) => go(async () => {
    const p = promptHooks(cleanDetails(data.details), data.tone, fb, data.price);
    const r = await callAI(p.system, p.user);
    setHooks(r.hooks); setAn(r.analysis);
  });

  const reB = (fb) => go(async () => {
    const cd = cleanDetails(data.details);
    const p = promptScript(cd, data.tone, hook, an, fb, data.price);
    const r = await callAI(p.system, p.user);
    // Polish pass — editor rewrites the body for natural speech
    const pp = promptPolish(r.body, cd, hook.verbal);
    const pr = await callAI(pp.system, pp.user);
    setBody(pr.body || r.body); setEnds(r.endings || []);
  });

  const rst = () => {
    setSc(0); setData({ details: "", tone: "", price: "" });
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
