const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['remote', 'onsite', 'hybrid'],
    required: true,
  },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of applicants
  shortlisted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Shortlisted candidates
  createdAt: { type: Date, default: Date.now },

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
