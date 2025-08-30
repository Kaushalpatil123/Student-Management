// src/redux/slices/standardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../../config/api";

// const API_BASE = "http://localhost:5000/students/standard";
const API_BASE = Backend_URL;

export const addStandard = createAsyncThunk(
  "standard/addStandard",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/standard/add`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const getAllStandards = createAsyncThunk(
  "standard/getAllStandards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Backend_URL}/standard/get`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const editStandard = createAsyncThunk(
  "standard/editStandard",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/standard/edit/${id}`, updatedData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const deleteStandard = createAsyncThunk(
  "standard/deleteStandard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/standard/delete/${id}`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

// ===== Slice =====

const standardSlice = createSlice({
  name: "standard",
  initialState: {
    standards: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearStandardMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get all
      .addCase(getAllStandards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStandards.fulfilled, (state, action) => {
        state.loading = false;
        state.standards = action.payload;
      })
      .addCase(getAllStandards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addStandard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStandard.fulfilled, (state, action) => {
        state.loading = false;
        state.standards.push(action.payload.standard);
        state.message = action.payload.message;
      })
      .addCase(addStandard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editStandard.pending, (state) => {
        state.loading = true;
      })
      .addCase(editStandard.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        const index = state.standards.findIndex(
          (std) => std.id === action.payload.standard.id
        );
        if (index !== -1) {
          state.standards[index] = action.payload.standard;
        }
      })
      .addCase(editStandard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteStandard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStandard.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.standards = state.standards.filter(
          (std) => std.id !== action.payload.id
        );
      })
      .addCase(deleteStandard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStandardMessages } = standardSlice.actions;
export default standardSlice.reducer;
