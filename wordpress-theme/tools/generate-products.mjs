// Generates the WooCommerce import CSV and per-product SVG packshots from src/data/*.js
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '../..');
const tmp = path.join(import.meta.dirname, '.tmp');
fs.mkdirSync(tmp, { recursive: true });
fs.copyFileSync(path.join(root, 'src/data/productArt.js'), path.join(tmp, 'productArt.js'));
fs.writeFileSync(path.join(tmp, 'products.js'), fs.readFileSync(path.join(root, 'src/data/products.js'), 'utf8').replace("'./productArt'", "'./productArt.js'"));
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');

const { products } = await import(pathToFileURL(path.join(tmp, 'products.js')).href);
const artDir = path.join(root, 'wordpress-theme/skino-theme/assets/product-art');
fs.mkdirSync(artDir, { recursive: true });

const decode = (uri) => {
  const m = /^data:image\/svg\+xml(;charset=[^,;]+)?(;base64)?,(.*)$/s.exec(uri);
  if (!m) return null;
  return m[2] ? Buffer.from(m[3], 'base64').toString('utf8') : decodeURIComponent(m[3]);
};

const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const cols = ['SKU', 'Name', 'Published', 'Is featured?', 'Short description', 'In stock?', 'Sale price', 'Regular price', 'Categories', 'Brands', 'Tags', 'Meta: _skino_rating', 'Meta: _skino_review_count'];
const rows = [cols.map(q).join(',')];
let svgs = 0;

for (const p of products) {
  const svg = decode(p.image);
  if (svg) { fs.writeFileSync(path.join(artDir, `${p.id}.svg`), svg); svgs++; }
  const hasSale = p.oldPrice && p.oldPrice > p.price;
  rows.push([
    `SKINO-${p.id}`, p.title, 1, 0,
    '',
    1, hasSale ? p.price : '', hasSale ? p.oldPrice : p.price,
    p.category, p.brand, '', p.rating, p.reviews,
  ].map(q).join(','));
}
fs.writeFileSync(path.join(root, 'wordpress-theme/import/skino-products.csv'), '﻿' + rows.join('\n'));
console.log(`${products.length} products -> CSV, ${svgs} SVG packshots`);
fs.rmSync(tmp, { recursive: true, force: true });
