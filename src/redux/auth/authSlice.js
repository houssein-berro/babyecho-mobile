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
      state.user = action.payload.newUser;
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
      const newBaby = action.payload.babies[action.payload.babies.length - 1];
      
      state.user = {
        ...state.user,
        babies: [...state.user.babies, newBaby]  
      };
    },
    addBabyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action) {
      state.error = action.payload;
    },
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  addBabyFailure,
  addBabySuccess,
  addBabyStart,
  logoutSuccess,   
  logoutFailure,   
} = authSlice.actions;

export default authSlice.reducer;
