const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'products.js');
let fileContent = fs.readFileSync(filepath, 'utf8');

// Use regex to extract the JSON array.
const start = fileContent.indexOf('[');
const end = fileContent.lastIndexOf(']') + 1;

if (start === -1 || end === -1) {
  console.error('Could not find array in products.js');
  process.exit(1);
}

const arrayString = fileContent.substring(start, end);
const products = JSON.parse(arrayString);

const knownBrands = [
  'Anua', 'Sheglam', 'Centella', 'Cosrx', 'Everly', 'Lily', 'Medicube', 'Nior', 
  'Swiss Beauty', 'Mars', 'Celimax', 'Trendy Beauty', 'Beauty Glazed', 'Simple', 
  'Skino', 'Pastel Beauty', 'Imagic', 'Sunsilk', 'Dot & Key',
  'Bath & Body Works', 'Rare Beauty', 'Moroccanoil', 'Olaplex', 'Glossier'
];

products.forEach(p => {
  if (p.brand) return; // Already has brand
  
  // See if title starts with any known brand
  let foundBrand = null;
  for (const b of knownBrands) {
    if (p.title.toLowerCase().startsWith(b.toLowerCase())) {
      foundBrand = b;
      break;
    }
  }
  
  if (foundBrand) {
    p.brand = foundBrand;
  } else {
    // Just use the first word of the title as a default brand
    const firstWord = p.title.split(' ')[0];
    p.brand = firstWord;
  }
});

const newContent = `export const products = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync(filepath, newContent, 'utf8');
console.log('Successfully added brands to products.js');
