const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Tech", "Trade"],
    required: true,
  },
  subcategory: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
    required: function () {
      return this.category === "Tech";
    },
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: function () {
      return this.category === "Trade";
    },
  },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
