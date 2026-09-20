const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Aura Ceramic",
    category: "Home",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
    description:
      "A softly shaped ceramic piece designed to bring a quiet and refined touch to modern spaces.",
  },
  {
    name: "Luna Chair",
    category: "Furniture",
    price: 185,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    description:
      "A contemporary chair with a soft silhouette and timeless design, created for comfortable everyday living.",
  },
  {
    name: "Noir Lamp",
    category: "Lighting",
    price: 92,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Minimal lighting with a sophisticated finish, perfect for creating a warm and elegant atmosphere.",
  },
  {
    name: "Linea Mirror",
    category: "Decor",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
    description:
      "An elegant statement mirror with a simple form that works beautifully across modern interiors.",
  },
  {
    name: "Mora Candle",
    category: "Home",
    price: 36,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85",
    description:
      "A refined home candle made to add warmth, softness and a relaxing atmosphere to your space.",
  },
  {
    name: "Forma Vase",
    category: "Decor",
    price: 64,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=85",
    description:
      "A sculptural vase with an understated finish that complements both minimal and expressive interiors.",
  },
  {
    name: "Arco Table",
    category: "Furniture",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=85",
    description:
      "A clean-lined side table designed around simplicity, balance and practical everyday use.",
  },
  {
    name: "Halo Light",
    category: "Lighting",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85",
    description:
      "A modern ambient light that adds a soft glow and architectural character to your room.",
  },
];

async function seedProducts() {
  try {
    await connectDB();

    await Product.deleteMany();

    const createdProducts = await Product.insertMany(products);

    console.log(
      `${createdProducts.length} products added successfully.`
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
}

seedProducts();