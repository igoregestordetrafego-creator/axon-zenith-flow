import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = "/Users/igoreduardosilva/Downloads/Gemini_Generated_Image_rp19perp19perp19 (2).png";
const pub = resolve(__dirname, "../public");

// Read raw RGBA pixels from source
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = new Uint8Array(data);

// Replace near-gray background pixels with transparent (alpha=0)
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  if (saturation < 0.05) {
    pixels[i + 3] = 0; // fully transparent
  }
}

// Rebuild with transparency, resize bird to fill most of the space
const BIRD_SIZE = 480;
const CANVAS    = 512;
const PADDING   = (CANVAS - BIRD_SIZE) / 2; // 16px each side

await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
  .resize(BIRD_SIZE, BIRD_SIZE, {
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

console.log("✓ favicon.png (512x512, transparent)");

// Derive smaller sizes
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
