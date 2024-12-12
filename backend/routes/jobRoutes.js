
const express = require('express');
const { createJob, getClientJobs } = require('../controllers/jobController');
const Application = require('../models/Application');
const { protect } = require('../middleware/authMiddleware');
const Job = require('../models/Job');
const router = express.Router();

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
router.post('/apply/:jobId', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Add applicant to the job
    if (!job.applicants.includes(req.user.id)) {
      job.applicants.push(req.user.id);
      await job.save();
      return res.status(200).json({ message: 'Applied successfully' });
    }
    res.status(400).json({ message: 'Already applied' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to apply for job' });
  }
});


// Route to fetch applied jobs for a user
router.get('/applied', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId }).populate('job', 'title description');

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applied jobs' });
  }
});


// Route to get all applications for the logged-in user
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).populate('job', 'title description');

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

module.exports = router;
