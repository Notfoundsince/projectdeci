const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be a positive number']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Product stock must be a non-negative number'],
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required']
    },
    images: {
        type: [String],
        default: []
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);