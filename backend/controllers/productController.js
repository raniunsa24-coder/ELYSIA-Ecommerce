const Product = require("../models/Product");

async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: 1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load products",
    });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
};