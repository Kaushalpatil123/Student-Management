// features/student/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../../config/api";

// API base URL
const API_URL = Backend_URL;

// GET all students
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// POST a new student
export const createStudent = createAsyncThunk("students/create", async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
});

// GET a student by ID
export const getStudentById = createAsyncThunk("students/getById", async (id) => {
  const response = await axios.get(`${API_URL}/by-custom-id/${id}`);
  return response.data;
});

// UPDATE a student
export const updateStudent = createAsyncThunk("students/update", async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
});

// DELETE a student
export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    currentStudent: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // fetchStudents
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // createStudent
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })

      // getStudentById
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.currentStudent = action.payload;
      })

      // updateStudent
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
      })

      // deleteStudent
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
