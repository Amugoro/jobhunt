const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Message = require("./models/Message");
const { verifyDocument } = require('./controllers/verification'); 

// Import routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const chat = require("./routes/chat");
const client = require("./routes/client");
const freelancerRoutes = require("./routes/freelancerRoutes");
const jobListingsRoute = require("./routes/jobListings");
const tradePersonRoutes = require("./routes/tradePersonRoutes");
const userRoutes = require("./routes/userRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const subadminRoutes = require("./routes/subadminRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const notificationRoute = require("./routes/notificationRoute");

// Environment configuration
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
=======
    origin: ' https://www.jwskilledhunt.org ',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
>>>>>>> 46acd27ae8bb517199562216056b6ffa3630cc46
    credentials: true,
  },
});

// Middleware
app.use(express.json());
<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
=======
app.use(cors({ origin: 'https://www.jwskilledhunt.org' }));
>>>>>>> 46acd27ae8bb517199562216056b6ffa3630cc46

// File upload configuration
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api", jobListingsRoute);
app.use("/api/auth", authRoutes);
app.use("/api/client", client);
app.use("/api/chat", chat);
app.use("/api", notificationRoute);
app.use("/api/user", userRoutes);
app.use("/api/verify-document", verificationRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile/setup", subadminRoutes);
app.use("/api/tradepersons", tradePersonRoutes);








// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

// Contact Us API
app.post("/api/contact", async (req, res) => {
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
    to: "support@jwskilledhunt.org",
    subject: `New Contact Us Message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    next(new Error("Invalid token"));
  }
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user?.id}`);
  socket.join(socket.user?.id);

  // Fetch chat history
  socket.on("getChatHistory", async ({ currentUserId, receiverId }) => {
    try {
      const history = await Message.find({
        $or: [
          { senderId: currentUserId, receiverId },
          { senderId: receiverId, receiverId: currentUserId },
        ],
      }).sort({ timestamp: 1 });

      socket.emit("chatHistory", history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
});

  // Send message
  socket.on("sendMessage", async (messageData) => {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      io.to(messageData.receiverId).emit("receiveMessage", messageData);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user?.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Send email function
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to,                          // Recipient address
    subject,                     // Subject line
    text,                        // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

// API route to handle form submission
app.post('/send-feedback', async (req, res) => {
  const { option, ...formContent } = req.body;

  // Formatted email content
  const emailContent = `
    Option: ${option}
    Form Data: ${JSON.stringify(formContent, null, 2)}
  `;

  try {
    // Send email to the admin or a designated email address
    const adminEmail = 'admin@example.com'; 
    await sendEmail(adminEmail, 'Feedback Form Submission', emailContent);
    res.status(200).json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending feedback.' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
