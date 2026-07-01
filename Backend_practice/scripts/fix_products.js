require('dotenv').config();
const connectdb = require('../config/db');
const Product = require('../models/Products');

const fixedProducts = {
  'samsungs24ultra': {
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    description: 'The ultimate Galaxy experience with a built-in S Pen, 200MP camera, 6.8" Dynamic AMOLED 2X display, and Snapdragon 8 Gen 3 processor for AI-powered performance.',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573424?$650_519_PNG$',
  },
  'iphone': {
    name: 'Apple iPhone 16 Pro',
    price: 119900,
    description: 'Apple iPhone 16 Pro with A18 Pro chip, 48MP Fusion camera system, 6.3" Super Retina XDR display with ProMotion, and the all-new Camera Control button.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1724926862164',
  },
  'mcnoa': {
    name: 'Nokia G42 5G',
    price: 15999,
    description: 'Nokia G42 5G with Snapdragon 480+ processor, 50MP triple camera, 6.56" HD+ display, 5000mAh battery, and repairable design with 3 years of OS updates guaranteed.',
    image: 'https://www.hmd.com/sites/default/files/styles/product_full/public/2023-08/Nokia-G42-5G-So-Pink-front.png',
  },
  'google pixel': {
    name: 'Google Pixel 9 Pro',
    price: 109999,
    description: 'Google Pixel 9 Pro with Google Tensor G4 chip, 50MP triple rear camera with 5x optical zoom, 6.3" LTPO OLED display, and 7 years of guaranteed OS & security updates.',
    image: 'https://lh3.googleusercontent.com/AdnS_GX5EGG62FGV_W2oE0nJhvAfKHdFBDGXtQmSnlbKzBxmXAZx4bVf5bVMluSXiKY=w1200',
  },
  'nothing': {
    name: 'Nothing Phone (3a) Pro',
    price: 39999,
    description: 'Nothing Phone (3a) Pro with Snapdragon 7s Gen 3, 50MP triple camera with periscope telephoto lens, 6.77" AMOLED display, and the iconic customizable Glyph Interface.',
    image: 'https://assets.nothing.tech/uploads/2025/02/Phone_3a_Pro_Graphite_Front_Back.jpg',
  },
  'poco x7 pro': {
    name: 'Poco X7 Pro',
    price: 29999,
    description: 'Poco X7 Pro 5G with MediaTek Dimensity 8400 Ultra, 50MP OIS triple camera, 6.67" 144Hz AMOLED display, 5110mAh battery, and 90W HyperCharge fast charging.',
    image: 'https://i02.appmifile.com/mi-com-product/fly-birds/poco-x7-pro/7e9cda73b25bc5fcf86ccc7e08aff694.png',
  },
  'moto': {
    name: 'Motorola Edge 50 Pro',
    price: 31999,
    description: 'Motorola Edge 50 Pro with Snapdragon 7s Gen 2, 50MP OIS camera with 10MP telephoto, 6.7" curved pOLED 144Hz display, 4500mAh battery, and 125W TurboPower charging.',
    image: 'https://motorola-global-portal.custhelp.com/ci/fattach/get/172512/1714413596/redirect/1/filename/forest-grey-front.png',
  },
};

connectdb().then(async () => {
  try {
    // 1. Delete all products with no name (empty/ghost records)
    const deleteResult = await Product.deleteMany({
      $or: [
        { name: { $exists: false } },
        { name: null },
        { name: '' },
      ],
    });
    console.log(`Deleted ${deleteResult.deletedCount} empty/ghost products.`);

    // 2. Update remaining products with proper data
    const products = await Product.find();
    let updatedCount = 0;

    for (const prod of products) {
      const nameLower = (prod.name || '').trim().toLowerCase();
      // Find matching fix entry
      const matchKey = Object.keys(fixedProducts).find(key =>
        nameLower === key ||
        nameLower.includes(key) ||
        key.includes(nameLower)
      );

      if (matchKey) {
        const fix = fixedProducts[matchKey];
        await Product.findByIdAndUpdate(prod._id, {
          name: fix.name,
          price: fix.price,
          description: fix.description,
          image: fix.image,
        });
        console.log(`  Updated: "${prod.name}" → "${fix.name}" ($${fix.price})`);
        updatedCount++;
      } else {
        console.log(`  No fix found for: "${prod.name}" — deleting garbage record.`);
        await Product.findByIdAndDelete(prod._id);
      }
    }

    console.log(`\nDone! Updated ${updatedCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(err => {
  console.error('DB connect failed', err);
  process.exit(1);
});
