const jwt = require('jsonwebtoken');
const User = require('../models/User');




exports.protect = async (req, res, next) => {
  try {
    // Check for the Authorization header
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, malformed or missing token' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    console.log('Received Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    console.log('Found User:', user);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Attach the user to the request object
    req.user = user;
    console.log('Attached User to Request:', req.user);

    next();
  } catch (error) {
    console.error('Error during token verification:', error.message);
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