// Generate PWA icons: Redwards "R" monogram on charcoal background
// Run: node scripts/generate-icons.mjs

import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

const CHARCOAL = "#2C2926";
const WARM_WHITE = "#FAF8F5";
const REDWOOD = "#AE4A3E";

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background — charcoal with subtle rounded feel
  ctx.fillStyle = CHARCOAL;
  ctx.fillRect(0, 0, size, size);

  // Subtle redwood accent line at bottom
  const accentH = Math.round(size * 0.035);
  ctx.fillStyle = REDWOOD;
  ctx.fillRect(0, size - accentH, size, accentH);

  // "R" letterform — Playfair-inspired serif R
  const fontSize = Math.round(size * 0.52);
  ctx.font = `500 ${fontSize}px "Georgia", "Times New Roman", serif`;
  ctx.fillStyle = WARM_WHITE;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Shift slightly up to account for accent line
  ctx.fillText("R", size / 2, size * 0.46);

  // Small dot after R — like "R." branding mark
  const dotR = Math.round(size * 0.032);
  const dotX = size / 2 + fontSize * 0.28;
  const dotY = size * 0.46 + fontSize * 0.18;
  ctx.beginPath();
  ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = REDWOOD;
  ctx.fill();

  return canvas.toBuffer("image/png");
}

writeFileSync("public/icon-192.png", generateIcon(192));
console.log("✓ public/icon-192.png");

writeFileSync("public/icon-512.png", generateIcon(512));
console.log("✓ public/icon-512.png");
