// models/SubjectModel.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  id: { type: Number, unique: true },  // Unique numeric ID (like 1, 2, 3...)
  subject: { type: String, required: true },
  subjectCode: { type: String, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);
