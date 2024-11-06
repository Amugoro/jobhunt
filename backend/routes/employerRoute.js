const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const authMiddleware = require('../middleware/authMiddleware');

// Employer can delete recruiters or jobseekers
router.delete('/user/:userId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only employers can delete users' });

    const userToDelete = await User.findById(req.params.userId);
    if (!userToDelete) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
