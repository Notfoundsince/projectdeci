const express = require('express');
const cartcontroller = require('../controllers/cartcontroller');

const router = express.Router();


router
  .route('/')
  .get(cartcontroller.getCart)
  .post(cartcontroller.addItem)
  .delete(cartcontroller.clearCart);


router
  .route('/:productId')
  .patch(cartcontroller.updateQuantity)
  .delete(cartcontroller.removeItem);

module.exports = router;