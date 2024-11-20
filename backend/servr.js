const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (data) => {
    io.emit('message', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
