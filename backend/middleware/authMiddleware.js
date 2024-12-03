const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../keys');

exports.protect = async (req, res, next) => {
  // const { token } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    // Find the user by ID and validate the signup token
    const user = await User.findById(decoded.id);
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }

    // Attach the user to the request
    req.user = user;

    console.log(req.user)

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to verify if the user is an admin
exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check if the user is a subadmin and has the required permission
exports.isSubadmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'subadmin') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  
  // Check permissions
  if (!user.permissions[req.permission]) {
    return res.status(403).json({ success: false, message: 'Permission denied' });
  }

  next();
};