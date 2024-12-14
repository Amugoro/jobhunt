const Freelancer = require('../models/Freelancer');
const Tradesperson = require('../models/Tradesperson');
const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const {protect} = require('../middleware/authMiddleware');

// Route to fetch job invitations
router.get('/get-invitations', protect, async (req, res) => {
  try {
    // Fetch invitations for the authenticated user
    const invitations = await Invitation.find({ clientId: req.user.id });

    if (!invitations || invitations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No invitations found',
      });
    }

    res.json({
      success: true,
      jobs: invitations, 
    });
  } catch (error) {
    console.error('Error fetching invitations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invitations',
    });
  }
});

module.exports = router;
