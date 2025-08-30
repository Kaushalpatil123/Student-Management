// // src/redux/fileSlice.js

// src/redux/fileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../../config/api";

const BASE_URL = Backend_URL;

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  };
};

// Upload file with progress tracking
export const uploadFile = createAsyncThunk(
  "files/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/files/upload`, formData, {
        headers: getAuthHeaders(),
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${progress}%`);
          // You can dispatch an action to update progress in state if needed
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get files by user ID
export const getFilesByUserId = createAsyncThunk(
  "files/getByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/files/user/${userId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete file
export const deleteFile = createAsyncThunk(
  "files/delete",
  async (fileId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/files/${fileId}`, {
        headers: getAuthHeaders()
      });
      return fileId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    currentFile: null,
    loading: false,
    error: null,
    uploadProgress: 0
  },
  reducers: {
    clearFiles: (state) => {
      state.files = [];
      state.currentFile = null;
      state.error = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload File
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push(action.payload);
        state.uploadProgress = 100;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      
      // Get Files by User ID
      .addCase(getFilesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(getFilesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete File
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files.filter(file => file._id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearFiles, setUploadProgress } = fileSlice.actions;
export default fileSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Backend_URL } from "../../config/api";

// const BASE_URL = Backend_URL;

// // ========== ASYNC THUNKS ==========

// // Upload file
// export const uploadFile = createAsyncThunk(
//   "files/upload",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/files/upload`, formData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const getFileById = createAsyncThunk(
//   "files/getById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/files/${id}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Get all files
// export const getAllFiles = createAsyncThunk(
//   "files/getAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/files`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Update file
// export const updateFile = createAsyncThunk(
//   "files/update",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/files/${id}`, formData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Delete file
// export const deleteFile = createAsyncThunk(
//   "files/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${BASE_URL}/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const fileSlice = createSlice({
//   name: "files",
//   initialState: {
//     files: [],
//     singleFile: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     // Upload
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.files.push(action.payload);
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Get Specific
//     builder
//       .addCase(getFileById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getFileById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleFile = action.payload;
//       })
//       .addCase(getFileById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Get All
//     builder
//       .addCase(getAllFiles.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllFiles.fulfilled, (state, action) => {
//         state.loading = false;
//         state.files = action.payload;
//       })
//       .addCase(getAllFiles.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Update
//     builder
//       .addCase(updateFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateFile.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.files.findIndex(
//           (f) => f._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.files[index] = action.payload;
//         }
//       })
//       .addCase(updateFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Delete
//     builder
//       .addCase(deleteFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteFile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.files = state.files.filter((file) => file._id !== action.payload);
//       })
//       .addCase(deleteFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default fileSlice.reducer;
