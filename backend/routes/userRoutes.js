
const express = require('express');
const User = require('../models/User');
const {protect} = require('../middleware/authMiddleware'); 
const router = express.Router();

// Fetch user skills
router.get('/skills', protect, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('skills');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's skills
    res.status(200).json({ skills: user.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

module.exports = router;
