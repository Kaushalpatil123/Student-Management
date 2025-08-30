// backend/models/FileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: String,
  mongoID: String,
  documentname:String,
  filename: String,
  filetype: String,
  filepath: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', fileSchema);
