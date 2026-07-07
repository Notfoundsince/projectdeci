const Cart = require('../models/Cart');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const total = cart => {
  cart.totalPrice = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
};

const getCart = async userId =>
  await Cart.findOne({ userId }) || Cart.create({ userId });


// GET cart
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user.id);
  await cart.populate('items.product');

  res.json({ status: "success", data: cart });
});


// POST add item
exports.addItem = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  const cart = await getCart(req.user.id);

  const item = cart.items.find(i => i.product == productId);

  if (product.stock < (item ? item.quantity + quantity : quantity))
    throw new AppError("Not enough stock", 400);

  if (item)
    item.quantity += quantity;
  else
    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });

  total(cart);
  await cart.save();

  res.status(201).json({ status:"success", data:cart });
});


// PATCH update quantity
exports.updateQuantity = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user.id);

  const item = cart.items.find(
    i => i.product == req.params.productId
  );

  if (!item)
    throw new AppError("Item not found",404);

  const quantity = req.body.quantity;

  if (quantity === 0)
    cart.items = cart.items.filter(
      i => i.product != req.params.productId
    );
  else
    item.quantity = quantity;

  total(cart);
  await cart.save();

  res.json({status:"success", data:cart});
});


// DELETE remove item
exports.removeItem = asyncHandler(async (req,res)=>{
  const cart = await getCart(req.user.id);

  cart.items = cart.items.filter(
    i => i.product != req.params.productId
  );

  total(cart);
  await cart.save();

  res.json({status:"success",data:cart});
});


// DELETE clear cart
exports.clearCart = asyncHandler(async(req,res)=>{
  const cart = await getCart(req.user.id);

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.json({status:"success",data:cart});
});