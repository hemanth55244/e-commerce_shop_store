require("dotenv").config();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function test() {
  try {
    const order = await razorpay.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "test_receipt",
    });
    console.log("Success:", order);
  } catch (err) {
    console.error("Error creating order:", err);
  }
}

test();
