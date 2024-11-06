const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
