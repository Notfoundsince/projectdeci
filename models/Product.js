const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be a positive number']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Product stock must be a non-negative number']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);