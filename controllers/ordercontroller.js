const Order     = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
const AppError     = require('../utils/AppError');

// GET /api/orders  —  list all orders
exports.getall = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.json({ status: 'success', data: orders });
});

// GET /api/orders/:id  —  fetch one order by ID
exports.getone = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  res.json({ status: 'success', data: order });
});

// POST /api/orders  —  create a new order
exports.create = asyncHandler(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({ status: 'success', data: order });
});

// DELETE /api/orders/:id  —  remove an order
exports.remove = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  res.json({ status: 'success', data: null });
});