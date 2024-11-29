const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../keys');

exports.protect = async (req, res, next) => {
  const { token } = req.body;
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
    if (!user || user.signupToken !== token) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }

    // Attach the user to the request
    req.user = user;

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
