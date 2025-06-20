const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');
const { auth, admin } = require('../middleware/auth');

router.post('/', auth, customizationController.submitCustomization);
router.get('/', auth, admin, customizationController.getCustomizations);
router.put('/:id/approve', auth, admin, customizationController.approveCustomization);
router.put('/:id/reject', auth, admin, customizationController.rejectCustomization);

module.exports = router; 