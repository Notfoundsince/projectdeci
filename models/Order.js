const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  ordernumber: {
    type: Number,
    required: [true, 'Order number is required'],
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be a positive number']
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    type: String,
    required: [true, 'Shipping address is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);