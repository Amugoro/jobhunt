const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const Tradesperson = require('../models/Tradesperson');

const router = express.Router();

// Setup multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// corrected the route and added success checker
router.post('/profile', protect, upload.single('profilePicture'), async (req, res) => {
  try {
    const { tradeSkills, experience } = req.body;
    const userId = req.user.id;

    const profilePicture = req.file ? `/uploads/profiles/${req.file.filename}` : null;

    const updatedProfile = await Tradesperson.findByIdAndUpdate( 
      { _id: userId },
      {
        user: userId,
        tradeSkills,
        experience,
        profilePicture
      },
      { new: true, upsert: true }
    );

    if (!updatedProfile) res.json({ success: false, message: 'User not found' });

    res.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving profile' });
  }
});

router.get('/profile', protect, async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await Tradesperson.findById(req.user.id);
    res.json({ success: true, profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;
