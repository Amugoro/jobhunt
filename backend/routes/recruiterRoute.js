const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Post a new job
router.post('/jobs', authMiddleware, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const recruiter = req.user._id;

    const newJob = new Job({
      title,
      description,
      category,
      recruiter,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error posting job' });
  }
});

// Get all jobs posted by a recruiter
router.get('/jobs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can view their jobs' });

    const jobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Update a job
router.put('/jobs/:jobId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can update jobs' });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update jobs you posted' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job' });
  }
});

// Delete a job
router.delete('/jobs/:jobId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can delete jobs' });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete jobs you posted' });
    }

    await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});

// Get applicants for a specific job
router.get('/jobs/:jobId/applicants', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('applicants');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job.applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants' });
  }
});

// Shortlist an applicant
router.post('/jobs/:jobId/shortlist/:userId', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (!job.shortlisted.includes(req.params.userId)) {
      job.shortlisted.push(req.params.userId);
      await job.save();
    }
    res.status(200).json({ message: 'Applicant shortlisted' });
  } catch (error) {
    res.status(500).json({ message: 'Error shortlisting applicant' });
  }
});

// View a job seeker profile
router.get('/jobseekers/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'Job seeker not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job seeker profile' });
  }
});

// Send an invitation to a jobseeker
router.post('/invitations', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can send invitations' });

    const { jobseekerId, message, jobId } = req.body;

    const newInvitation = new Invitation({
      sender: req.user._id,
      recipient: jobseekerId,
      jobId,
      message,
    });

    await newInvitation.save();
    res.status(201).json(newInvitation);
  } catch (error) {
    res.status(500).json({ message: 'Error sending invitation' });
  }
});

// Get all invitations sent by a recruiter
router.get('/invitations', authMiddleware, async (req, res) => {
  try {
    const invitations = await Invitation.find({ sender: req.user._id });
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invitations' });
  }
});

module.exports = router;
