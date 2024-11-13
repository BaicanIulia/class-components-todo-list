import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import { clientOnlyMiddleware } from './middlewares/clientOnlyMiddleware';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientOnlyMiddleware),
});
