/* Demo photography used wherever a product or brand has no real image yet. */
const files = import.meta.glob('../assets/demo/*.jpg', { eager: true, query: '?url', import: 'default' });

const byFamily = {};
Object.keys(files).sort().forEach((path) => {
  const family = path.split('/').pop().split('_')[0];
  (byFamily[family] ||= []).push(files[path]);
});

const FAMILY = {
  'Makeup': 'makeup', 'Hair Care': 'hair', 'Hairfall': 'hair', 'Dandruff': 'hair',
  'Fragrance': 'fragrance', 'Body Care': 'body', 'Accessories': 'accessories',
};

const hash = (v) => [...String(v)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Picks a stable demo photo for a family ('skin', 'makeup', ...) and seed (id or title). */
export const demoImage = (family, seed = 0) => {
  const list = byFamily[family] || byFamily.skin;
  return list[hash(seed) % list.length];
};

export const demoImageForCategory = (category, seed) => demoImage(FAMILY[category] || 'skin', seed);
