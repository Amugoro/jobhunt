
const Freelancer = require('../models/Freelancer');
const cloudinary = require('cloudinary').v2; 

// Create or Update Freelancer Profile
exports.createOrUpdateProfile = async (req, res) => {
  const { objective, skills, experience } = req.body;
  const userId = req.user.id;

  try {
    const profileData = {
      user: userId,
      objective,
      skills: skills.split(',').map(skill => skill.trim()),
      experience: JSON.parse(experience),
    };

    if (req.files.profilePicture) {
      const result = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath);
      profileData.profilePicture = result.secure_url;
    }

    if (req.files.resume) {
      const result = await cloudinary.uploader.upload(req.files.resume.tempFilePath, { resource_type: 'raw' });
      profileData.resume = result.secure_url;
    }

    let profile = await Freelancer.findOneAndUpdate({ user: userId }, profileData, {
      new: true,
      upsert: true,
    });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Freelancer Profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Freelancer.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
