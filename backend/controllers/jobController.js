const Job = require('../models/Job');

// Create a job
exports.createJob = async (req, res) => {
    const { title, description, location } = req.body;
    const job = new Job({ title, description, location, employerId: req.user.id });
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
};

// Get job by ID
exports.getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
};
