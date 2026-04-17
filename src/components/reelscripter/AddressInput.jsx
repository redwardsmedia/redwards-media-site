import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "../../hooks/useGoogleMaps";

// Address input with Google Places Autocomplete attached.
// Controlled component: parent owns the text value + receives structured address on select.
//
// Props:
//   value      — current text in the input (parent state)
//   onChange   — called with new text when user types
//   onSelect   — called with { formatted, street, town, state, zip, placeId } when user picks a suggestion
//   inputStyle — style object merged into the <input>
//   inputProps — additional props forwarded to the <input>

export function AddressInput({ value, onChange, onSelect, inputStyle = {}, inputProps = {} }) {
  const { ready, error } = useGoogleMaps();
  const inputRef = useRef(null);
  const acRef = useRef(null);
  const [verified, setVerified] = useState(false);

  // Keep onChange/onSelect in refs so the effect doesn't re-run on every parent render
  // (the callbacks are typically inline arrows that change reference each render).
  const onChangeRef = useRef(onChange);
  const onSelectRef = useRef(onSelect);
  useEffect(() => { onChangeRef.current = onChange; onSelectRef.current = onSelect; }, [onChange, onSelect]);

  useEffect(() => {
    if (!ready || !inputRef.current || acRef.current) return;
    if (!window.google?.maps?.places?.Autocomplete) return;
    let ac;
    try {
      ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "address_components", "place_id"],
      });
      acRef.current = ac;
      ac.addListener("place_changed", () => {
        try {
          const place = ac.getPlace();
          if (!place?.formatted_address) return;
          const get = (type, kind = "long_name") =>
            place.address_components?.find((c) => c.types.includes(type))?.[kind] || "";
          const street = [get("street_number"), get("route")].filter(Boolean).join(" ");
          const data = {
            formatted: place.formatted_address,
            street,
            town: get("locality") || get("sublocality") || get("postal_town") || "",
            state: get("administrative_area_level_1", "short_name"),
            zip: get("postal_code"),
            placeId: place.place_id,
          };
          setVerified(true);
          onChangeRef.current?.(place.formatted_address);
          onSelectRef.current?.(data);
        } catch (e) {
          console.warn("AddressInput: place_changed handler failed", e);
        }
      });
    } catch (e) {
      console.warn("AddressInput: Autocomplete attach failed — falling back to plain input", e);
    }
    return () => {
      if (acRef.current && window.google?.maps?.event) {
        try { window.google.maps.event.clearInstanceListeners(acRef.current); } catch {}
      }
      acRef.current = null;
    };
  }, [ready]);

  return (
    <div style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
          if (verified) {
            setVerified(false);
            onSelect?.(null);
          }
        }}
        placeholder={error === "missing_key" ? "Type the listing address" : "Start typing the listing address\u2026"}
        style={inputStyle}
        {...inputProps}
      />
      {verified && (
        <span
          aria-label="Address verified"
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#2C8F5A",
            pointerEvents: "none",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {"\u2713"}
        </span>
      )}
      {error && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11.5,
            color: "#A39E98",
            marginTop: 6,
            lineHeight: 1.4,
          }}
        >
          {error === "missing_key"
            ? "Autocomplete off — type the full address manually."
            : "Autocomplete unavailable — type the full address manually."}
        </div>
      )}
    </div>
  );
}
