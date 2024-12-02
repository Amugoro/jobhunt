const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()
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
