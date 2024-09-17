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
      // If the response contains a `babies` array, extract the last added baby
      const newBaby = action.payload.babies[action.payload.babies.length - 1];
      
      state.user = {
        ...state.user,
        babies: [...state.user.babies, newBaby]  // Add only the new baby
      };
    }
    ,
    
    
    addBabyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
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
    addBabyStart  

} = authSlice.actions;

export default authSlice.reducer;
