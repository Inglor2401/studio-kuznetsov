// ============================================================
// STUDIO KUZNETSOV — image pipeline
// PNG (Gemini) → AVIF (≤300 KB), rename + place in /public/images/
// Special case: project 01 stair composite (2 photos side-by-side) → split into 03 + 04
// ============================================================

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const STAGING = path.join(ROOT, 'public', 'images', '_staging');
const OUT_BASE = path.join(ROOT, 'public', 'images');
const SPARE = path.join(OUT_BASE, '_spare');

// Mapping: source PNG hash prefix → target relative path under /public/images/
// Format: hash : 'project/file.avif' OR 'special:split-stair' OR 'discard'
const MAPPING = {
  // Project 01 — Patriarshie Penthouse
  'li1chh': 'projects/01/cover.avif',
  '6rwt3b': 'projects/01/01.avif',
  '2qp7gv': 'projects/01/02.avif',
  '23awjy': 'special:split-stair',  // → 01/03 + 01/04

  // Project 02 — Ostozhenka
  'xtoykm': 'projects/02/cover.avif',
  'dv2wtt': 'projects/02/01.avif',
  'br3bki': 'projects/02/02.avif',
  'hv9zdz': 'projects/02/03.avif',

  // Project 03 — Barvikha
  'wxsbr2': 'projects/03/cover.avif',
  'hxdzu':  'projects/03/01.avif',
  'wbc98u': 'projects/03/02.avif',
  'upyf97': 'projects/03/03.avif',
  'jvjkuf': 'projects/03/04.avif',

  // Project 04 — Khamovniki
  '9bip5':  'projects/04/cover.avif',
  'wh22av': 'projects/04/01.avif',
  'u7s3md': 'projects/04/02.avif',
  'j8n1av': 'projects/04/03.avif',

  // Project 05 — Zhukovka
  '1dizdo': 'projects/05/cover.avif',
  '2p8fia': 'projects/05/01.avif',
  'ae519a': 'projects/05/02.avif',
  'hpp5zg': 'projects/05/03.avif',

  // Project 06 — Tverskaya
  '5eemlq': 'projects/06/cover.avif',
  'wx8fgs': 'projects/06/01.avif',
  'sp5hdc': 'projects/06/02.avif',
  'pkjg6h': 'projects/06/03.avif',

  // Project 07 — Rublyovka
  'kbdgau': 'projects/07/cover.avif',
  '65ytvo': 'projects/07/01.avif',
  'oanvrh': 'projects/07/02.avif',
  'f4jnk8': 'projects/07/03.avif',
  'ne2al9': 'projects/07/04.avif',
  'l9aenk': 'spare:rublyovka-cover-variant.avif',

  // Project 08 — Nikolina Gora
  'gmum4f': 'projects/08/cover.avif',
  '2rykzm': 'projects/08/01.avif',
  'j786ws': 'projects/08/02.avif',
  'p8jp4e': 'projects/08/03.avif',

  // Studio
  'bkp25m': 'studio/portrait-in-situ.avif',
  't7qlx7t7qlx7t7ql':       'studio/portrait.avif',         // original (no suffix)
  't7qlx7t7qlx7t7ql (1)':   'discard',                       // duplicate
};

// AVIF encode settings — tuned for premium-photo budget
const AVIF_OPTS = {
  quality: 55,        // 50-60 is sweet spot for photos
  effort: 6,          // 0-9, higher = better compression but slower
  chromaSubsampling: '4:2:0',
};

const MAX_WIDTH = 1920;  // hero/full-width shots
const TARGET_KB = 300;   // performance budget

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function findHash(filename) {
  // Match each mapping key against filename
  for (const key of Object.keys(MAPPING)) {
    if (filename.includes(key)) return key;
  }
  return null;
}

