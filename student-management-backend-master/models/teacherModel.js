const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
 id: {
  type: Number, 
  unique: true 
 },  
  teachName: {
    type: String,
    required: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  email:{
        type: String,
    required: true,
  },
  selectedSubjects: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
