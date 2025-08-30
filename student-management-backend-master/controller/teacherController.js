const Teacher = require('../models/teacherModel');

// Helper function to generate next unique id
const getNextId = async () => {
  const lastTeacher = await Teacher.findOne().sort({ id: -1 }).limit(1);
  return lastTeacher ? lastTeacher.id + 1 : 1;
};

// Add Teacher
const addTeacher = async (req, res) => {
  try {
    const { teachName, teacherID, selectedSubjects , email} = req.body;

    const nextId = await getNextId();  // Generate next unique id

    const newTeacher = new Teacher({
      id: nextId,
      teachName,
      teacherID,
      selectedSubjects,
      email
    });

    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add teacher' });
  }
};

// Get All Teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get teachers' });
  }
};

// Update Teacher

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const { teachName, teacherID, selectedSubjects, email } = req.body;

    if (!teachName || !teacherID || !email || selectedSubjects.length === 0) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { id: Number(id) },  // ✅ Find by custom id (convert string to number)
      { teachName, teacherID, selectedSubjects,email },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};



// const updateTeacher = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log('update', id, req.body);  // Debugging

//     const { teachName, teacherID, selectedSubjects } = req.body;

//     if (!teachName || !teacherID || !selectedSubjects) {
//       return res.status(400).json({ error: 'Missing fields' });
//     }

//     const updatedTeacher = await Teacher.findByIdAndUpdate(
//       id,
//       { teachName, teacherID, selectedSubjects },
//       { new: true }
//     );

//     res.status(200).json(updatedTeacher);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update teacher' });
//   }
// };



// // Update Teacher
// const updateTeacher = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updatedTeacher);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update teacher' });
//   }
// };

// Delete Teacher

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};

module.exports = {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
};
