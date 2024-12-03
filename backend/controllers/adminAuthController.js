const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const DEFAULT_ADMIN = {
  username: process.env.DEFAULT_ADMIN_USERNAME,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for default admin credentials
    if (username === DEFAULT_ADMIN.username) {
      if (password === DEFAULT_ADMIN.password) {
        const token = jwt.sign(
          { username: DEFAULT_ADMIN.username, role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return res.status(200).json({
          success: true,
          token,
          role: 'admin',
          message: 'Login successful as admin',
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid password for admin' });
      }
    }

    // Check for subadmin in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Ensure the user has the correct role
    if (user.role !== 'admin' && user.role !== 'subadmin') {
      return res.status(403).json({ success: false, message: 'Unauthorized role' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Generate token for subadmin
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      message: `Login successful as ${user.role}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed', error });
  }
};
