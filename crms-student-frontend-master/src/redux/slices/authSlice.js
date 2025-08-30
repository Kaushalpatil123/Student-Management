import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../../config/api";

// Login API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Backend_URL}/login`, formData);
       const { token } = res.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      console.log('user res.data', res.data)
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Login failed");
    }
  }
);

export const setPassward = createAsyncThunk(
  "auth/setPassward",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Backend_URL}/set-password/${token}`, {
        password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password setup failed"
      );
    }
  }
);

// Register API
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Backend_URL}/register`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    passward: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.passward = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(setPassward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPassward.fulfilled, (state, action) => {
        state.loading = false;
        state.passward = action.payload;
      })
      .addCase(setPassward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
