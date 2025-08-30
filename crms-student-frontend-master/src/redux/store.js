// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/slices/studentSlice";
import authReducer from "../redux/slices/authSlice";
import pageTitleReducer from "../redux/slices/pageTitleSlice";
import subjectReducer from "../redux/slices/subjectSlice";
import teacherReducer from "../redux/slices/teacherSlice";
import standardReducer from "../redux/slices/standardSlice";
import fileReducer from "../redux/slices/fileSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    auth: authReducer,
    pageTitle: pageTitleReducer,
    subjects: subjectReducer,
    teachers: teacherReducer,
    standard: standardReducer,
    files: fileReducer,
  },
});

export default store;
