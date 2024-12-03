const User = require('../models/User');
const bcrypt = require('bcrypt');

// Subadmin profile setup
exports.setupProfile = async (req, res) => {
  try {
    const { fullName, newPassword } = req.body;

    if (req.user.role !== 'subadmin') {
      return res.status(403).json({ success: false, message: 'Only subadmins can set up their profiles' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(req.user._id, {
      fullName,
      password: hashedPassword,
    });

    res.status(200).json({ success: true, message: 'Profile setup successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to set up profile', error });
  }
};
