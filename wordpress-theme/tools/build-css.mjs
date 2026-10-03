// Compiles tools/input.css (Tailwind v4, scans the theme's PHP/JS) into skino-theme/assets/css/app.css.
// Run from the project root:  node wordpress-theme/tools/build-css.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '../..');
const require = createRequire(path.join(root, 'package.json'));
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const from = path.join(import.meta.dirname, 'input.css');
const to = path.join(root, 'wordpress-theme/skino-theme/assets/css/app.css');
const css = fs.readFileSync(from, 'utf8');

const result = await postcss([tailwind({ optimize: { minify: true } }), autoprefixer()]).process(css, { from, to });
fs.writeFileSync(to, result.css);
console.log(`app.css written: ${(result.css.length / 1024).toFixed(1)} KB`);
