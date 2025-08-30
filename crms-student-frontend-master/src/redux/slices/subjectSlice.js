import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Backend_URL } from '../../config/api';

const API_URL = Backend_URL;

//  Add Subject
export const addSubject = createAsyncThunk('subjects/addSubject', async (subjectData) => {
  const response = await axios.post(`${API_URL}/subjects`, subjectData);
  return response.data;
});

//  Get All Subjects
export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
  const response = await axios.get(`${API_URL}/subjects`);
  return response.data;
});

// Update Subject
export const updateSubject = createAsyncThunk('subjects/updateSubject', async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/subjects/${id}`, updatedData);
  return response.data;
});

// Delete Subject
export const deleteSubject = createAsyncThunk('subjects/deleteSubject', async (id) => {
  await axios.delete(`${API_URL}/subjects/${id}`);
  return id;  // Return ID to remove from state
});

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add Subject
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subjects.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default subjectSlice.reducer;
