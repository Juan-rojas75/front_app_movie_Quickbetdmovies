// store/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const initialuser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user:initialuser,
  } as AuthState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
