import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://connections-api.herokuapp.com/contacts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch contacts');
    }
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync',
  async newContact => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://connections-api.herokuapp.com/contacts',
        newContact,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error('Failed to add contact');
    }
  }
);
export const logoutAsync = createAsyncThunk(
  'users/logoutAsync',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/logout',
        null, // Nie ma potrzeby wysyłania danych w ciele żądania
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;     
    } catch (error) {
      throw Error(`Failed to connect API and logout > ${error}`);
    }
  }
);
export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync',
  async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error) {
      throw Error('Failed to delete contact');
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
    user: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearContacts: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.user = null;  // Clear user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
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

export const { setFilter, setUser, clearContacts } = contactsSlice.actions;

export const contactsActions = {
  fetchContacts,
  addContactAsync,
  deleteContactAsync,
  logoutAsync,
  setFilter,
  setUser,
  clearContacts, // Dodajemy akcję clearContacts
};


export default contactsSlice.reducer;
