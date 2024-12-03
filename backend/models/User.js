const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
