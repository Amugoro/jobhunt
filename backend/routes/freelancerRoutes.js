
const express = require('express');
const { createOrUpdateProfile, getProfile } = require('../controllers/freelancerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/profile', protect, createOrUpdateProfile);
router.get('/profile', protect, getProfile);

module.exports = router;
