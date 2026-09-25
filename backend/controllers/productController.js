const Product = require("../models/Product");

async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: 1 });

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error.message);

    res.status(500).json({
      message: "Failed to load products.",
    });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID.",
    });
  }
}

async function createProduct(req, res) {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      stock,
    } = req.body;

    if (
      !name ||
      !category ||
      price === undefined ||
      !image ||
      !description ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "All product fields are required.",
      });
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      image,
      description,
      stock: Number(stock),
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error.message);

    res.status(500).json({
      message: "Unable to create product.",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      stock,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price: Number(price),
        image,
        description,
        stock: Number(stock),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error.message);

    res.status(500).json({
      message: "Unable to update product.",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error.message);

    res.status(500).json({
      message: "Unable to delete product.",
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};