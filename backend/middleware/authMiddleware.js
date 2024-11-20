
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID decoded from the token and attach to the request object
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token provided
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
