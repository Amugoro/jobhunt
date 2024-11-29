const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  fileUrl: { type: String },  
  timestamp: { type: Date, default: Date.now },
});

// Check if the model already exists, if not, create it
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;
