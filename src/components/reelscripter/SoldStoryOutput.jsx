import { useState } from "react";

// SoldStoryOutput — Screen 3 for projectType='sold-story'.
// Three tabs: Social Post, Testimonial Email, Reel Script. Each has its own copy button.

const TABS = [
  { id: "social", label: "Social Post" },
  { id: "email", label: "Testimonial Email" },
  { id: "reel", label: "Reel Script" },
];

export function SoldStoryOutput({ socialPost, testimonialEmail, reelScript, wordCount, warnings, onBack, onReset, brand, styles }) {
  const B = brand;
  const { BottomBar } = styles;
  const [tab, setTab] = useState("social");
  const [copied, setCopied] = useState(false);

  const WarningsBanner = styles.WarningsBanner;

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeText = tab === "social"
    ? socialPost
    : tab === "email"
      ? `Subject: ${testimonialEmail?.subject || ""}\n\n${testimonialEmail?.body || ""}`
      : reelScript;

  const activeWordCount = tab === "social" ? wordCount?.social : tab === "reel" ? wordCount?.reel : null;

  return (
    <div style={{ padding: "24px 20px 110px", animation: "fadeUp 0.25s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontFamily: B.serif, fontSize: 26, fontWeight: 500, color: B.charcoal, margin: 0, letterSpacing: "-0.01em" }}>Your package</h2>
        <button onClick={onBack} style={{ background: "none", border: "none", fontFamily: B.sans, fontSize: 12, fontWeight: 500, color: B.redwood, cursor: "pointer" }}>
          {"\u2190 Edit inputs"}
        </button>
      </div>

      <WarningsBanner warnings={warnings} />

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, background: B.surfaceAlt, padding: 4, borderRadius: B.rs, border: `1px solid ${B.border}` }}>
        {TABS.map((t) => {
          const sel = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 8,
                cursor: "pointer",
                background: sel ? B.surface : "transparent",
                border: "none",
                fontFamily: B.sans,
                fontSize: 11.5,
                fontWeight: 600,
                color: sel ? B.charcoal : B.textMut,
                transition: "all 0.2s",
                boxShadow: sel ? B.shadow : "none",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      {tab === "social" && (
        <Panel brand={B} title="Social caption" wordCount={activeWordCount} wordCountRange={[80, 120]}>
          <div style={{ fontFamily: B.sans, fontSize: 15, lineHeight: 1.75, color: B.charcoal, whiteSpace: "pre-wrap" }}>
            {socialPost || ""}
          </div>
        </Panel>
      )}

      {tab === "email" && (
        <Panel brand={B} title="Testimonial request email">
          <div style={{ fontFamily: B.sans, fontSize: 12, fontWeight: 600, color: B.textMut, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
            Subject
          </div>
          <div style={{ fontFamily: B.serif, fontSize: 16, fontWeight: 500, color: B.charcoal, lineHeight: 1.4, marginBottom: 14 }}>
            {testimonialEmail?.subject || ""}
          </div>
          <div style={{ fontFamily: B.sans, fontSize: 12, fontWeight: 600, color: B.textMut, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
            Body
          </div>
          <div style={{ fontFamily: B.sans, fontSize: 14.5, lineHeight: 1.7, color: B.charcoal, whiteSpace: "pre-wrap" }}>
            {testimonialEmail?.body || ""}
          </div>
        </Panel>
      )}

      {tab === "reel" && (
        <Panel brand={B} title="Just Sold reel script" wordCount={activeWordCount} wordCountRange={[85, 110]}>
          <div style={{ fontFamily: B.sans, fontSize: 15, lineHeight: 1.75, color: B.charcoal, whiteSpace: "pre-wrap" }}>
            {reelScript || ""}
          </div>
        </Panel>
      )}

      <button onClick={onReset} style={{ background: "none", border: "none", fontFamily: B.sans, fontSize: 12, color: B.textMut, cursor: "pointer", padding: "10px 0 0" }}>
        Start a new package
      </button>

      <BottomBar>
        <button onClick={() => copy(activeText)} style={{
          width: "100%", padding: "16px 24px",
          background: copied ? B.sage : B.redwood,
          border: "none", borderRadius: B.r,
          fontFamily: B.sans, fontSize: 15, fontWeight: 600, color: "#fff",
          cursor: "pointer", transition: "all 0.25s",
          boxShadow: copied ? "0 2px 8px rgba(122,148,104,0.2)" : "0 2px 8px rgba(174,74,62,0.15)",
        }}>
          {copied ? "\u2713 Copied to clipboard" : `Copy ${TABS.find(t => t.id === tab)?.label}`}
        </button>
      </BottomBar>
    </div>
  );
}

function Panel({ brand, title, wordCount, wordCountRange, children }) {
  const B = brand;
  const [min, max] = wordCountRange || [0, 0];
  const inRange = wordCount && wordCount >= min && wordCount <= max;
  const wcColor = inRange ? B.sage : B.gold;
  return (
    <div style={{ background: B.card, border: `1.5px solid ${B.cardBorder}`, borderRadius: B.r, overflow: "hidden", marginBottom: 14, boxShadow: B.shadow }}>
      <div style={{ padding: "10px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: B.sans, fontSize: 11, fontWeight: 700, color: B.gold, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</span>
        {typeof wordCount === "number" && wordCount > 0 && (
          <span style={{ fontFamily: B.mono, fontSize: 10, fontWeight: 600, color: wcColor, background: wcColor + "0D", border: `1px solid ${wcColor}22`, padding: "2px 8px", borderRadius: 6 }}>
            {wordCount} words
          </span>
        )}
      </div>
      <div style={{ padding: "16px" }}>
        {children}
      </div>
    </div>
  );
}
