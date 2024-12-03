const User = require('../models/User');
const Job = require('../models/Job');
const crypto = require('crypto');
const bcrypt = require('bcrypt');



// Get all users 
exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query; //

   
    const users = role ? await User.find({ role }) : await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error,
    });
  }
};

// Get a single user's details
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error,
    });
  }
};

// Approve or reject users
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, { status });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: `User ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error });
  }
};

// Ban/Unban users
exports.banUser = async (req, res) => {
  try {
    const { isBanned } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, { isBanned });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: `User ${isBanned ? 'banned' : 'unbanned'}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error banning/unbanning user', error });
  }
};

// Reset passwords
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

// View all job postings
exports.getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  };
  
  // Approve/Reject a job
  exports.updateJobStatus = async (req, res) => {
    try {
      const { status } = req.body; 
      const job = await Job.findByIdAndUpdate(req.params.jobId, { status });
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      res.status(200).json({ message: `Job ${status}`, job });
    } catch (error) {
      res.status(500).json({ message: 'Error updating job status', error });
    }
  };
  
  // Flagged job review
  exports.getFlaggedJobs = async (req, res) => {
    try {
      const flaggedJobs = await Job.find({ isFlagged: true });
      res.status(200).json(flaggedJobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching flagged jobs', error });
    }
  };
  
  // Delete job posting
  exports.deleteJob = async (req, res) => {
    try {
      const job = await Job.findByIdAndDelete(req.params.jobId);
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      res.status(200).json({ message: 'Job deleted', job });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting job', error });
    }
  };
   
// Generate a random password
const generatePassword = () => Math.random().toString(36).slice(-8);

// Admin generates a subadmin
exports.generateSubadmin = async (req, res) => {
  try {
    const { fullName, email, permissions } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can add subadmins' });
    }

    // Generate a username and password
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
    const password = generatePassword();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubadmin = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      role: 'subadmin',
      permissions,
    });

    await newSubadmin.save();

    res.status(201).json({
      success: true,
      message: 'Subadmin created successfully',
      credentials: {
        username,
        password,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create subadmin', error });
  }
};


// Assign permissions to a subadmin
exports.assignPermissions = async (req, res) => {
  try {
    const { userId, permissions } = req.body;

    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can assign permissions' });
    }

    // Find the user and update their permissions
    const subadmin = await User.findById(userId);
    if (!subadmin || subadmin.role !== 'subadmin') {
      return res.status(404).json({ success: false, message: 'Subadmin not found' });
    }

    subadmin.permissions = permissions;
    await subadmin.save();

    res.status(200).json({
      success: true,
      message: 'Permissions updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to assign permissions',
      error,
    });
  }
};

// Delete a subadmin
exports.deleteSubadmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can delete subadmins' });
    }

    // Find the subadmin and delete
    const subadmin = await User.findById(userId);
    if (!subadmin || subadmin.role !== 'subadmin') {
      return res.status(404).json({ success: false, message: 'Subadmin not found' });
    }

    await subadmin.remove();

    res.status(200).json({
      success: true,
      message: 'Subadmin deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete subadmin',
      error,
    });
  }
};


