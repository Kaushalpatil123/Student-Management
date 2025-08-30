const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail");
const generateSetPasswordEmail = require('../components/emails/setPasswordEmail');

exports.registerUser = async (req, res) => {
  const { name, email } = req.body;
const role = "L1";
  // Optional: basic input validation
  if (!name || !email || !role) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // Create and save user
    const newUser = new User({ name, email, role });
    await newUser.save();

    // Generate token for set password link
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const link = `${process.env.FRONTEND_URL}/${token}`;
    const { subject, html } = generateSetPasswordEmail(name, link, role);

    // Send set-password email
    await sendMail(email, subject, html);

    res.status(201).json({
      msg: "Registration successful. Check your email to set your password.",
    });
  } catch (err) {
    console.error("Registration error:", err);
        console.log("Registration error:", err);
    // res.status(500).json({ msg: "Server error", err: err.message || err });
    res.status(500).json({
  msg: "Server error",
  err: err?.message || JSON.stringify(err) || "Unknown error"
});

  }
};


exports.setPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.userId, { password: hash });

    res.status(200).json({ msg: "Password set successfully." });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};


exports.loginUser = async (req, res) => {

    if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ msg: "Request body is missing or invalid" });
  }
  const { email, password } = req.body;
console.log("loginUser req.body",req.body)
console.log("loginUser",email, password)

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials Found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { _id: user._id, id: user.id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
