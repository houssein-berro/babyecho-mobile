// babySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  babies: [],
  loading: false,
  error: null,
};

const babySlice = createSlice({
  name: 'baby',
  initialState,
  reducers: {
    addBabyStart(state) {
      state.loading = true;
      state.error = null;
    },
    addBabySuccess(state, action) {
      console.log("New baby added:", action.payload); // Check if the baby is being added
      state.babies.push(action.payload); // Add new baby to the babies array
      state.loading = false;
    },
    addBabyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addBabyStart, addBabySuccess, addBabyFailure } = babySlice.actions;
export default babySlice.reducer;
