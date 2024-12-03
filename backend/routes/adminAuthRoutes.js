const express = require('express');
const adminAuthController = require('../controllers/adminAuthController');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin login route
router.post('/login', adminAuthController.login);

// Assign permissions to a subadmin
router.put('/subadmin/permissions', isAdmin, adminController.assignPermissions);

// Delete a subadmin
router.delete('/subadmin/:userId', isAdmin, adminController.deleteSubadmin);

module.exports = router;
