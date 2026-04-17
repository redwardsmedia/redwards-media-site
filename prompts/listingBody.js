// Listing Reel — BODY pass.
// Placeholders: {userInput}, {selectedHook}
// v1 prompt content preserved verbatim for scripter-v2 Commit 1.
// Commit 2 rewrites this file + folds the polish pass into the body prompt.

import { SYSTEM as SHARED_SYSTEM } from "./listingHooks.js";

export const SYSTEM = SHARED_SYSTEM;

export const USER_TEMPLATE = `Write a COMPLETE Instagram Reel listing tour script.

{selectedHook}

{userInput}

HOOK is already written (agent delivers it ON-CAMERA).

Write the BODY as VOICEOVER (55-70 spoken words, ~30s). This plays over B-roll of the property. The body is a NARRATIVE with a beginning, middle, and payoff — not a feature walkthrough.

BODY RULES:
- Select 3-4 features MAX. Save secondary specs for [VISUALS ONLY] beats.
- Mark camera-only beats as [VISUALS ONLY] with a 2-3 word description. These are NOT spoken. Include at least one — let the camera carry a moment.
- Lines should be 4-8 words. Fragments over full sentences.
- Do not stack features. Choose the 1-2 that hit hardest and give each one line.
- Every [CUT] introduces a new idea. Never continue the previous line after a cut.
- Features are curated, not catalogued. Make an editorial decision about what to say vs. what to show.

FLOW:
1. Start in the main living area / kitchen. Lead with a reaction, then the key feature.
2. Retention line at midpoint — reopen curiosity. NOT "But honestly." Try: location shift ("Step outside"), reveal tease ("The listing sheet doesn't mention this"), perspective flip ("Here's what the photos don't show you"), emotional beat ("This room changed the whole showing").
3. Contrasting space — different category. Include a detail specific enough someone would share this Reel.
4. Peak moment — market context, surprising number, or wow feature.
5. Setup the close — one line handing it back to the agent on camera.

CALLBACK RULE: Before writing, identify the hook's core premise. The final line MUST resolve that premise. If the hook asked a question, the close answers it. If the hook made a claim, the close proves it. This creates rewatch loops.

NO brackets or stage directions except [VISUALS ONLY] beats. Separate the body into 2-3 breath groups with blank lines between them.

If input is thin/messy, work with what exists. Do NOT invent features.

Write 3 ENDINGS (agent is back ON-CAMERA, 15-25 words each):
A — PAYOFF: Strong close. No ask. Value IS the ending.
B — SOFT: Light nudge. "Full details on my page." / "You know where to find me."
C — DIRECT: "DM me [KEYWORD]" with urgency. Unless luxury tier — then invitation language.

RESPOND:
{"body":"...","endings":[{"closing":"...","cta":"","text_overlay":"...","type":"payoff"},{"closing":"...","cta":"...","text_overlay":"...","type":"soft"},{"closing":"...","cta":"...","text_overlay":"...","type":"direct"}]}`;
