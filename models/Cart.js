const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  items:[
    {
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      quantity:{
        type:Number,
        default:1
      },
      price:Number
    }
  ],

  totalPrice:{
    type:Number,
    default:0
  }

},
{timestamps:true});


module.exports = mongoose.model("Cart",cartSchema);