// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async userData => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk('auth/loginUser', async userData => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    // Do something to logout user, e.g., clearing local storage
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
