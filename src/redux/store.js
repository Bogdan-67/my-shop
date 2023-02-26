import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import paints from './slices/paintsSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    paints,
  },
});
