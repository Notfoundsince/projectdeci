const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: Number
    }
  ],

  totalPrice: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);