const Order = require("../models/Order");

async function createOrder(req, res) {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || !items.length || total === undefined) {
      return res.status(400).json({
        message: "Customer details, products and total are required.",
      });
    }

    const order = await Order.create({
      customer,
      items,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    res.status(500).json({
      message: "Unable to place order.",
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error.message);

    res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error.message);

    res.status(500).json({
      message: "Unable to fetch order.",
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};