import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/brand.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Reel Scripter PWA service worker
if ("serviceWorker" in navigator && window.location.pathname.startsWith('/reelscripter')) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/reelscripter/sw.js").catch(() => {});
  });
}
