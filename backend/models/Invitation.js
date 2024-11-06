const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['sent', 'accepted', 'rejected'], default: 'sent' },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Invitation', invitationSchema);
