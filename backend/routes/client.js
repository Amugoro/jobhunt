const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Tradesperson = require('../models/Tradesperson');
const Invitation = require('../models/Invitation');
const auth = require('../middleware/auth');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// 1. Get list of freelancers and tradespersons
router.get('/profiles', auth, async (req, res) => {
  try {
    const freelancers = await Freelancer.find({});
    const tradespersons = await Tradesperson.find({});
    res.json({ success: true, freelancers, tradespersons });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profiles' });
  }
});


// 2. Download resume
router.get('/download-resume/:id', auth, async (req, res) => {
  try {
    const freelancerId = req.params.id;

    // Find the freelancer's resume from the database
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer || !freelancer.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Construct the full file path
    const resumePath = path.join(__dirname, '..', freelancer.resume);

    // Check if the file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: 'Resume file not found on server' });
    }

    // Send the file for download
    res.download(resumePath, 'resume.pdf');
  } catch (error) {
    console.error('Failed to download resume:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 3. Send invitation
router.post('/send-invitation', auth, async (req, res) => {
  const { recipientId, recipientType, message } = req.body;

  try {
    const recipient =
      recipientType === 'freelancer'
        ? await Freelancer.findById(recipientId)
        : await Tradesperson.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const invitation = new Invitation({
      clientId: req.user.id,
      recipientId,
      recipientType,
      message,
    });

    await invitation.save();
    res.status(201).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send invitation' });
  }
});

// 4. Rate freelancer or tradesperson
router.post('/rate', auth, async (req, res) => {
  const { userId, userType, rating, review } = req.body;

  try {
    const user =
      userType === 'freelancer'
        ? await Freelancer.findById(userId)
        : await Tradesperson.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.ratings.push({ clientId: req.user.id, rating, review });
    await user.save();
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit rating' });
  }
});

module.exports = router;
