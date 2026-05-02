// ============================================================
// STUDIO KUZNETSOV — OG image generator
// Resizes project AVIF covers to 1200×630 PNG для social sharing
// (AVIF не поддерживается в OG некоторыми платформами — нужен PNG/JPG)
// ============================================================

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROJECTS_DIR = path.join(ROOT, 'public', 'images', 'projects');
const OG_DIR = path.join(ROOT, 'public', 'og');
const OG_PROJECTS_DIR = path.join(OG_DIR, 'projects');

const PROJECT_SLUGS = [
  'patriarshie-penthouse',
  'ostozhenka-apartment',
  'barvikha-house',
  'khamovniki-loft',
  'zhukovka-residence',
  'tverskaya-apartment',
  'rublevka-house',
  'nikolina-gora-dacha',
];

const PROJECT_NUMBERS = ['01','02','03','04','05','06','07','08'];

await fs.mkdir(OG_DIR, { recursive: true });
await fs.mkdir(OG_PROJECTS_DIR, { recursive: true });

console.log('STUDIO KUZNETSOV — OG image generation\n');

const results = [];

// Per-project OG (8 шт)
for (let i = 0; i < PROJECT_SLUGS.length; i++) {
  const slug = PROJECT_SLUGS[i];
  const num = PROJECT_NUMBERS[i];
  const src = path.join(PROJECTS_DIR, num, 'cover.avif');
  const dst = path.join(OG_PROJECTS_DIR, `${slug}.png`);

  await sharp(src)
    .resize({
      width: 1200,
      height: 630,
      fit: 'cover',
      position: 'center',
    })
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(dst);

  const stat = await fs.stat(dst);
  results.push({ name: `og/projects/${slug}.png`, kb: (stat.size / 1024).toFixed(1) });
}

// Default OG = Patriarshie penthouse cover (главный hero сайта)
await sharp(path.join(PROJECTS_DIR, '01', 'cover.avif'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
  .png({ quality: 85, compressionLevel: 9 })
  .toFile(path.join(OG_DIR, 'default.png'));
results.push({
  name: 'og/default.png',
  kb: ((await fs.stat(path.join(OG_DIR, 'default.png'))).size / 1024).toFixed(1),
});

// Studio OG = Артём in-situ portrait
await sharp(path.join(ROOT, 'public', 'images', 'studio', 'portrait-in-situ.avif'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
  .png({ quality: 85, compressionLevel: 9 })
  .toFile(path.join(OG_DIR, 'studio.png'));
results.push({
  name: 'og/studio.png',
  kb: ((await fs.stat(path.join(OG_DIR, 'studio.png'))).size / 1024).toFixed(1),
});

// Projects-index OG = Барвиха (самый «представительный» кейс)
await sharp(path.join(PROJECTS_DIR, '03', 'cover.avif'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
  .png({ quality: 85, compressionLevel: 9 })
  .toFile(path.join(OG_DIR, 'projects.png'));
results.push({
  name: 'og/projects.png',
  kb: ((await fs.stat(path.join(OG_DIR, 'projects.png'))).size / 1024).toFixed(1),
});

// Contact OG = Khamovniki loft (industrial)
await sharp(path.join(PROJECTS_DIR, '04', 'cover.avif'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
  .png({ quality: 85, compressionLevel: 9 })
  .toFile(path.join(OG_DIR, 'contact.png'));
results.push({
  name: 'og/contact.png',
  kb: ((await fs.stat(path.join(OG_DIR, 'contact.png'))).size / 1024).toFixed(1),
});

console.log(`Generated ${results.length} OG images:\n`);
results.forEach(r => console.log(`  ${r.name.padEnd(50)} ${r.kb} KB`));
const totalKB = results.reduce((s, r) => s + parseFloat(r.kb), 0);
console.log(`\nTotal: ${totalKB.toFixed(1)} KB`);
