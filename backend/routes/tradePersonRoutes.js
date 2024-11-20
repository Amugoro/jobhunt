const express = require('express');
const multer = require('multer');
const User = require('../models/User'); // Assuming you have a User model
const { protect } = require('../middleware/authMiddleware');

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

router.post('/profile/tradeperson', protect, upload.single('profilePicture'), async (req, res) => {
  try {
    const { tradeSkills, experience } = req.body;
    const profilePicture = req.file ? `/uploads/profiles/${req.file.filename}` : null;

    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      {
        tradeSkills,
        experience,
        profilePicture,
      },
      { new: true }
    );

    res.json({ profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving profile' });
  }
});

router.get('/profile/tradeperson', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('tradeSkills experience profilePicture');
    res.json({ profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;
