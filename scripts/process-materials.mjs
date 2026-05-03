// ============================================================
// STUDIO KUZNETSOV — materials image pipeline
// PNG (Gemini) → 1200×1200 AVIF, центральный square crop
// Источник: /public/images/_staging-materials/{slug}.png
// Назначение: /public/images/materials/{slug}.avif
// ============================================================

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const STAGING = path.join(ROOT, 'public', 'images', '_staging-materials');
const OUT = path.join(ROOT, 'public', 'images', 'materials');

// Допустимые slug'и материалов (должны совпадать с site.ts → SITE.materials[].slug)
const KNOWN_SLUGS = new Set([
  'oak',
  'travertine',
  'carrara',
  'lime-plaster',
  'walnut',
  'wild-stone',
  'concrete',
  'brass',
  'black-ash',
  'mica',
]);

const AVIF_OPTS = {
  quality: 55,
  effort: 6,
  chromaSubsampling: '4:2:0',
};

const TARGET_SIZE = 1200;     // square 1200×1200 — достаточно для 2-col grid
const TARGET_KB = 200;        // материалы плотнее проектов, бюджет ниже

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function processOne(srcPath, slug) {
  const destPath = path.join(OUT, `${slug}.avif`);
  await ensureDir(OUT);

  const meta = await sharp(srcPath).metadata();
  // 1) Центральный квадрат по min side
  const minSide = Math.min(meta.width, meta.height);
  // 2) Inset 4% по каждому краю — убирает Gemini watermark в углах
  //    и заодно отрезает любые edge-артефакты генератора
  const inset = Math.floor(minSide * 0.04);
  const cropSize = minSide - inset * 2;
  const left = Math.floor((meta.width - minSide) / 2) + inset;
  const top = Math.floor((meta.height - minSide) / 2) + inset;

  await sharp(srcPath)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize({ width: TARGET_SIZE, height: TARGET_SIZE, withoutEnlargement: false })
    .avif(AVIF_OPTS)
    .toFile(destPath);

  const stat = await fs.stat(destPath);
  return { slug, kb: (stat.size / 1024).toFixed(1) };
}

async function main() {
  console.log('STUDIO KUZNETSOV — materials pipeline\n');

  let files;
  try {
    files = await fs.readdir(STAGING);
  } catch {
    console.error(`✗ Staging directory not found: ${STAGING}`);
    console.error('  Положите PNG-файлы туда, именованные как {slug}.png');
    console.error('  (oak.png, travertine.png, carrara.png, lime-plaster.png, ...)');
    process.exit(1);
  }

  const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));
  console.log(`Найдено ${pngs.length} PNG в staging.\n`);

  const results = [];
  const unmatched = [];

  for (const f of pngs.sort()) {
    const slug = path.basename(f, path.extname(f)).toLowerCase();
    if (!KNOWN_SLUGS.has(slug)) {
      unmatched.push(f);
      console.log(`  UNMATCH  ${f}  (slug "${slug}" не из списка)`);
      continue;
    }

    const r = await processOne(path.join(STAGING, f), slug);
    results.push(r);
    const flag = parseFloat(r.kb) > TARGET_KB ? ' ⚠ over budget' : '';
    console.log(`  OK       ${f}  →  materials/${r.slug}.avif (${r.kb} KB)${flag}`);
  }

  console.log(`\n--- SUMMARY ---`);
  console.log(`Processed: ${results.length} / ${KNOWN_SLUGS.size}`);
  const missing = [...KNOWN_SLUGS].filter((s) => !results.some((r) => r.slug === s));
  if (missing.length) {
    console.log(`Missing slugs: ${missing.join(', ')}`);
  }
  if (unmatched.length) {
    console.log(`Unmatched files: ${unmatched.length}`);
    unmatched.forEach((f) => console.log(`  ${f}`));
  }
  const total = results.reduce((s, r) => s + parseFloat(r.kb), 0);
  console.log(`Total size: ${total.toFixed(1)} KB`);
}

main().catch((err) => {
  console.error('FAILED:', err);
  process.exit(1);
});
