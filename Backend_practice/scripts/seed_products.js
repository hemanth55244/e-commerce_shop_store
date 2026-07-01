require("dotenv").config();
const connectdb = require("../config/db");
const Product = require("../models/Products");

const products = [
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 24990,
    description:
      "Industry-leading noise cancellation with Auto NC Optimizer, crystal clear hands-free calling with 4 beamforming microphones, up to 30 hours battery life, and ultra-comfortable lightweight design at just 250g.",
    image:
      "https://m.media-amazon.com/images/I/61+btxzpfDL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Apple MacBook Air M3",
    price: 114900,
    description:
      "Supercharged by the M3 chip with 8-core CPU and 10-core GPU, 13.6-inch Liquid Retina display, 18 hours of battery life, 8GB unified memory, 256GB SSD, and a fanless silent design.",
    image:
      "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 129999,
    description:
      "The ultimate Galaxy with built-in S Pen, 200MP adaptive camera, 6.8-inch Dynamic AMOLED 2X display with titanium frame, Snapdragon 8 Gen 3 processor, and Galaxy AI features.",
    image:
      "https://m.media-amazon.com/images/I/71lzcCYEdBL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Apple iPad Air M2",
    price: 69900,
    description:
      "Powered by the M2 chip, 11-inch Liquid Retina display with P3 wide color, works with Apple Pencil Pro and Magic Keyboard, 12MP front and back cameras, Wi-Fi 6E, and all-day battery life.",
    image:
      "https://m.media-amazon.com/images/I/61NGnpjoRDL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    price: 9999,
    description:
      "Bold JBL Original Pro Sound with an optimized racetrack-shaped driver, 12 hours of playtime, IP67 waterproof and dustproof rating, and JBL PartyBoost for pairing multiple speakers.",
    image:
      "https://m.media-amazon.com/images/I/71V-VuTiclL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Nike Air Max 270 Sneakers",
    price: 12995,
    description:
      "Nike's first lifestyle Air Max shoe featuring the biggest heel Air unit yet for a super-soft ride. Mesh upper for breathable comfort, foam midsole, and bold color design for everyday style.",
    image:
      "https://m.media-amazon.com/images/I/61-cPOx5JnL._UL1500_.jpg",
    category: "Fashion",
  },
  {
    name: "Levi's 501 Original Jeans",
    price: 4499,
    description:
      "The iconic straight fit jean that started it all. Sits at the waist with a regular fit through the thigh and straight leg. Button fly, 100% cotton denim, built to last for decades.",
    image:
      "https://m.media-amazon.com/images/I/61fVOSGFiXL._UL1500_.jpg",
    category: "Fashion",
  },
  {
    name: "Ray-Ban Aviator Classic Sunglasses",
    price: 8990,
    description:
      "The timeless Ray-Ban Aviator with gold metal frame and classic green G-15 lenses. 100% UV protection, iconic teardrop shape originally designed for US Air Force pilots in 1937.",
    image:
      "https://m.media-amazon.com/images/I/41tiAl2SqFL._SL1000_.jpg",
    category: "Fashion",
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    price: 19995,
    description:
      "Powered by Snapdragon Wear 4100+ platform, featuring heart rate & SpO2 tracking, built-in GPS, Google Assistant, NFC payments, swim-proof design, and always-on display with 3-day battery mode.",
    image:
      "https://m.media-amazon.com/images/I/61Z0siFxV7L._SL1500_.jpg",
    category: "Fashion",
  },
  {
    name: "Adidas Ultraboost Light Running Shoes",
    price: 16999,
    description:
      "The lightest Ultraboost ever with 30% less weight. BOOST midsole provides endless energy return, Continental Rubber outsole for grip, Primeknit upper adapts to your foot, and a carbon footprint reduced design.",
    image:
      "https://m.media-amazon.com/images/I/71ZDjXyXRcL._UL1500_.jpg",
    category: "Fashion",
  },
  {
    name: "Instant Pot Duo 7-in-1 Cooker",
    price: 8499,
    description:
      "7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, food warmer, and yogurt maker. 6-quart capacity with 13 customizable smart programs and advanced safety features.",
    image:
      "https://m.media-amazon.com/images/I/71V1LnDUMaL._SL1500_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Dyson V15 Detect Vacuum Cleaner",
    price: 54900,
    description:
      "Reveals hidden dust with a green laser, counts and measures particles with a piezo sensor, auto-adjusts suction power in real-time, 60 minutes runtime, and HEPA filtration captures 99.99% allergens.",
    image:
      "https://m.media-amazon.com/images/I/61WnOJVVnFL._SL1500_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Philips Digital Air Fryer XXL",
    price: 14995,
    description:
      "Family-size XXL capacity for a whole chicken. Rapid Air Technology for crispy results with up to 90% less fat, digital touchscreen with 7 presets, dishwasher-safe parts, and fat removal technology.",
    image:
      "https://m.media-amazon.com/images/I/51ZP46HSm3L._SL1500_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Nespresso Vertuo Plus Coffee Machine",
    price: 16500,
    description:
      "Centrifusion technology brews 5 different cup sizes from espresso to alto. One-touch operation, automatic capsule recognition, 40-second heat-up time, 1.1L removable water tank, and motorized head opening.",
    image:
      "https://m.media-amazon.com/images/I/61K+1JlyTsL._SL1500_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "IKEA KALLAX Shelf Unit",
    price: 7990,
    description:
      "Versatile 4x2 compartment shelf unit in white finish. Can be placed horizontally or vertically as a bookshelf or display unit. Smooth surfaces, each compartment fits IKEA storage boxes and inserts.",
    image:
      "https://m.media-amazon.com/images/I/61iJBikKRgL._SL1500_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Apple AirPods Pro 2nd Gen",
    price: 24900,
    description:
      "Active Noise Cancellation up to 2x more effective, Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking, USB-C MagSafe charging case, up to 6 hours listening time, and IP54 dust and water resistance.",
    image:
      "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg",
    category: "Accessories",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: 9495,
    description:
      "Flagship wireless mouse with 8K DPI tracking on any surface including glass. MagSpeed electromagnetic scroll wheel, Quiet Clicks, ergonomic design, USB-C quick charge, and works on up to 3 devices simultaneously.",
    image:
      "https://m.media-amazon.com/images/I/61ni3t1ryQL._SL1500_.jpg",
    category: "Accessories",
  },
  {
    name: "Samsung 970 EVO Plus 1TB SSD",
    price: 7499,
    description:
      "NVMe M.2 internal SSD with sequential read speeds up to 3,500 MB/s and write speeds up to 3,300 MB/s. V-NAND technology, Phoenix controller, AES 256-bit encryption, and 5-year limited warranty.",
    image:
      "https://m.media-amazon.com/images/I/51Brl+iYtvL._SL1001_.jpg",
    category: "Accessories",
  },
  {
    name: "Strauss Yoga Mat Premium TPE 6mm",
    price: 1999,
    description:
      "Eco-friendly TPE material, 6mm thickness for joint protection, anti-slip textured surface on both sides, lightweight and portable with carry strap, 183cm x 61cm size, free from PVC, latex, and toxic chemicals.",
    image:
      "https://m.media-amazon.com/images/I/71E9xtLMjwL._SL1500_.jpg",
    category: "Sports & Fitness",
  },
  {
    name: "Fitbit Charge 6 Fitness Tracker",
    price: 14999,
    description:
      "Advanced health and fitness tracker with built-in GPS, heart rate monitoring, SpO2, stress management score, 7-day battery life, sleep tracking with sleep stages, 40+ exercise modes, and Google integration.",
    image:
      "https://m.media-amazon.com/images/I/71CaVwvl+GL._SL1500_.jpg",
    category: "Sports & Fitness",
  },
];

connectdb()
  .then(async () => {
    try {
      // 1. Delete all existing products
      const deleteResult = await Product.deleteMany({});
      console.log(`Deleted ${deleteResult.deletedCount} existing products.`);

      // 2. Insert all 20 new products
      const inserted = await Product.insertMany(products);
      console.log(`\nSuccessfully inserted ${inserted.length} products:\n`);
      inserted.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.name} — ₹${p.price.toLocaleString("en-IN")} [${p.category}]`);
      });

      console.log("\nDone! All 20 products are now in the database.");
      process.exit(0);
    } catch (err) {
      console.error("Error seeding products:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("DB connect failed:", err);
    process.exit(1);
  });
