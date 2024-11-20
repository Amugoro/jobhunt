
const Job = require('../models/Job');

// Create a new job post
exports.createJob = async (req, res) => {
  const { title, description, category, subcategory, skillsRequired, location } = req.body;

  try {
    const newJob = await Job.create({
      title,
      description,
      category,
      subcategory,
      skillsRequired,
      location,
      client: req.user.id, // assuming user is authenticated
    });

    res.status(201).json({
      success: true,
      job: newJob,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all jobs posted by the client
exports.getClientJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
