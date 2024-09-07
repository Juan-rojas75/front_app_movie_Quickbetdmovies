// store/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
  } as AuthState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
});

export const { setToken, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
