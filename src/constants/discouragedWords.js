// Overused real-estate language. These aren't banned — some of them genuinely
// fit in specific situations. They're just the words Claude should NOT default
// to as filler adjectives. The server flags any hits as `warnings` so the UI
// can show a soft "heads up" banner without blocking the response.
//
// Profanity / offensive content is handled by Claude's own safety training —
// no reason to duplicate it here.
export const DISCOURAGED_WORDS = [
  "stunning",
  "gorgeous",
  "dream home",
  "nestled",
  "boasts",
  "turnkey",
  "sought-after",
  "breathtaking",
  "meticulously",
  "gem",
  "endless potential",
  "welcome to this beautiful",
  "step into",
  "thrilled",
  "honored",
  "blessed",
  "excited to share",
];
