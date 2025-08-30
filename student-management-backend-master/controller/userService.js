const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const generateSetPasswordEmail = require("../components/emails/setPasswordEmail");
const sendMail = require("../utils/sendMail");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use env var
const JWT_EXPIRES_IN = "15m"; // 15 minutes

exports.createUserFromStudent = async (student) => {
  const fullName = student.fname + " " + student.lname
  const user = new User({
    _id: student._id, // Use existing student _id
    id: student.id,   // Optional: custom field 'id' from student
    name: fullName,
    email: student.email,
    role: "L2",
    password: null,
  });

  try {
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/${token}`;
    const { subject, html } = generateSetPasswordEmail(user.name, resetLink, user.role);

    try {
      console.log("Sending email to:", user.email);
      await sendMail(user.email, subject, html);
      console.log("Email sent.");
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
    }

    return user;
  } catch (err) {
    throw new Error("Failed to create user from student: " + err.message);
  }
};


// exports.createUserFromStudent = async (student) => {
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     id: student.id,
//     name: student.fullName,
//     email: student.email,
//     role: "L2",
//     password: null,
//   });

//   try {
//     await user.save();

//     // Generate a token with only userId (same as registerUser)
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     // Link to frontend route that captures the token
//     const resetLink = `${process.env.FRONTEND_URL}/${token}`;

//     const { subject, html } = generateSetPasswordEmail(user.name, resetLink, user.role);

//     try {
//       console.log("Sending email to:", user.email);
//       await sendMail(user.email, subject, html);
//       console.log("Email sent.");
//     } catch (emailErr) {
//       console.error("Failed to send email:", emailErr);
//     }

//     return user;
//   } catch (err) {
//     throw new Error("Failed to create user from student: " + err.message);
//   }
// };
