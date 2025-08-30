// controllers/SubjectController.js
const Subject = require('../models/subjectModel');

// Generate Next Unique ID
const getNextId = async () => {
  const lastSubject = await Subject.findOne().sort({ id: -1 }).limit(1);
  return lastSubject ? lastSubject.id + 1 : 1;
};

// Add Subject
exports.addSubject = async (req, res) => {
  try {
    const { subject, subjectCode } = req.body;
    const id = await getNextId();

    const newSubject = new Subject({ id, subject, subjectCode });
    await newSubject.save();

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ id: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, subjectCode } = req.body;

    const updatedSubject = await Subject.findOneAndUpdate(
      { id: Number(id) },
      { subject, subjectCode },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findOneAndDelete({ id: Number(id) });

    if (!deletedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
