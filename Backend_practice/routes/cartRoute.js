const express = require("express");
const auth = require("../middleware/authmiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  createCheckoutOrder,
  confirmPayment,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/remove/:productId", auth, removeFromCart);
router.post("/checkout", auth, createCheckoutOrder);
router.post("/payment", auth, confirmPayment);

module.exports = router;
