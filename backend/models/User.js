const mongoose = require('mongoose');

// Add new field skillsm experience and profilePicture
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: { 
    type: String 
  },
  username: {
    type: String,

    unique: true,
  },
  role: {
    type: String,
    enum: ['client', 'freelancer', 'tradeperson', 'admin', 'subadmin'],
    required: true,
  },
  permissions: {
    viewUsers: { type: Boolean, default: false },
    deleteUsers: { type: Boolean, default: false },
    // Other permissions such as view jobs, create jobs, etc.
    viewJobs: { type: Boolean, default: true },
    createJobs: { type: Boolean, default: true },
    deleteJobs: { type: Boolean, default: true },

  },
  verified: {
    type: Boolean,
    default: false,
  },
  tradeSkills: {
    type: String,
    required: false,
    default: null
  },
  experience: {
    type: String,
    required: false,
    default: null
  },
  profilePicture: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
