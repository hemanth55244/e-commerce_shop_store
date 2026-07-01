const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/authmiddleware");
const {
  addproduct,
  getall,
  getbyid,
  updateproduct,
  deleteproduct,
} = require("../controllers/productController");

const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/add/product", auth, upload.single("image"), addproduct);
router.get("/get/products", getall);
router.get("/get/products/:id", getbyid);
router.put("/update/products/:id", auth, upload.single("image"), updateproduct);
router.delete("/del/products/:id", auth, deleteproduct);

module.exports = router;
