const express = require('express');
const subadminController = require('../controllers/subadminController');
const { isSubadmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Subadmin profile setup
router.post('/profile/setup', isSubadmin, subadminController.setupProfile);

module.exports = router;
