// index.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/jw-skilledhunt", { useNewUrlParser: true, useUnifiedTopology: true });

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ fullName: newUser.fullName, role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to register" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ fullName: user.fullName, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
