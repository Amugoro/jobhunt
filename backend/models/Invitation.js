const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' },
  message: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invitation', invitationSchema);
