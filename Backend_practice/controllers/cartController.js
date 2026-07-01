const Cart = require("../models/Cart");
const Product = require("../models/Products");
const Razorpay = require("razorpay");

const getCartTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!key_id || !key_secret) {
    console.error("Razorpay keys missing in environment variables!");
    return null;
  }
  
  return new Razorpay({ key_id, key_secret });
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json({ message: "cart fetched", cart: cart || { items: [] } });
  } catch (err) {
    console.error("getCart Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const cart = (await Cart.findOne({ user: req.user.id })) || new Cart({ user: req.user.id, items: [] });
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: Number(quantity),
      });
    }

    await cart.save();
    res.status(200).json({ message: "added to cart", cart });
  } catch (err) {
    console.error("addToCart Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    res.json({ message: "item removed", cart });
  } catch (err) {
    console.error("removeFromCart Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createCheckoutOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "cart is empty" });
    }

    const amount = getCartTotal(cart.items);
    const amountInPaise = Math.round(amount * 100);
    const receipt = `rcpt_${Date.now()}`;
    
    const razorpay = getRazorpayInstance();
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy";
    let order;

    if (razorpay) {
      order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
      });
    } else {
      console.warn("Razorpay instance not created, using dummy order.");
      order = {
        id: `order_dummy_${Date.now()}`,
        amount: amountInPaise,
        currency: "INR",
      };
    }

    res.json({
      message: "checkout order created",
      order,
      keyId,
      amountInPaise,
      currency: "INR",
      cart,
    });
  } catch (err) {
    console.error("createCheckoutOrder Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ message: "payment_id, order_id, and signature are required" });
    }

    // Verify signature to ensure payment is authentic
    const crypto = require("crypto");
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (keySecret && expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature. Payment verification failed." });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({
      message: "Payment confirmed successfully! Your order has been placed.",
      payment: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
    });
  } catch (err) {
    console.error("confirmPayment Error:", err);
    res.status(500).json({ message: err.message });
  }
};
