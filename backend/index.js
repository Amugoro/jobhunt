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
const nodemailer = require('nodemailer');
require('dotenv').config();






app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('send_message', async (data) => {
    // Save notification to database
    const newNotification = new Notification({
      userId: data.receiver,
      message: `${data.senderName} sent you a message.`,
      type: 'message'
    });
    await newNotification.save();

    // Emit notification to the receiver
    io.to(data.receiver).emit('new_notification', newNotification);
  });
    
  //contact us
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'support@jwskilledhunt.org',
      subject: `New Contact Us Message: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send message' });
    }
  });

  socket.on('apply_job', async (data) => {
    const newNotification = new Notification({
      userId: data.recruiterId,
      message: `${data.jobseekerName} applied for ${data.jobTitle}.`,
      type: 'jobApplication'
    });
    await newNotification.save();
    io.to(data.recruiterId).emit('new_notification', newNotification);
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
