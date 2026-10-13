import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ==============================
// ES Module __dirname
// ==============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// Configuration
// ==============================

const INPUT_DIR = path.join(__dirname, "../src/assets/Originals");
const OUTPUT_DIR = path.join(__dirname, "../src/assets/images");

const SIZES = [480, 768, 1600];

const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;

// ==============================
// Clean previous optimized images
// ==============================

if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, {
    recursive: true,
    force: true,
  });
}

// ==============================
// Optimize Folder Recursively
// ==============================

async function optimizeFolder(inputFolder, outputFolder) {
  fs.mkdirSync(outputFolder, { recursive: true });

  const entries = fs.readdirSync(inputFolder, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const inputPath = path.join(inputFolder, entry.name);

    // Go inside subfolders
    if (entry.isDirectory()) {
      await optimizeFolder(
        inputPath,
        path.join(outputFolder, entry.name)
      );
      continue;
    }

    // Process PNG only
    if (path.extname(entry.name).toLowerCase() !== ".png") {
      continue;
    }

    const imageName = path.basename(entry.name, ".png");

    const imageOutputFolder = path.join(
      outputFolder,
      imageName
    );

    fs.mkdirSync(imageOutputFolder, {
      recursive: true,
    });

    const metadata = await sharp(inputPath).metadata();

    console.log(`\n📸 ${imageName}`);

    for (const width of SIZES) {
      const finalWidth = Math.min(width, metadata.width);

      // ---------- WEBP ----------
      await sharp(inputPath)
        .resize({
          width: finalWidth,
          withoutEnlargement: true,
        })
        .webp({
          quality: WEBP_QUALITY,
          effort: 6,
        })
        .toFile(
          path.join(
            imageOutputFolder,
            `${imageName}-${finalWidth}.webp`
          )
        );

      // ---------- AVIF ----------
      await sharp(inputPath)
        .resize({
          width: finalWidth,
          withoutEnlargement: true,
        })
        .avif({
          quality: AVIF_QUALITY,
          effort: 6,
        })
        .toFile(
          path.join(
            imageOutputFolder,
            `${imageName}-${finalWidth}.avif`
          )
        );

      console.log(`   ✔ ${imageName}-${finalWidth}`);
    }
  }
}

// ==============================
// Run
// ==============================

try {
  console.log("🚀 Optimizing images...\n");

  await optimizeFolder(INPUT_DIR, OUTPUT_DIR);

  console.log("\n✅ All images optimized successfully!");
} catch (error) {
  console.error("\n❌ Error:");
  console.error(error);
}