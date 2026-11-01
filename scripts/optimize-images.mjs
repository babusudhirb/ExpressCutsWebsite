import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Runs after `next build`. The export is plain files on Hostinger, so there is no
 * server to resize images on request: this writes each picture ahead of time at the
 * widths next/image asks for (see src/lib/image-loader.ts). Same crop and same
 * proportions, never upscaled. The originals in out/images stay for Open Graph and
 * schema URLs.
 */
const WIDTHS = [256, 384, 640, 828, 1200, 1920];
const QUALITY = 82;
const PARALLEL = 4;

const source = path.resolve("public/images");
const target = path.resolve("out/_img");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : /\.(png|jpe?g|webp)$/i.test(entry.name) ? [full] : [];
  });

async function encode(file) {
  const base = path.relative(source, file).replace(/\.[^.]+$/, "");
  const data = fs.readFileSync(file);
  for (const width of WIDTHS) {
    const out = path.join(target, `${base}-${width}.webp`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(data).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 4 }).toFile(out);
  }
}

const files = walk(source);
const queue = [...files];
await Promise.all(
  Array.from({ length: PARALLEL }, async () => {
    for (let file = queue.shift(); file; file = queue.shift()) await encode(file);
  }),
);
console.log(`Optimised ${files.length} images at ${WIDTHS.length} widths.`);
