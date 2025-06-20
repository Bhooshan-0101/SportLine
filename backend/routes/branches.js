const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { auth, admin } = require('../middleware/auth');

router.post('/', auth, admin, branchController.createBranch);
router.get('/', auth, admin, branchController.getBranches);
router.put('/:id/assign-admin', auth, admin, branchController.assignAdmin);

module.exports = router; 