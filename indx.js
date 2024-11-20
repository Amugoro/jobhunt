const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require("./routes/jobRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const jobListingsRoute = require("./routes/jobListings");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const socketIo = require('socket.io');
const nodemailer = require('nodemailer');

const cors = require("cors");
require("dotenv").config();

dotenv.config();
connectDB();



mongoose.connect("mongodb://localhost/job_portal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/jobs", jobRoutes);
app.use("/api/freelancers", freelancerRoutes);
app.use("/api", jobListingsRoute);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware for authentication
const authMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

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

  socketIo.on('apply_job', async (data) => {
    const newNotification = new Notification({
      userId: data.recruiterId,
      message: `${data.jobseekerName} applied for ${data.jobTitle}.`,
      type: 'jobApplication'
    });
    await newNotification.save();
    io.to(data.recruiterId).emit('new_notification', newNotification);
  });

  socketIo.on('disconnect', () => {
    console.log('Client disconnected');
  });

{/*app.use('/api', donateRoute*/}

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


// Chat Schema
const chatSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Chat = mongoose.model("Chat", chatSchema);

// Apply middleware to Socket.IO
io.use(authMiddleware);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  // Join user's room
  socket.join(socket.user.id);

  // Handle incoming messages
  socket.on("sendMessage", async ({ receiverId, message }) => {
    const chatMessage = new Chat({
      senderId: socket.user.id,
      receiverId,
      message,
    });
    await chatMessage.save();

    // Emit message to receiver
    io.to(receiverId).emit("receiveMessage", {
      senderId: socket.user.id,
      message,
      timestamp: chatMessage.timestamp,
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

// REST Endpoint to get chat history
app.get("/api/chats/:userId", async (req, res) => {
  const { userId } = req.params;
  const chats = await Chat.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });
  res.json(chats);
});

// Listen for a new message event
socketIo.on("newMessage", (data) => {
  // Emit notification to the receiver
  io.to(data.receiverId).emit("receiveNotification", {
    type: "message",
    content: "New message received",
  });
});

// Listen for job application event
socketIo.on("jobApplication", (data) => {
  io.to(data.clientId).emit("receiveNotification", {
    type: "application",
    content: "New job application submitted",
  });
});

//admin
app.get('/api/admin/users', (req, res) => {
    // Fetch users from database
    User.find({}, (err, users) => {
      if (err) return res.status(500).json({ message: 'Error fetching users' });
      res.json(users);
    });
  });
  
  app.delete('/api/admin/users/:id', (req, res) => {
    // Delete user
    User.findByIdAndDelete(req.params.id, (err) => {
      if (err) return res.status(500).json({ message: 'Error deleting user' });
      res.status(204).send();
    });
  });
  
  // Example Express.js route for invitations
  app.patch('/api/admin/invitations/:id/approve', (req, res) => {
    // Approve invitation
    Invitation.findByIdAndUpdate(req.params.id, { status: 'Approved' }, (err, invitation) => {
      if (err) return res.status(500).json({ message: 'Error approving invitation' });
      res.json(invitation);
    });
  });
  
  app.patch('/api/admin/invitations/:id/reject', (req, res) => {
    // Reject invitation
    Invitation.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, (err, invitation) => {
      if (err) return res.status(500).json({ message: 'Error rejecting invitation' });
      res.json(invitation);
    });
  });

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});