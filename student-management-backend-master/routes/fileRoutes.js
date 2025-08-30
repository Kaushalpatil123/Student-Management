// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const {
  uploadFile,
  getFileById,
  getAllFiles,
  updateFile,
  deleteFile,
} = require('../controller/fileController');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/:id', getFileById);
router.get('/', getAllFiles);
router.put('/:id', upload.single('file'), updateFile);
router.delete('/:id', deleteFile);

module.exports = router;
