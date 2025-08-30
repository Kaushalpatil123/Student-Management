// src/redux/slices/teacherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Backend_URL } from '../../config/api';

const API_URL = Backend_URL;


// Get all teachers
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/teacher`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error fetching teachers');
    }
  }
);

// Add new teacher
export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/teacher`, teacherData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error adding teacher');
    }
  }
);

// Update teacher
export const updateTeacher = createAsyncThunk(
  'teachers/updateTeacher',
  async ({ id, teacherData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/teacher/${id}`, teacherData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating teacher');
    }
  }
);

// Delete teacher
export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/teacher/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error deleting teacher');
    }
  }
);

// ✅ Slice
const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Teacher
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teacherSlice.reducer;