async function processStandard(srcPath, destRel) {
  const destAbs = path.join(OUT_BASE, destRel);
  await ensureDir(path.dirname(destAbs));

  const meta = await sharp(srcPath).metadata();
  const targetWidth = Math.min(meta.width, MAX_WIDTH);

  await sharp(srcPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .avif(AVIF_OPTS)
    .toFile(destAbs);

  const stat = await fs.stat(destAbs);
  return { dest: destRel, kb: (stat.size / 1024).toFixed(1) };
}

async function processSpare(srcPath, spareName) {
  await ensureDir(SPARE);
  const destAbs = path.join(SPARE, spareName);
  const meta = await sharp(srcPath).metadata();
  const targetWidth = Math.min(meta.width, MAX_WIDTH);

  await sharp(srcPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .avif(AVIF_OPTS)
    .toFile(destAbs);

  const stat = await fs.stat(destAbs);
  return { dest: `_spare/${spareName}`, kb: (stat.size / 1024).toFixed(1) };
}

async function processStairSplit(srcPath) {
  // 01/03.avif = LEFT half, 01/04.avif = RIGHT half
  const dest03 = path.join(OUT_BASE, 'projects', '01', '03.avif');
  const dest04 = path.join(OUT_BASE, 'projects', '01', '04.avif');
  await ensureDir(path.dirname(dest03));

  const meta = await sharp(srcPath).metadata();
  const halfW = Math.floor(meta.width / 2);
  // Output: each half ~960px wide if source is 1920+
  const outWidth = Math.min(halfW, 1200);

  await sharp(srcPath)
    .extract({ left: 0, top: 0, width: halfW, height: meta.height })
    .resize({ width: outWidth, withoutEnlargement: true })
    .avif(AVIF_OPTS)
    .toFile(dest03);

  await sharp(srcPath)
    .extract({ left: halfW, top: 0, width: halfW, height: meta.height })
    .resize({ width: outWidth, withoutEnlargement: true })
    .avif(AVIF_OPTS)
    .toFile(dest04);

  const s03 = await fs.stat(dest03);
  const s04 = await fs.stat(dest04);
  return [
    { dest: 'projects/01/03.avif', kb: (s03.size / 1024).toFixed(1) },
    { dest: 'projects/01/04.avif', kb: (s04.size / 1024).toFixed(1) },
  ];
}

async function main() {
  console.log('STUDIO KUZNETSOV — image pipeline\n');

  const files = await fs.readdir(STAGING);
  const pngs = files.filter(f => f.toLowerCase().endsWith('.png'));
  console.log(`Found ${pngs.length} PNG files in staging.\n`);

  const results = [];
  const unmatched = [];
  const discarded = [];

  for (const f of pngs.sort()) {
    const srcPath = path.join(STAGING, f);

    // Special case: discard duplicate t7qlx7 (1)
    if (f.includes('t7qlx7t7qlx7t7ql (1)')) {
      discarded.push(f);
      console.log(`  DISCARD  ${f}  (duplicate)`);
      continue;
    }

    const key = findHash(f);
    if (!key) {
      unmatched.push(f);
      console.log(`  UNMATCH  ${f}`);
      continue;
    }

    const action = MAPPING[key];

    if (action === 'special:split-stair') {
      const out = await processStairSplit(srcPath);
      results.push(...out);
      console.log(`  SPLIT    ${f}  →  ${out[0].dest} (${out[0].kb} KB) + ${out[1].dest} (${out[1].kb} KB)`);
    } else if (action.startsWith('spare:')) {
      const spareName = action.slice('spare:'.length);
      const r = await processSpare(srcPath, spareName);
      results.push(r);
      console.log(`  SPARE    ${f}  →  ${r.dest} (${r.kb} KB)`);
    } else if (action === 'discard') {
      discarded.push(f);
      console.log(`  DISCARD  ${f}`);
    } else {
      const r = await processStandard(srcPath, action);
      results.push(r);
      const flag = parseFloat(r.kb) > TARGET_KB ? ' ⚠ over budget' : '';
      console.log(`  OK       ${f}  →  ${r.dest} (${r.kb} KB)${flag}`);
    }
  }

  // Summary
  const total = results.reduce((s, r) => s + parseFloat(r.kb), 0);
  const overBudget = results.filter(r => parseFloat(r.kb) > TARGET_KB);

  console.log(`\n--- SUMMARY ---`);
  console.log(`Processed: ${results.length} AVIF files`);
  console.log(`Discarded: ${discarded.length} (duplicates)`);
  console.log(`Unmatched: ${unmatched.length}`);
  console.log(`Total size: ${total.toFixed(1)} KB`);
  console.log(`Over ${TARGET_KB} KB budget: ${overBudget.length} files`);
  if (overBudget.length) {
    overBudget.forEach(r => console.log(`  ⚠ ${r.dest} = ${r.kb} KB`));
  }
  if (unmatched.length) {
    console.log(`\n⚠ UNMATCHED FILES (need attention):`);
    unmatched.forEach(f => console.log(`  ${f}`));
  }
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
