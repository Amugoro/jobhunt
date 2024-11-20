
const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();



router.post('/api/jobs/post', async (req, res) => {
    try {
      const { title, description, category, subcategory, skillsRequired, location } = req.body;
      const newJob = new Job({
        title,
        description,
        category,
        subcategory,
        skillsRequired,
        location,
        createdAt: new Date(),
      });
  
      await newJob.save();
      res.status(201).json({ job: newJob });
    } catch (err) {
      res.status(400).json({ error: 'Failed to post a job' });
    }
  });
  

module.exports = router;
