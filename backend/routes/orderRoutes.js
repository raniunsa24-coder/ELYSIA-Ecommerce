const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, adminOnly, getOrders);

router.get("/:id", protect, adminOnly, getOrderById);

router.patch("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;