import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = "/Users/igoreduardosilva/Downloads/Gemini_Generated_Image_rp19perp19perp19 (2).png";
const pub = resolve(__dirname, "../public");

const BG = { r: 10, g: 10, b: 10 };

// Read raw RGBA pixels from the source
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = new Uint8Array(data);

// Background detection: the Gemini background is neutral gray (R ≈ G ≈ B, ~196-228).
// The bird is warm cream (R > B by ~20 units, saturation > 0.03).
// Replace background pixels with #0A0A0A.
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  // Low saturation (neutral gray) = background
  if (saturation < 0.05) {
    pixels[i]     = 10;
    pixels[i + 1] = 10;
    pixels[i + 2] = 10;
    pixels[i + 3] = 255;
  }
}

const PADDING = 66; // (512 - 380) / 2

// 1. Rebuild from raw, resize bird, extend to 512x512
await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
  .flatten({ background: BG })
  .resize(380, 380, { fit: "contain", background: BG })
  .extend({ top: PADDING, bottom: PADDING, left: PADDING, right: PADDING, background: BG })
  .png()
  .toFile(`${pub}/favicon.png`);

console.log("✓ favicon.png (512x512)");

// 2. Derive smaller sizes from the master
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
