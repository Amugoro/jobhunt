const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Ensure User schema is set up
const Job = require("./models/Job"); // Ensure Job schema is set up
const app = express();
const recruiterRoutes = require('./routes/recruiterRoutes');
const donateRoute = require('./routes/donate');
const http = require('http');
const { Server } = require('socket.io');
const Notification = require('./models/Notification');






app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for new job application status updates
  socket.on('job_application_update', async (data) => {
    const { userId, message } = data;
    const newNotification = new Notification({ userId, message, type: 'jobUpdate' });
    await newNotification.save();

    io.emit('notify', newNotification);
  });

  // Listen for new messages
  socket.on('new_message', async (data) => {
    const { receiverId, message } = data;
    const newNotification = new Notification({ userId: receiverId, message, type: 'message' });
    await newNotification.save();

    io.emit('notify', newNotification);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/api', donateRoute);
app.use('/api/recruiter', recruiterRoutes);

mongoose.connect("mongodb://localhost:27017/jw-skilledhunt", { useNewUrlParser: true, useUnifiedTopology: true });

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ fullName: newUser.fullName, role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to register" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ fullName: user.fullName, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Fetch job seekers for recruiters
app.get("/api/recruiter/jobseekers", async (req, res) => {
  try {
    const jobSeekers = await User.find({ role: 'jobseeker' });
    res.status(200).json(jobSeekers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job seekers' });
  }
});

// Fetch posted jobs for recruiters
app.get("/api/recruiter/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Post job for recruiter
app.post("/api/recruiter/jobs", async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newJob = new Job({ title, description, category });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
});

// Delete job
app.delete("/api/recruiter/jobs/:jobId", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Server setup
app.listen(5000, () => console.log("Server started on http://localhost:5000"));
