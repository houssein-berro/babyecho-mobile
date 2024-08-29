import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    signupFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
    },
    loadUser(state, action) {
      state.user = action.payload;
    },
    addBabyStart(state) {
      state.loading = true;
      state.error = null;
    },
    addBabySuccess(state, action) {
      if (state.user && state.user.babies) {
        state.user.babies.push(action.payload);
      } else if (state.user) {
        state.user.babies = [action.payload];
      }
      state.loading = false;
    },
    addBabyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  signupStart, 
  signupSuccess, 
  signupFailure, 
  logout, 
  loadUser,
  addBabyStart,
  addBabySuccess,
  addBabyFailure 
} = authSlice.actions;

export default authSlice.reducer;
