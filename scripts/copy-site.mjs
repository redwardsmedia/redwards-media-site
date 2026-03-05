// Post-build: copy the static Redwards site root + assets to dist/
// Vite builds Reel Scripter → dist/reelscripter/
// This copies site-root.html → dist/index.html so the main site still works
// Also copies public/images/ → dist/images/ for the main site's portfolio photos

import { copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

// Copy site-root.html → dist/index.html
const src = "site-root.html";
const dest = "dist/index.html";

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
} else {
  console.warn(`${src} not found -- main site index.html will be missing`);
}

// Copy public/images/ → dist/images/
const imgSrc = "public/images";
const imgDest = "dist/images";

if (existsSync(imgSrc)) {
  mkdirSync(imgDest, { recursive: true });
  const files = readdirSync(imgSrc);
  for (const file of files) {
    copyFileSync(join(imgSrc, file), join(imgDest, file));
    console.log(`Copied images/${file} -> dist/images/${file}`);
  }
  console.log(`Copied ${files.length} images to dist/images/`);
} else {
  console.warn("public/images/ not found -- no portfolio images to copy");
}
