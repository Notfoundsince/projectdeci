const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// GET /api/categories
exports.getAll = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ status: 'success', message: 'Categories fetched', data: categories });
});

// GET /api/categories/:id
exports.getOne = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new AppError('Category not found', 404);
  res.status(200).json({ status: 'success', message: 'Category fetched', data: category });
});

// POST /api/categories
exports.create = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ status: 'success', message: 'Category created', data: category });
});

// PATCH /api/categories/:id
exports.update = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new AppError('Category not found', 404);
  res.status(200).json({ status: 'success', message: 'Category updated', data: category });
});

// DELETE /api/categories/:id
exports.remove = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new AppError('Category not found', 404);
  res.status(200).json({ status: 'success', message: 'Category deleted', data: null });
});