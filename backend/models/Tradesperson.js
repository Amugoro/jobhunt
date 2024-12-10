
const mongoose = require('mongoose');

const TradespersonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profilePicture: {
    type: String,
  },
  objective: {
    type: String,
    trim: true,
  },
  tradeSkills: {
    type: [String],
    required: true,
  },
  experience: {
    type: [String],
    required: true,
  },
  ratings: [
    {
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: Number,
      review: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tradesperson = mongoose.model('Tradesperson', TradespersonSchema);
module.exports = Tradesperson;
