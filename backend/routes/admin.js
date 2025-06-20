const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, admin } = require('../middleware/auth');

router.get('/dashboard', auth, admin, adminController.dashboardStats);
router.get('/users', auth, admin, adminController.getUsers);
router.put('/users/:id/block', auth, admin, adminController.blockUser);
router.put('/users/:id/unblock', auth, admin, adminController.unblockUser);

module.exports = router; 