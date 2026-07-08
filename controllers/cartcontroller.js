const Cart = require('../models/Cart');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const recalcTotal = (cart) => {
  cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};


const findOrCreateCart = async () => {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });
  return cart;
};

// GET /api/cart
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart();
  await cart.populate('items.product');
  res.json({ status: 'success', data: cart });
});

// POST /api/cart/items
exports.addItem = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);

  const cart = await findOrCreateCart();
  const item = cart.items.find((i) => i.product.equals(productId));
  const desiredQuantity = item ? item.quantity + quantity : quantity;

  if (product.stock < desiredQuantity) throw new AppError('Not enough stock', 400);

  if (item) item.quantity += quantity;
  else cart.items.push({ product: productId, quantity, price: product.price });

  recalcTotal(cart);
  await cart.save();

  res.status(201).json({ status: 'success', data: cart });
});

// PATCH /api/cart/items/:productId
exports.updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  if (quantity < 0) throw new AppError('Quantity cannot be negative', 400);

  const cart = await findOrCreateCart();
  const item = cart.items.find((i) => i.product.equals(req.params.productId));
  if (!item) throw new AppError('Item not found', 404);

  if (quantity === 0) {
    cart.items = cart.items.filter((i) => !i.product.equals(req.params.productId));
  } else {
    item.quantity = quantity;
  }

  recalcTotal(cart);
  await cart.save();

  res.json({ status: 'success', data: cart });
});

// DELETE /api/cart/items/:productId
exports.removeItem = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart();
  cart.items = cart.items.filter((i) => !i.product.equals(req.params.productId));

  recalcTotal(cart);
  await cart.save();

  res.json({ status: 'success', data: cart });
});

// DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart();
  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();
  res.json({ status: 'success', data: cart });
});