// Post-build: copy the static Redwards site root to dist/
// Vite builds Reel Scripter → dist/reelscripter/
// This copies site-root.html → dist/index.html so the main site still works

import { copyFileSync, existsSync } from "fs";

const src = "site-root.html";
const dest = "dist/index.html";

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`✓ Copied ${src} → ${dest}`);
} else {
  console.warn(`⚠ ${src} not found — main site index.html will be missing`);
}
