const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  jobOpenings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

module.exports = mongoose.model('Employer', employerSchema);
