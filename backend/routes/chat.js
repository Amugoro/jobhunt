const express = require('express'); 
const Message = require('../models/Message');  
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get chat history between two users
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Find all messages between the two users (this assumes a separate "chat" collection or conversation)
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: req.query.receiverId },
        { senderId: req.query.receiverId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });  // Sorting messages by timestamp to get the chat history in order

    res.status(200).json(messages);  // Return the messages as chat history
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

// Post a new message (with or without file)
router.post('/', async (req, res) => {
  const { senderId, receiverId, message, fileUrl } = req.body;  

  try {

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      fileUrl,  
      timestamp: new Date(),
    });

    await newMessage.save();  

    res.status(201).json(newMessage);  
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ message: 'Error posting message' });
  }
});

// Handle file upload for messages (store file URL)
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileUrl = '/uploads/' + req.file.filename;
    res.status(200).json({ fileUrl });  
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

module.exports = router;
