
const express = require('express');
const { createJob, getClientJobs } = require('../controllers/jobController');
const Application = require('../models/Application');
const { protect } = require('../middleware/authMiddleware');
const Job = require('../models/Job');
const Freelancer = require('../models/Freelancer');
const Tradesperson = require('../models/Tradesperson');
const router = express.Router();
const Invitation = require('../models/Invitation');

router.post('/post', protect, createJob);
router.get('/client-jobs', protect, getClientJobs);

router.get('/', async (req, res) => {
  try {
    const { category, location } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (location) filter.location = location;

    // const jobs = await Job.find();
    const jobs = await Job.find(filter);
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});



// Apply for a Job
router.post('/jobs/apply/:jobId', protect, async (req, res) => {
  const { jobId } = req.params;
  const { proposal, amount, pastWorkLink } = req.body;

  try {
    const application = new Application({
      jobId,
      userId: req.user._id,
      proposal,
      amount,
      pastWorkLink,
    });

    await application.save();
    res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error applying for job' });
  }
});



// Route to fetch applied jobs for a user
router.get('/applied', protect, async (req, res) => {
  console.log('User ID:', req.user.id);  // Log the user ID to ensure it’s populated

  try {
    const applications = await Application.find({ userId: req.user.id });

    res.json({
      success: true,
      jobs: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      message: 'Failed to fetch applications',
    });
  }
});



// Route to get all applications for the logged-in user
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate('job', 'title description');
    
    // Return the applications with job details
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get Job Invitations
router.get('/invitations', protect, async (req, res) => {
  try {
    console.log('userid:', req.user.id);
    const jobs = await Job.find({ invitations: req.user.id });
    // const jobs = await Job.find({});

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch invitations' });
  }
});

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
