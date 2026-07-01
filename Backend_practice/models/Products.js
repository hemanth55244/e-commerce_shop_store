const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductsSchema);
