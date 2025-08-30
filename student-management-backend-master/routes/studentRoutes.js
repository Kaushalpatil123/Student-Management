const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/by-custom-id/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
