import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SearchPaintsParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPaints = createAsyncThunk<PaintItem[], SearchPaintsParams>(
  'paints/fetchPaintsStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<PaintItem[]>(
      `https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items?page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

type PaintItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PaintItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const paintsSlice = createSlice({
  name: 'paints',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PaintItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaints.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPaints.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPaints.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPaintsData = (state: RootState) => state.paints;

export const { setItems } = paintsSlice.actions;

export default paintsSlice.reducer;
