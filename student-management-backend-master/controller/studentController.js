const Student = require("../models/studentModel");
const { createUserFromStudent } = require("./userService");
// Create a new student



exports.createStudent = async (req, res) => {
  try {
    console.log('student',req.body)
    const student = new Student(req.body);
        console.log('student',student)
    const savedStudent = await student.save();

    try {
      await createUserFromStudent(savedStudent);
    } catch (userError) {
      console.error("Student saved but user creation failed:", userError.message);
      return res.status(500).json({
        message: "Student created, but failed to create user.",
        student: savedStudent,
      });
    }

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ message: "Failed to create student" });
  }
};


// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getStudentById = async (req, res) => {
  const studentId = Number(req.params.id);
  console.log("HIT getStudentById with", req.params.id);

  try {
    // Fetch using your own "id" field, NOT _id
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update a student
// controller/studentController.js
exports.updateStudent = async (req, res) => {
  try {
    console.log('req.body',req.body)
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },  // <- custom 'id' field
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id }); // 👈 using custom id
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

