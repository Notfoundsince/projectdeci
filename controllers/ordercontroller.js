const Order = require('../models/Order');
const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// GET /api/orders
exports.getAll = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ status: 'success', data: orders });
});

// GET /api/orders/:id
exports.getOne = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  res.status(200).json({ status: 'success', data: order });
});

// POST /api/orders — checkout: turn the Cart into an Order
exports.create = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  if (!shippingAddress) throw new AppError('shippingAddress is required', 400);

  const cart = await Cart.findOne().populate('items.product');
  if (!cart || cart.items.length === 0) throw new AppError('Cart is empty', 400);

  // check stock before touching anything
  for (const item of cart.items) {
    if (!item.product) throw new AppError('A product in your cart no longer exists', 400);
    if (item.product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${item.product.name}`, 400);
    }
  }

  // snapshot name/price, calculate totalPrice, and decrease stock
  // (cart.items.product is already populated, so no extra lookup is needed)
  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    totalPrice += item.product.price * item.quantity;
    orderItems.push({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    });

    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = await Order.create({
    ordernumber: Date.now(),
    items: orderItems,
    totalPrice,
    shippingAddress,
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({ status: 'success', data: order });
});

// PATCH /api/orders/:id/status
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = Order.schema.path('status').enumValues;

  if (!status || !validStatuses.includes(status)) {
    throw new AppError(`Status must be one of: ${validStatuses.join(', ')}`, 400);
  }

  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);

  order.status = status;
  await order.save();

  res.status(200).json({ status: 'success', data: order });
});