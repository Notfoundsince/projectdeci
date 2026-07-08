const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// GET /api/products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, inStock, search } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (inStock === 'true') filter.stock = { $gt: 0 };
  if (search) filter.name = search;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter);
  res.status(200).json({ status: 'success', results: products.length, data: products });
});

// GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (!product) throw new AppError('Product not found', 404);
  res.status(200).json({ status: 'success', data: product });
});

// POST /api/products
exports.createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) throw new AppError('Category not found', 404);

  const product = await Product.create(req.body);
  res.status(201).json({ status: 'success', data: product });
});

// PATCH /api/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError('Product not found', 404);
  res.status(200).json({ status: 'success', data: product });
});

// DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  res.status(200).json({ status: 'success', data: null });
});