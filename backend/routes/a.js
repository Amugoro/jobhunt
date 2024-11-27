const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const { protect } = require("../middleware/authMiddleware");

// Default JWT secret if not provided in .env
const JWT_SECRET = process.env.JWT_SECRET 

// Signup Route
router.post("/signup", protect, async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    console.log("Received signup request:", { email });

    // Check for missing fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (fullName, email, password, role) are required.",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: { fullName, email, role },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Login Route
router.post("/login", protect, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", { email });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { fullName: user.fullName, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Forgot Password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `https://www.jwskilledhunt.org/reset-password/${resetToken}`;

    const emailContent = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.fullName},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    const emailResponse = await sendEmail(user.email, "Password Reset Request", emailContent);

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
