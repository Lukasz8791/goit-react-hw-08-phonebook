import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const fetchUserContacts = createAsyncThunk(
  'contacts/fetchUserContacts',
  async (_, { getState }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async newContact => {
    try {
      const response = await axios.post(`${API_URL}/contacts`, newContact);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync',
  async id => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUserContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export const contactsActions = {
  fetchUserContacts,
  addContactAsync,
  deleteContactAsync,
  setFilter,
};

export default contactsSlice.reducer;
