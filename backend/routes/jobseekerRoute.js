const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads (resume/photo)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Get all jobs (Jobseeker can view all available jobs)
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// Apply for a job
router.post('/jobs/:jobId/apply', authMiddleware, async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const user = await User.findById(userId);
    if (user.role !== 'jobseeker') return res.status(403).json({ message: 'Only jobseekers can apply for jobs' });

    // Logic to mark job application (e.g., adding applied jobs to user document)
    // You may need to store applied jobs in the user's document, e.g. appliedJobs: [{ jobId, dateApplied }]
    user.appliedJobs.push({ jobId, dateApplied: new Date() });
    await user.save();

    res.status(200).json({ message: 'Job application successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job' });
  }
});

// Get all jobs applied by jobseeker (view applied jobs in dashboard)
router.get('/applied-jobs', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('appliedJobs.jobId');
    res.status(200).json(user.appliedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applied jobs' });
  }
});

// Upload photo for jobseeker
router.post('/upload-photo', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    if (req.user.role !== 'jobseeker') return res.status(403).json({ message: 'Only jobseekers can upload photos' });

    // Save the photo path to user profile
    const user = await User.findById(req.user._id);
    user.photo = req.file.path;
    await user.save();

    res.status(200).json({ message: 'Photo uploaded successfully', photo: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo' });
  }
});

// Upload resume for jobseeker
router.post('/upload-resume', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (req.user.role !== 'jobseeker') return res.status(403).json({ message: 'Only jobseekers can upload resumes' });

    // Save the resume path to user profile
    const user = await User.findById(req.user._id);
    user.resume = req.file.path;
    await user.save();

    res.status(200).json({ message: 'Resume uploaded successfully', resume: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume' });
  }
});

// Add skills and bio/summary for jobseeker profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { skills, bio } = req.body;
  try {
    if (req.user.role !== 'jobseeker') return res.status(403).json({ message: 'Only jobseekers can update their profile' });

    const user = await User.findById(req.user._id);
    user.skills = skills || user.skills;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
