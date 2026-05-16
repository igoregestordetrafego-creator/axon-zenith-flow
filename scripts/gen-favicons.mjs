import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = "/Users/igoreduardosilva/Downloads/Gemini_Generated_Image_rp19perp19perp19 (2).png";
const pub = resolve(__dirname, "../public");

// ── 1. Read raw pixels ────────────────────────────────────────────────────────
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = new Uint8Array(data);

// ── 2. Find bird bounding box (bird pixels = saturation >= 0.05) ──────────────
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max > 0 && (max - min) / max >= 0.05) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// ── 3. Remove background (gray → transparent) ─────────────────────────────────
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  if (sat < 0.05) pixels[i + 3] = 0;
}

// ── 4. Crop tight to bird (4px safety margin) ────────────────────────────────
const PAD  = 4;
const left = Math.max(0, minX - PAD);
const top  = Math.max(0, minY - PAD);
const cropW = Math.min(width,  maxX + PAD) - left;
const cropH = Math.min(height, maxY + PAD) - top;

// ── 5. Build master: crop → resize to fill 512 (16px total padding) ───────────
const CANVAS  = 512;
const PADDING = 8; // 8px each side

await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
  .extract({ left, top, width: cropW, height: cropH })
  .resize(CANVAS - PADDING * 2, CANVAS - PADDING * 2, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: PADDING, bottom: PADDING,
    left: PADDING, right: PADDING,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(`${pub}/favicon.png`);

console.log(`✓ favicon.png — bird cropped ${cropW}x${cropH} → ${CANVAS}x${CANVAS}`);

// ── 6. Derive all sizes from master ──────────────────────────────────────────
for (const [size, file] of [
  [32,  "favicon-32x32.png"],
  [16,  "favicon-16x16.png"],
  [180, "apple-touch-icon.png"],
]) {
  await sharp(`${pub}/favicon.png`)
    .resize(size, size)
    .png()
    .toFile(`${pub}/${file}`);
  console.log(`✓ ${file} (${size}x${size})`);
}

console.log("Done.");
