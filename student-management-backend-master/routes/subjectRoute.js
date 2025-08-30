// routes/SubjectRoute.js
const express = require('express');
const router = express.Router();
const SubjectController = require('../controller/subjectController');

// Routes
router.post('/', SubjectController.addSubject);
router.get('/', SubjectController.getSubjects);
router.put('/:id', SubjectController.updateSubject);
router.delete('/:id', SubjectController.deleteSubject);

module.exports = router;
