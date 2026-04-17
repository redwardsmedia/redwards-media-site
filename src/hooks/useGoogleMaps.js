import { useEffect, useState } from "react";

// Lazy-load the Google Maps JS API (Places library).
// Shared across any component that calls this hook — the script is only inserted once.

const SCRIPT_ID = "google-maps-script";
let loadPromise = null;

export function useGoogleMaps() {
  const [ready, setReady] = useState(
    typeof window !== "undefined" && !!window.google?.maps?.places,
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ready) return;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError("missing_key");
      return;
    }

    if (!loadPromise) {
      loadPromise = new Promise((resolve, reject) => {
        if (document.getElementById(SCRIPT_ID)) {
          const check = () => {
            if (window.google?.maps?.places) resolve();
            else setTimeout(check, 50);
          };
          check();
          return;
        }
        const s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&loading=async`;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("load_failed"));
        document.head.appendChild(s);
      });
    }

    loadPromise
      .then(() => setReady(true))
      .catch((e) => setError(e.message || "load_failed"));
  }, [ready]);

  // Global callback Google invokes when the API key fails auth (referrer blocked, Places not enabled, etc.)
  useEffect(() => {
    const prev = window.gm_authFailure;
    window.gm_authFailure = () => setError("auth_failed");
    return () => {
      window.gm_authFailure = prev;
    };
  }, []);

  return { ready, error };
}
