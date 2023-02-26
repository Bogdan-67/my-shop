import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPaints = createAsyncThunk('paints/fetchPaintsStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items?page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const paintsSlice = createSlice({
  name: 'paints',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPaints.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPaints.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPaints.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = paintsSlice.actions;

export default paintsSlice.reducer;
