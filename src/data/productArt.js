/*
 * Generates a clean packshot (SVG) for a product: the packaging type is inferred from the title
 * (serum -> dropper bottle, cream -> jar, lipstick -> lipstick, ...) and the colours from the id,
 * so neighbouring products in a grid are easy to tell apart. Used until real photography exists.
 */

const hash = (v) => [...String(v)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CAPS = [
  { name: 'gold', a: '#e8cf8f', b: '#a8802f' },
  { name: 'rose', a: '#f3c6c6', b: '#c2788a' },
  { name: 'ink', a: '#5b5560', b: '#25222a' },
  { name: 'silver', a: '#f1f1f4', b: '#9a9aa6' },
  { name: 'copper', a: '#efbf9c', b: '#b5683a' },
];

/* Order matters: first keyword found in the title wins. */
const SHAPES = [
  ['dropper', ['serum', 'essence', 'ampoule', 'treatment']],
  ['lipstick', ['lipstick']],
  ['gloss', ['gloss', 'lip oil', 'lip balm']],
  ['mascara', ['mascara']],
  ['palette', ['palette', 'blush', 'highlighter', 'bronzer', 'powder']],
  ['concealer', ['concealer']],
  ['pump', ['foundation', 'primer', 'lotion', 'shampoo', 'conditioner', 'wash', 'cleanser']],
  ['perfume', ['perfume', 'parfum', 'toilette', 'cologne']],
  ['spray', ['spray', 'mist', 'toner', 'hairspray']],
  ['jar', ['cream', 'moisturizer', 'mask', 'balm', 'scrub', 'peel']],
  ['tube', ['sunscreen', 'gel']],
  ['stick', ['deodorant']],
  ['bomb', ['bomb']],
  ['sponge', ['sponge']],
  ['curler', ['curler']],
  ['mirror', ['mirror']],
  ['tweezers', ['tweezers']],
  ['roller', ['roller', 'gua sha']],
  ['brush', ['brush']],
  ['bag', ['bag']],
  ['headband', ['headband']],
  ['dropper', ['oil']],
];

const BY_CATEGORY = {
  'Acne Care': 'tube', 'Anti Aging': 'jar', 'Spot Treatment': 'dropper', 'Skin Dryness': 'pump', 'Oil Control': 'spray',
  'Sensitive Skin': 'jar', 'Dandruff': 'pump', 'Hairfall': 'dropper', 'Combination Skin': 'tube', 'Dull Skin': 'dropper',
  'Skin Care': 'jar', 'Makeup': 'palette', 'Hair Care': 'pump', 'Fragrance': 'perfume', 'Body Care': 'pump', 'Accessories': 'brush',
};

const pickShape = (title, category) => {
  const t = title.toLowerCase();
  const hit = SHAPES.find(([, words]) => words.some((w) => t.includes(w)));
  return hit ? hit[0] : BY_CATEGORY[category] || 'jar';
};

const grad = (id, a, b, horizontal = true) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${horizontal ? 1 : 0}" y2="${horizontal ? 0 : 1}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

const label = (x, y, w, h, brand, kind, ink) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fffdf9" opacity=".94"/>
  <text x="${x + w / 2}" y="${y + h * 0.4}" text-anchor="middle" font-family="Georgia,serif" font-size="${Math.min(15, (w - 10) / Math.max(6, brand.length) * 1.55)}" font-weight="700" letter-spacing="1" fill="${ink}">${esc(brand)}</text>
  <text x="${x + w / 2}" y="${y + h * 0.72}" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="2" fill="#7a736b">${esc(kind)}</text>`;

/* Each shape draws on a 400x400 canvas, centred on x=200 with the base at y=332. */
const DRAW = {
  dropper: (c) => `
    <rect x="152" y="170" width="96" height="162" rx="22" fill="url(#body)"/>
    <rect x="152" y="170" width="96" height="162" rx="22" fill="${c.tint}" opacity=".35"/>
    <rect x="162" y="176" width="10" height="144" rx="5" fill="#fff" opacity=".45"/>
    <rect x="174" y="128" width="52" height="44" rx="6" fill="url(#cap)"/>
    <rect x="186" y="78" width="28" height="54" rx="14" fill="#fbf7f1"/>
    <rect x="186" y="78" width="28" height="54" rx="14" fill="url(#bulb)"/>
    ${label(166, 210, 68, 76, c.brand, c.kind, c.ink)}`,
  jar: (c) => `
    <rect x="112" y="226" width="176" height="106" rx="20" fill="url(#body)"/>
    <rect x="112" y="226" width="176" height="106" rx="20" fill="${c.tint}" opacity=".3"/>
    <rect x="104" y="176" width="192" height="58" rx="14" fill="url(#cap)"/>
    <rect x="116" y="184" width="168" height="8" rx="4" fill="#fff" opacity=".35"/>
    ${label(138, 246, 124, 64, c.brand, c.kind, c.ink)}`,
  tube: (c) => `
    <path d="M148 120 h104 l10 190 q0 22 -22 22 h-80 q-22 0 -22 -22 z" fill="url(#body)"/>
    <path d="M148 120 h104 l10 190 q0 22 -22 22 h-80 q-22 0 -22 -22 z" fill="${c.tint}" opacity=".3"/>
    <rect x="146" y="298" width="108" height="8" fill="#000" opacity=".06"/>
    <rect x="164" y="76" width="72" height="48" rx="8" fill="url(#cap)"/>
    ${label(158, 176, 84, 84, c.brand, c.kind, c.ink)}`,
  pump: (c) => `
    <rect x="144" y="150" width="112" height="182" rx="26" fill="url(#body)"/>
    <rect x="144" y="150" width="112" height="182" rx="26" fill="${c.tint}" opacity=".3"/>
    <rect x="178" y="118" width="44" height="36" rx="6" fill="url(#cap)"/>
    <rect x="190" y="86" width="20" height="36" rx="5" fill="url(#cap)"/>
    <path d="M190 90 h-34 a8 8 0 0 0 -8 8 v6 h44 z" fill="url(#cap)"/>
    ${label(158, 196, 84, 90, c.brand, c.kind, c.ink)}`,
  spray: (c) => `
    <rect x="148" y="136" width="104" height="196" rx="24" fill="url(#body)"/>
    <rect x="148" y="136" width="104" height="196" rx="24" fill="${c.tint}" opacity=".3"/>
    <rect x="170" y="102" width="60" height="38" rx="8" fill="url(#cap)"/>
    <rect x="184" y="74" width="32" height="32" rx="6" fill="url(#cap)"/>
    <circle cx="176" cy="80" r="4" fill="#fff" opacity=".7"/>
    ${label(160, 190, 80, 96, c.brand, c.kind, c.ink)}`,
  perfume: (c) => `
    <rect x="186" y="96" width="28" height="34" rx="5" fill="url(#cap)"/>
    <rect x="164" y="124" width="72" height="26" rx="4" fill="url(#cap)"/>
    <path d="M128 168 q0 -22 22 -22 h100 q22 0 22 22 v140 q0 24 -24 24 h-96 q-24 0 -24 -24 z" fill="url(#body)"/>
    <path d="M128 168 q0 -22 22 -22 h100 q22 0 22 22 v140 q0 24 -24 24 h-96 q-24 0 -24 -24 z" fill="${c.tint}" opacity=".42"/>
    <rect x="140" y="158" width="10" height="150" rx="5" fill="#fff" opacity=".5"/>
    ${label(158, 208, 84, 70, c.brand, c.kind, c.ink)}`,
  lipstick: (c) => `
    <rect x="164" y="236" width="72" height="96" rx="8" fill="url(#cap)"/>
    <rect x="164" y="212" width="72" height="30" rx="4" fill="#fbf7f1" opacity=".4"/>
    <rect x="170" y="196" width="60" height="30" fill="#2a2024" opacity=".85"/>
    <path d="M174 196 v-66 q0 -26 26 -34 q26 8 26 34 v66 z" fill="${c.tint}" stroke="#000" stroke-opacity=".08"/>
    <path d="M182 190 v-58 q0 -16 12 -22" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round"/>
    <text x="200" y="292" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" letter-spacing="1" fill="#fff">${esc(c.brand)}</text>`,
  gloss: (c) => `
    <rect x="166" y="190" width="68" height="142" rx="16" fill="url(#body)"/>
    <rect x="166" y="190" width="68" height="142" rx="16" fill="${c.tint}" opacity=".5"/>
    <rect x="178" y="196" width="8" height="120" rx="4" fill="#fff" opacity=".5"/>
    <rect x="176" y="96" width="48" height="98" rx="12" fill="url(#cap)"/>
    <text x="200" y="272" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" letter-spacing="1" fill="${c.ink}">${esc(c.brand)}</text>`,
  mascara: (c) => `
    <rect x="162" y="170" width="76" height="162" rx="18" fill="url(#body)"/>
    <rect x="162" y="170" width="76" height="162" rx="18" fill="${c.tint}" opacity=".25"/>
    <rect x="152" y="70" width="96" height="108" rx="16" fill="url(#cap)"/>
    <rect x="168" y="80" width="8" height="88" rx="4" fill="#fff" opacity=".28"/>
    ${label(168, 214, 64, 76, c.brand, c.kind, c.ink)}`,
  concealer: (c) => `
    <rect x="178" y="206" width="44" height="126" rx="12" fill="url(#body)"/>
    <rect x="178" y="206" width="44" height="126" rx="12" fill="${c.tint}" opacity=".5"/>
    <rect x="170" y="120" width="60" height="92" rx="12" fill="url(#cap)"/>
    <rect x="190" y="70" width="20" height="54" rx="9" fill="#2a2024"/>
    <text x="200" y="278" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="700" letter-spacing=".5" fill="${c.ink}">${esc(c.brand.slice(0, 9))}</text>`,
  palette: (c) => `
    <rect x="96" y="132" width="208" height="176" rx="22" fill="url(#cap)"/>
    <rect x="108" y="144" width="184" height="152" rx="14" fill="${c.ink}" opacity=".12"/>
    ${[0, 1, 2].map((i) => `<circle cx="${148 + i * 52}" cy="190" r="22" fill="hsl(${c.h + i * 14},${48 + i * 6}%,${70 - i * 8}%)"/>`).join('')}
    ${[0, 1, 2].map((i) => `<circle cx="${148 + i * 52}" cy="246" r="22" fill="hsl(${c.h - 10 + i * 18},${44 + i * 8}%,${62 - i * 7}%)"/>`).join('')}
    <text x="200" y="326" text-anchor="middle" font-family="Georgia,serif" font-size="12" font-weight="700" letter-spacing="2" fill="${c.ink}">${esc(c.brand)}</text>`,
  stick: (c) => `
    <rect x="152" y="120" width="96" height="212" rx="30" fill="url(#body)"/>
    <rect x="152" y="120" width="96" height="212" rx="30" fill="${c.tint}" opacity=".3"/>
    <rect x="160" y="86" width="80" height="48" rx="22" fill="url(#cap)"/>
    ${label(164, 190, 72, 86, c.brand, c.kind, c.ink)}`,
  bomb: (c) => `
    <circle cx="200" cy="228" r="96" fill="url(#body)"/>
    <circle cx="200" cy="228" r="96" fill="${c.tint}" opacity=".7"/>
    <path d="M104 228 a96 96 0 0 1 192 0" fill="#fff" opacity=".18"/>
    ${[[160, 190], [236, 204], [190, 262], [250, 262], [140, 252]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" opacity=".55"/>`).join('')}
    <text x="200" y="232" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="700" letter-spacing="1" fill="#fff">${esc(c.brand)}</text>`,
  sponge: (c) => `
    <path d="M200 90 q92 20 92 120 q0 108 -92 122 q-92 -14 -92 -122 q0 -100 92 -120 z" fill="${c.tint}"/>
    <path d="M200 90 q92 20 92 120 q0 108 -92 122 q-92 -14 -92 -122 q0 -100 92 -120 z" fill="url(#bulb)"/>
    ${[[168, 160], [226, 190], [180, 240], [232, 262], [150, 210], [204, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" opacity=".4"/>`).join('')}`,
  curler: (c) => `
    <path d="M120 130 q-48 90 24 190" fill="none" stroke="url(#cap)" stroke-width="16" stroke-linecap="round"/>
    <path d="M280 130 q48 90 -24 190" fill="none" stroke="url(#cap)" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="200" cy="130" rx="80" ry="22" fill="none" stroke="url(#cap)" stroke-width="12"/>
    <ellipse cx="200" cy="196" rx="76" ry="18" fill="none" stroke="${c.tint}" stroke-width="10"/>
    <rect x="132" y="300" width="136" height="26" rx="13" fill="${c.tint}"/>`,
  mirror: (c) => `
    <circle cx="200" cy="170" r="88" fill="url(#cap)"/>
    <circle cx="200" cy="170" r="74" fill="#eef3f6"/>
    <path d="M150 140 q30 -34 70 -26" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>
    <rect x="188" y="254" width="24" height="84" rx="12" fill="url(#cap)"/>`,
  tweezers: (c) => `
    <path d="M168 330 L196 104 q4 -22 8 0 L232 330 q-24 -10 -32 -32 q-8 22 -32 32 z" fill="url(#cap)"/>
    <path d="M196 104 L184 318 M204 104 L216 318" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/>
    <rect x="180" y="300" width="40" height="30" rx="6" fill="${c.tint}"/>`,
  roller: (c) => `
    <rect x="186" y="200" width="28" height="132" rx="14" fill="url(#cap)"/>
    <rect x="132" y="100" width="136" height="104" rx="52" fill="${c.tint}"/>
    <rect x="132" y="100" width="136" height="104" rx="52" fill="url(#bulb)"/>
    <path d="M154 126 q22 -20 54 -16" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/>`,
  brush: (c) => `
    <rect x="186" y="170" width="28" height="164" rx="14" fill="url(#cap)"/>
    <rect x="178" y="138" width="44" height="46" fill="url(#cap)"/>
    <path d="M178 140 q-26 -52 22 -72 q48 20 22 72 z" fill="${c.tint}"/>
    <path d="M190 138 q-12 -44 10 -60" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none"/>`,
  bag: (c) => `
    <path d="M160 140 q0 -50 40 -50 q40 0 40 50" fill="none" stroke="url(#cap)" stroke-width="10"/>
    <rect x="100" y="140" width="200" height="190" rx="26" fill="${c.tint}"/>
    <rect x="100" y="140" width="200" height="190" rx="26" fill="url(#bulb)"/>
    <rect x="100" y="188" width="200" height="8" fill="#fff" opacity=".35"/>
    <circle cx="200" cy="196" r="9" fill="url(#cap)"/>
    <text x="200" y="272" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="700" letter-spacing="2" fill="#fff">${esc(c.brand)}</text>`,
  headband: (c) => `
    <path d="M90 270 q0 -160 110 -160 q110 0 110 160" fill="none" stroke="${c.tint}" stroke-width="30" stroke-linecap="round"/>
    <path d="M110 250 q10 -110 90 -118" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round"/>
    <circle cx="200" cy="112" r="14" fill="url(#cap)"/>`,
};

export const productArt = (product) => {
  const seed = product.id;
  const h = hash(seed) % 360;
  const cap = CAPS[hash(seed + 'c') % CAPS.length];
  const brand = (product.brand || '').toUpperCase().slice(0, 14) || 'BEAUTY';
  const rest = product.brand && product.title.startsWith(product.brand) ? product.title.slice(product.brand.length).trim() : product.title;
  const kind = pickShape(rest, product.category);
  const words = rest.split(/\s+/).filter(Boolean);
  const kindLabel = (words.slice(-1)[0] || '').toUpperCase().slice(0, 14);
  const c = {
    h, brand, kind: kindLabel,
    tint: `hsl(${h},${kind === 'lipstick' || kind === 'bomb' ? 62 : 46}%,${kind === 'lipstick' ? 48 : 78}%)`,
    ink: `hsl(${h},30%,24%)`,
  };
  const body = `hsl(${h},35%,97%)`;
  const bodyEdge = `hsl(${h},28%,86%)`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bg" cx=".5" cy=".38" r=".8"><stop offset="0" stop-color="hsl(${h},60%,97%)"/><stop offset="1" stop-color="hsl(${h},42%,88%)"/></radialGradient>
    ${grad('body', bodyEdge, body)}
    ${grad('cap', cap.a, cap.b)}
    ${grad('bulb', 'rgba(255,255,255,.55)', 'rgba(0,0,0,.08)')}
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <circle cx="${70 + (h % 5) * 60}" cy="${64 + (h % 3) * 12}" r="${34 + (h % 4) * 6}" fill="hsl(${h},60%,94%)" opacity=".8"/>
  <ellipse cx="200" cy="338" rx="108" ry="12" fill="#000" opacity=".16" filter="url(#soft)"/>
  ${(DRAW[kind] || DRAW.jar)(c)}
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
