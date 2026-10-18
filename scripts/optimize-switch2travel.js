import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(
  __dirname,
  "../src/assets/Originals/Work/switch2travel.jpg"
);
const outDir = path.join(
  __dirname,
  "../src/assets/images/Work/switch2travel"
);
const sizes = [480, 768, 1440];

const meta = await sharp(input).metadata();
console.log("source", meta.width, meta.height, meta.format);

for (const width of sizes) {
  const finalWidth = Math.min(width, meta.width || width);
  await sharp(input)
    .resize({ width: finalWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(outDir, `switch2travel-${width}.webp`));
  await sharp(input)
    .resize({ width: finalWidth, withoutEnlargement: true })
    .avif({ quality: 68, effort: 6 })
    .toFile(path.join(outDir, `switch2travel-${width}.avif`));
  console.log("done", width, "->", finalWidth);
}
