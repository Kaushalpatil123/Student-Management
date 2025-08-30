// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes")
const subjectRoutes = require("./routes/subjectRoute")
const teacherRoutes = require("./routes/teacherRoutes")
const standardRoutes = require("./routes/standardRoutes")
const fileRoutes = require("./routes/fileRoutes")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});
app.use(express.json());

app.use('/students/standard', standardRoutes);
app.use('/students/subjects', subjectRoutes);
app.use('/students/teacher', teacherRoutes);   // 👈 your requested route
app.use('/students', authRoutes);
app.use('/students', studentRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/files', fileRoutes);


// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
