const express = require('express');
const router = express.Router();

const orderController = require('../controllers/ordercontroller');


router.get('/', orderController.getall);


router.get('/:id', orderController.getone);


router.post('/', orderController.create);


router.delete('/:id', orderController.remove);

module.exports = router;