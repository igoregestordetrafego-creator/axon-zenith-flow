import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../public/favicon.png");
const out = resolve(__dirname, "../public");

const BG = { r: 10, g: 10, b: 10, alpha: 1 };

async function makeIcon(size, padding, outFile) {
  const birdSize = size - padding * 2;

  // Resize bird (preserving transparency), then composite onto solid background
  const bird = await sharp(src)
    .resize(birdSize, birdSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: bird, gravity: "center" }])
    .png()
    .toFile(`${out}/${outFile}`);

  console.log(`✓ ${outFile} (${size}x${size}, padding ${padding}px)`);
}

await makeIcon(32, 4, "favicon-32x32.png");
await makeIcon(16, 2, "favicon-16x16.png");
await makeIcon(180, 20, "apple-touch-icon.png");

console.log("Done.");
