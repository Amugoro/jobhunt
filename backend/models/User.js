// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "recruiter", "employer"], required: true },
  isVerified: { type: Boolean, default: false },
  profilePhoto: { type: String }, // URL to profile photo
  resume: { type: String }, // URL to resume
  bio: { type: String },
  skills: [{ type: String }],
  companyName: { type: String },
  companySize: { type: String },
  companySummary: { type: String },
  // Additional fields can be added as necessary
});

module.exports = mongoose.model("User", userSchema);
