const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require("./routes/jobRoutes");
const chat = require('./routes/chat')
const clientRoutes = require("./routes/client");
const freelancerRoutes = require("./routes/freelancerRoutes");
const jobListingsRoute = require("./routes/jobListings");
const http = require("http");
const { Server } = require("socket.io");
const Message = require('./models/Message');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const tradePersonRoutes = require('./routes/tradePersonRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");


dotenv.config();
connectDB();




const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ' https://www.jwskilledhunt.org ',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: 'https://www.jwskilledhunt.org' }));

// Middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Define routes
app.use("/api/jobs", jobRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api", jobListingsRoute);
app.use("/api/auth", authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/chat', chat);
app.use('/api/user', userRoutes);
app.use('/api/tradepersons', tradePersonRoutes);
app.use(bodyParser.json());

// Serve static files (uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for Socket.IO authentication
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


io.use(authMiddleware);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`);


  socket.join(socket.user.id);

 
  socket.on('getChatHistory', async ({ currentUserId, receiverId }) => {
    try {
      const history = await Message.find({
        $or: [
          { senderId: currentUserId, receiverId: receiverId },
          { senderId: receiverId, receiverId: currentUserId },
        ],
      }).sort({ timestamp: 1 });
      socket.emit('chatHistory', history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  });

  // Send a new message
  socket.on('sendMessage', async (messageData) => {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      socket.to(messageData.receiverId).emit('receiveMessage', messageData);
      socket.to(messageData.senderId).emit('receiveMessage', messageData); 
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle file upload
  app.post('/upload', upload.single('file'), (req, res) => {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Admin Routes
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Contact Us API
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
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// REST Endpoint to get chat history
app.get("/api/chats/:userId", async (req, res) => {
  const { userId } = req.params;
  const chats = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });
  res.json(chats);
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  // Join user's room for personalized communication
  socket.join(socket.user.id);

  // Handle job application notification
  socket.on('apply_job', async (data) => {
    const newNotification = new Notification({
      userId: data.recruiterId,
      message: `${data.jobseekerName} applied for ${data.jobTitle}.`,
      type: 'jobApplication'
    });
    await newNotification.save();
    io.to(data.recruiterId).emit('new_notification', newNotification);
  });

  const users = {};

  socket.on('userConnected', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} connected`);
  });

  // Listen for new messages
  socket.on('sendMessage', async (messageData) => {
    const { senderId, receiverId, message } = messageData;

    // Save message to database
    await axios.post('/api/chats', messageData);

    // Emit the message to the specific receiver
    if (users[receiverId]) {
      io.to(users[receiverId]).emit('receiveMessage', messageData);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });

  // Handle chat messaging
  socket.on("sendMessage", async ({ receiverId, message }) => {
    const chatMessage = new Message({
      senderId: socket.user.id,
      receiverId,
      message,
    });
    await chatMessage.save();
    io.to(receiverId).emit("receiveMessage", {
      senderId: socket.user.id,
      message,
      timestamp: chatMessage.timestamp,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
