// Three-card landing screen. User picks a project type, we route to the
// matching form. Sold Story is the only disabled card right now — Commit 4.

const OPTIONS = [
  {
    id: "listing",
    emoji: "\uD83C\uDFAC", // clapper board 🎬
    title: "Listing Reel",
    subtitle: "For your next shoot",
    body: "Hook, 115-125 word voiceover, end card. 45-60 sec.",
  },
  {
    id: "neighborhood",
    emoji: "\uD83D\uDDFA\uFE0F", // map 🗺️
    title: "Neighborhood Reel",
    subtitle: "Town-forward content",
    body: "Town is the star. Local spots, lifestyle, optional listing tie-in.",
  },
  {
    id: "sold-story",
    emoji: "\u2705", // check mark ✅
    title: "Sold Story",
    subtitle: "Post-close package",
    body: "Social caption + testimonial email + Just Sold reel. One pass.",
  },
];

export function ProjectTypePicker({ onPick, brand }) {
  const B = brand;
  return (
    <div style={{ padding: "32px 20px 60px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 28, fontWeight: 500, color: B.charcoal, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        What are you writing?
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 24px", lineHeight: 1.55 }}>
        Each type uses its own prompt. Pick the one that matches the job.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {OPTIONS.map((o, i) => (
          <button
            key={o.id}
            onClick={() => !o.disabled && onPick(o.id)}
            disabled={o.disabled}
            style={{
              background: B.card,
              border: `1.5px solid ${B.cardBorder}`,
              borderRadius: B.r,
              padding: "18px 18px",
              cursor: o.disabled ? "not-allowed" : "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
              opacity: o.disabled ? 0.55 : 1,
              boxShadow: B.shadow,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
            onMouseEnter={(e) => {
              if (!o.disabled) {
                e.currentTarget.style.borderColor = B.redwood;
                e.currentTarget.style.boxShadow = B.shadowLift;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = B.cardBorder;
              e.currentTarget.style.boxShadow = B.shadow;
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{o.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontFamily: B.serif, fontSize: 17, fontWeight: 500, color: B.charcoal }}>
                  {o.title}
                </span>
                <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 600, color: B.textMut, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {o.subtitle}
                </span>
                {o.disabled && (
                  <span style={{ fontFamily: B.sans, fontSize: 10, fontWeight: 600, color: B.gold, background: B.gold + "10", border: `1px solid ${B.gold}33`, padding: "2px 7px", borderRadius: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {o.disabledLabel}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: B.sans, fontSize: 13, color: B.textSec, lineHeight: 1.5 }}>
                {o.body}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
