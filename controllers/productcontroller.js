const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getAllProducts = asyncHandler(async (req, res, next) => { //getting all products with filters
    const { category, minPrice, maxPrice, inStock, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (inStock === 'true') filter.inStock = true;

    if (minPrice || maxPrice)
        filter.price = {
            ...(minPrice && { $gte: Number(minPrice) }),
            ...(maxPrice && { $lte: Number(maxPrice) })
        };
        if (search) {
           filter.name = search;
        };
    const products = await Product.find(filter);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: products
    });
}); // get api/products

const getProductById = asyncHandler(async (req, res, next) => { //getting the product by id with populating
    const product = await Product.findById(req.params.id)
        .populate('category', 'name description');

    if (!product) return next(new AppError('Product not found', 404));

    res.status(200).json({
        status: 'success',
        data: product
    });
}); // get api/products/:id

const createProduct = asyncHandler(async (req, res, next) => { //creating a new product with a category
    const { category } = req.body;

    const categoryExists = category && await Category.findById(category);

    if (!categoryExists)
        return next(new AppError('Category not found', 404));

    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newProduct
    });
}); //get api/products

const updateProduct = asyncHandler(async (req, res, next) => { //changing the product
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product)
        return next(new AppError('Product not found', 404));

    res.status(200).json({
        status: 'success',
        data: product
    });
});

const deleteProduct = asyncHandler(async (req, res, next) => {// removing the product from the database
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
        return next(new AppError('Product not found', 404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = { //finally exporting all the functions so it can be used in the routes
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};