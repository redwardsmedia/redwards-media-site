import { useState } from "react";

// NeighborhoodForm — Screen 1 for projectType='neighborhood'.
// Town is the primary input. Details textarea captures local spots + agent details.
// Props mirror the ListingForm (S1 inline) pattern so the wiring in ReelScripterApp
// stays symmetric.

export function NeighborhoodForm({ data, setData, onGo, loading, brand, styles }) {
  const B = brand;
  const { inputBase, labelStyle, focusRing, Btn, BottomBar, Mic } = styles;
  const ready = data.townName?.trim().length >= 2 && data.details.trim().length >= 10;
  return (
    <div style={{ padding: "24px 20px 140px", animation: "fadeUp 0.25s ease" }}>
      <h2 style={{ fontFamily: B.serif, fontSize: 26, fontWeight: 500, color: B.charcoal, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        What town are we telling?
      </h2>
      <p style={{ fontFamily: B.sans, fontSize: 13.5, color: B.textSec, margin: "0 0 28px", lineHeight: 1.55 }}>
        {"Town is the star. Lead with the vibe, the local spots, the feel \u2014 not a property."}
      </p>

      {/* Town */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Town or area</label>
        <input
          value={data.townName || ""}
          onChange={(e) => setData((d) => ({ ...d, townName: e.target.value }))}
          placeholder="e.g. Quincy, MA"
          style={{ ...inputBase, width: "100%", padding: "14px 16px", fontSize: 16, fontWeight: 500 }}
          {...focusRing}
        />
      </div>

      {/* Local context */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Local context</label>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={data.details}
            onChange={(e) => setData((d) => ({ ...d, details: e.target.value }))}
            placeholder={"Describe the vibe. Name 2\u20133 specific places (coffee shop, park, T stop, beach). Commute? Weekend energy?\n\nInclude agent name + brokerage so the end card comes out right."}
            rows={8}
            style={{ ...inputBase, flex: 1, padding: "16px", fontSize: 14.5, lineHeight: 1.6, resize: "vertical" }}
            {...focusRing}
          />
          <Mic onText={(t) => setData((d) => ({ ...d, details: d.details ? d.details + " " + t : t }))} />
        </div>
      </div>

      {/* Tied listing (optional) */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>{"Tied to a listing \u00B7 optional"}</label>
        <input
          value={data.addressText || ""}
          onChange={(e) => setData((d) => ({ ...d, addressText: e.target.value }))}
          placeholder="If this is paired with a listing, drop the address + a line"
          style={{ ...inputBase, width: "100%", padding: "12px 16px", fontSize: 14 }}
          {...focusRing}
        />
      </div>

      {/* Agent voice */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>{"Agent voice \u00B7 optional"}</label>
        <input
          value={data.tone || ""}
          onChange={(e) => setData((d) => ({ ...d, tone: e.target.value }))}
          placeholder="e.g. warm and informative, like a local guide"
          style={{ ...inputBase, width: "100%", padding: "12px 16px", fontSize: 14 }}
          {...focusRing}
        />
      </div>

      <BottomBar>
        {!data.townName?.trim() && data.details.trim().length > 15 && (
          <div style={{ fontFamily: B.sans, fontSize: 11.5, color: B.gold, textAlign: "center", marginBottom: 8 }}>
            Add the town name so hooks can anchor to it.
          </div>
        )}
        <Btn onClick={onGo} disabled={!ready} loading={loading}>Generate Hook Options</Btn>
      </BottomBar>
    </div>
  );
}
