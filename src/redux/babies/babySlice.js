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
      state.babies.push(action.payload);
      state.loading = false;
    },

  },
});

export const { addBabyStart, addBabySuccess, addBabyFailure } = babySlice.actions;
export default babySlice.reducer;
