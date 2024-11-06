// routes/jobs.js
const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");
const router = express.Router();

// Middleware to check employer permissions
const isEmployer = (req, res, next) => {
  if (req.user.role !== "employer" || !req.user.isVerified) {
    return res.status(403).json({ message: "Only verified employers can perform this action" });
  }
  next();
};

// Create a new job
router.post("/jobs", isEmployer, async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const job = new Job({ title, description, category, employerId: req.user._id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error });
  }
});

// Invite a job seeker
router.post("/invite/:jobSeekerId", isEmployer, async (req, res) => {
  const { jobSeekerId } = req.params;
  try {
    const jobSeeker = await User.findById(jobSeekerId);
    if (!jobSeeker || jobSeeker.role !== "jobseeker") {
      return res.status(404).json({ message: "Job seeker not found" });
    }
    // Additional code to send an invitation, store invitation, etc.
    res.json({ message: `Invitation sent to ${jobSeeker.fullName}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to send invitation", error });
  }
});

module.exports = router;
