import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/Axios/axios.js";
import { toast } from "react-hot-toast";

const initialState = {
  auth: true,
  user: null,
  loading: false,
  error: null,
};

// Login
export const loginUser = createAsyncThunk("login", async (data) => {
  try {
    const response = await api.post("", data); // Login
    toast.success("Login Successfully!");
    return response.data?.data;
  } catch (error) {
    toast.error("Login Failed! Please try again.");
    throw error;
  }
});

// Fetch Current User
export const fetchUser = createAsyncThunk("CurrentUser", async () => {
  try {
    const response = await api.get(""); // fetch current user
    console.log("(authSlice) Current User", response.data);
    return response.data?.data;
  } catch (error) {
    toast.error("Faield to fetch details. Please login again");
    throw error;
  }
});

// Logout
export const logoutUser = createAsyncThunk("logout", async () => {
  try {
    await api.post("//logout"); // Logout
    toast.success("User logged out successfully!");
  } catch (error) {
    toast.error("Failed to logout");
    throw error;
  }
});

// Authentication Slice
const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.loading = false;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, _) => {
      state.auth = false;
      state.loading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.auth = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { setUser, setAuth, setError, setLoading, clearUser } =
  authSlice.actions;

export default authSlice.reducer