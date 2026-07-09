const express = require('express');
const router = express.Router();
const {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} = require('../controllers/cartcontroller');

router.get('/', getCart);              // GET    /api/cart
router.post('/items', addItem);        // POST   /api/cart/items
router.patch('/items/:productId', updateQuantity);  // PATCH  /api/cart/items/:productId
router.delete('/items/:productId', removeItem);     // DELETE /api/cart/items/:productId
router.delete('/', clearCart);         // DELETE /api/cart

module.exports = router;