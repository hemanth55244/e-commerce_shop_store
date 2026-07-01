require('dotenv').config();
const connectdb = require('../config/db');
const Product = require('../models/Products');

connectdb().then(async () => {
  try {
    const products = await Product.find();
    let updated = 0;

    const normalize = (p) => {
      if (!p) return '';
      if (typeof p !== 'string') return '';
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('http')) return trimmed;
      // find uploads segment regardless of slashes
      const lower = trimmed.toLowerCase();
      const idx = lower.indexOf('uploads');
      if (idx !== -1) {
        let rel = trimmed.slice(idx);
        rel = rel.replace(/\\\\/g, '/').replace(/\\/g, '/');
        // ensure no leading './' or similar
        rel = rel.replace(/^\.\//, '');
        return rel;
      }

      // if it looks like a filename with extension, put under uploads/
      if (/^[\w\- .]+\.[a-zA-Z0-9]{2,6}$/.test(trimmed)) {
        return `uploads/${trimmed.replace(/\\\\/g, '/').replace(/\\/g, '/').replace(/^\//, '')}`;
      }

      return '';
    };

    for (const prod of products) {
      const orig = prod.image || '';
      const normalized = normalize(orig);
      if (normalized !== orig) {
        prod.image = normalized;
        await prod.save();
        updated++;
        console.log(`Updated ${prod._id}: "${orig}" -> "${normalized}"`);
      }
    }

    console.log(`Done. Updated ${updated} products.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(err => { console.error('DB connect failed', err); process.exit(1); });
