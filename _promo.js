const fs = require('fs');
const files = fs.readdirSync('.').filter((f) => f.endsWith('.html') && f !== 'index.html');
const oldPromo = 'Plant-based protein &middot; Dairy-free &middot; Ready to drink';
const newPromo = '100% plant-powered &middot; Vegan friendly &middot; Gym-day protein ready';
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes(oldPromo)) {
    console.log('skip', f);
    continue;
  }
  c = c.split(oldPromo).join(newPromo);
  fs.writeFileSync(f, c);
  console.log('promo', f);
}
