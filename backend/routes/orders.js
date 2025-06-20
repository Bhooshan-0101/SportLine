const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, admin } = require('../middleware/auth');

router.post('/', auth, orderController.placeOrder);
router.get('/', auth, admin, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', auth, admin, orderController.updateOrderStatus);

module.exports = router; 