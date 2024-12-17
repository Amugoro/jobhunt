const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const { protect } = require("../middleware/authMiddleware");
require('dotenv').config();



// Default JWT secret if not provided in .env
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret";



console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);


// Signup Route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Generated Hash for Signup:", hashedPassword);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("JWT_SECRET used for signing:", process.env.JWT_SECRET);

    res.json({ success: true, user: newUser, token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });
//     }


//     if (!fullName || !email || !password || !role) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     try {
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ success: false, message: "User already registered" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("Generated Hash for Signup:", hashedPassword);
//       const newUser = new User({
//         fullName,
//         email,
//         password: hashedPassword,
//         role,
//       });

//       await newUser.save();

//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//       });
//       console.log("JWT_SECRET used for signing:", process.env.JWT_SECRET);

//       res.status(201).json({ success: true, user: newUser, token });
//     } catch (error) {
//       console.error("Error during signup:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   });

// Login Route
// Generate Access Token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    console.log("Plain Password:", password);
    console.log("Stored Hash from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Comparison Result:", isMatch);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user._id);
    //console.log("accesstoken:", accessToken);
    const refreshToken = generateRefreshToken(user._id);
   // console.log("generateaccesstoken:", refreshToken);

    // Save refresh token to database (optional for security)
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with access token and user info
    res.json({ success: true, user, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ success: false, message: "Refresh token missing" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user and validate refresh token
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user._id);
    res.json({ success: true, accessToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
});



// Forgot Password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Create a password reset link
    const resetLink = `/reset-password/${resetToken}`;

    // Prepare the email content
    const emailContent = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.fullName},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    // Send the password reset email
    const emailResponse = await sendEmail(
      user.email,
      "Password Reset Request",
      emailContent
    );

    if (!emailResponse.success) {
      return res.status(500).json({
        success: false,
        message: "Unable to send password reset email. Please try again later.",
      });
    }

    res.json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

module.exports = router;
