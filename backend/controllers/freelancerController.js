
// const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Freelancer = require('../models/Freelancer');

// Create or Update Freelancer Profile
exports.createOrUpdateProfile = async (req, res) => {
  const { objective, Role, username, skills, experience } = req.body;
  const userId = req.user.id;

  try {
    console.log(req.files);

    // Paths for uploaded files
    const newProfilePicture = req.files?.profilePicture?.[0]?.filename
      ? `/uploads/profiles/${req.files.profilePicture[0].filename}`
      : null;

    const newResume = req.files?.resume?.[0]?.filename
      ? `/uploads/resumes/${req.files.resume[0].filename}`
      : null;

    // Find the existing profile to get current file paths
    const existingProfile = await Freelancer.findOne({ user: userId });

     // Delete old profile picture if new one is uploaded
     if (existingProfile?.profilePicture && newProfilePicture) {
      const oldProfilePicturePath = path.join(
        __dirname,
        '..',
        existingProfile.profilePicture
      );
      if (fs.existsSync(oldProfilePicturePath)) {
        fs.unlinkSync(oldProfilePicturePath);
      } else {
        console.log('Old profile picture does not exist');
      }
    }

    // Delete old resume if new one is uploaded
    if (existingProfile?.resume && newResume) {
      const oldResumePath = path.join(__dirname, '..', existingProfile.resume);
      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath);
      } else {
        console.log('Old resume does not exist');
      }
    }
    // Prepare new profile data
    const profileData = {
      user: userId,
      username,
      Role,
      objective,
      skills: skills.split(',').map(skill => skill.trim()),
      experience: JSON.parse(experience),
      profilePicture: newProfilePicture || existingProfile?.profilePicture,
      resume: newResume || existingProfile?.resume,
    };

    // if (req.files?.profilePicture) {
    //   const result = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath);
    //   profileData.profilePicture = result.secure_url;
    // }

    // if (req.files?.resume) {
    //   const result = await cloudinary.uploader.upload(req.files.resume.tempFilePath, { resource_type: 'raw' });
    //   profileData.resume = result.secure_url;
    // }

    // Update or create the profile
    const profile = await Freelancer.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true, upsert: true }
    );

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

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
