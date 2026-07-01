const Product = require("../models/Products");

exports.addproduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category: category || "General",
      image: req.file ? `uploads/${req.file.filename}` : "",
    });

    res.status(201).json({
      message: "product added",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getall = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "products fetched",
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getbyid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({
      message: "product fetched",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({
      message: "product updated",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({
      message: "product deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
