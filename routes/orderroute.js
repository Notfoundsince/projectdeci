const express = require('express');
const orderController = require('../controllers/ordecController');

const router = express.Router();

// /api/orders
router
  .route('/')
  .get(orderController.getAll)
  .post(orderController.create);

// /api/orders/:id
router
  .route('/:id')
  .get(orderController.getOne);

// /api/orders/:id/status
router
  .route('/:id/status')
  .patch(orderController.updateStatus);

module.exports = router;