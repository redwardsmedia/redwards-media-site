// SoldStoryForm — Screen 1 for projectType='sold-story'.
// Collects deal facts + strategy, then a single API call returns three outputs.

const SIDES = [
  { id: "seller", label: "Seller side" },
  { id: "buyer", label: "Buyer side" },
  { id: "dual", label: "Dual" },
];

export function SoldStoryForm({ data, setData, onGo, loading, brand, styles }) {
  const B = brand;
  const { inputBase, labelStyle, focusRing, Btn, BottomBar, Mic } = styles;
  const ready = (data.salePrice || "").toString().trim().length >= 2 && data.details.trim().length >= 15;

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const setKey = (k, v) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div style={{ padding: "24px 20px 140px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 26, fontWeight: 500, color: B.charcoal, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        Tell the sold story.
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 28px", lineHeight: 1.55 }}>
        {"One pass, three outputs: a social caption, a testimonial request, and a Just Sold reel. Give me the numbers and the story."}
      </p>

      {/* Address */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Address or listing</label>
        <input
          value={data.addressText || ""}
          onChange={set("addressText")}
          placeholder="e.g. 120 Dorchester Ave, Quincy"
          style={{ ...inputBase, width: "100%", padding: "14px 16px", fontSize: 15, fontWeight: 500 }}
          {...focusRing}
        />
      </div>

      {/* Side */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Which side</label>
        <div style={{ display: "flex", gap: 8 }}>
          {SIDES.map((s) => {
            const selected = (data.side || "seller") === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setKey("side", s.id)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: B.rs,
                  cursor: "pointer",
                  background: selected ? B.redwoodBg : B.surface,
                  border: `1.5px solid ${selected ? B.redwood : B.border}`,
                  fontFamily: B.sans,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: selected ? B.redwood : B.textSec,
                  transition: "all 0.2s",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prices */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>List price</label>
          <input
            value={data.listPrice || ""}
            onChange={set("listPrice")}
            placeholder="750k"
            inputMode="decimal"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 15, fontWeight: 500 }}
            {...focusRing}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Sale price</label>
          <input
            value={data.salePrice || ""}
            onChange={set("salePrice")}
            placeholder="815k"
            inputMode="decimal"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 15, fontWeight: 500 }}
            {...focusRing}
          />
        </div>
      </div>

      {/* DOM + Offers */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Days on market</label>
          <input
            value={data.dom || ""}
            onChange={set("dom")}
            placeholder="4"
            inputMode="numeric"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 15, fontWeight: 500 }}
            {...focusRing}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>{"# of offers"}</label>
          <input
            value={data.offers || ""}
            onChange={set("offers")}
            placeholder="6"
            inputMode="numeric"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 15, fontWeight: 500 }}
            {...focusRing}
          />
        </div>
      </div>

      {/* Strategy */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Strategy notes</label>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={data.details}
            onChange={set("details")}
            placeholder={"What actually worked? Specific moves, pivots, the tough moment, the negotiation, pricing call, staging bet. The story agents will learn from."}
            rows={7}
            style={{ ...inputBase, flex: 1, padding: "16px", fontSize: 14.5, lineHeight: 1.6, resize: "vertical" }}
            {...focusRing}
          />
          <Mic onText={(t) => setData((d) => ({ ...d, details: d.details ? d.details + " " + t : t }))} />
        </div>
      </div>

      {/* Agent + Brokerage */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Agent name</label>
          <input
            value={data.agentName || ""}
            onChange={set("agentName")}
            placeholder="Jane Doe"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 14 }}
            {...focusRing}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Brokerage</label>
          <input
            value={data.brokerage || ""}
            onChange={set("brokerage")}
            placeholder="ABC Realty"
            style={{ ...inputBase, width: "100%", padding: "12px 14px", fontSize: 14 }}
            {...focusRing}
          />
        </div>
      </div>

      {/* Agent voice */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>{"Agent voice \u00B7 optional"}</label>
        <input
          value={data.tone || ""}
          onChange={set("tone")}
          placeholder="e.g. confident but warm, teach-y not flashy"
          style={{ ...inputBase, width: "100%", padding: "12px 16px", fontSize: 14 }}
          {...focusRing}
        />
      </div>

      <BottomBar>
        {!data.salePrice && data.details.trim().length > 15 && (
          <div style={{ fontFamily: B.sans, fontSize: 11.5, color: B.gold, textAlign: "center", marginBottom: 8 }}>
            Add at least the sale price so the numbers land.
          </div>
        )}
        <Btn onClick={onGo} disabled={!ready} loading={loading}>Generate Sold Story</Btn>
      </BottomBar>
    </div>
  );
}
