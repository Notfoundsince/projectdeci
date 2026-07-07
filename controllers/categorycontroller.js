const Category     = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError     = require('../utils/AppError');

// GET /api/categories  —  list all categories
exports.getall = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({ status: 'success', data: categories });
});

// POST /api/categories  —  create a new category
exports.create = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ status: 'success', data: category });
});

// DELETE /api/categories/:id  —  remove a category
exports.remove = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new AppError('Category not found', 404);
  res.json({ status: 'success', data: null });
});