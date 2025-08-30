// backend/controllers/fileController.js
const File = require('../models/fileModel');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
  const { id, mongoID } = req.body;
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const file = new File({
      id,
      mongoID,
      documentname,
      filename: req.file.originalname,
      filetype: req.file.mimetype,
      filepath: req.file.path,
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFile = async (req, res) => {
  const { id } = req.params;

  try {
    const existingFile = await File.findById(id);
    if (!existingFile) return res.status(404).json({ message: "File not found" });

    // Delete old file
    fs.unlinkSync(path.resolve(existingFile.filepath));

    // Update with new file
    existingFile.filename = req.file.originalname;
    existingFile.filetype = req.file.mimetype;
    existingFile.filepath = req.file.path;

    await existingFile.save();
    res.json(existingFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    fs.unlinkSync(path.resolve(file.filepath));
    await file.deleteOne();
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
