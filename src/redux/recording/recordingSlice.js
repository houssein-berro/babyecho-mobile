import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recordings: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const recordingSlice = createSlice({
  name: 'recordings',
  initialState,
  reducers: {
    uploadStart(state) {
      state.status = 'loading';
    },
    uploadSuccess(state, action) {
      state.recordings.push(action.payload);
      state.status = 'succeeded';
    },
    uploadFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure } = recordingSlice.actions;

export default recordingSlice.reducer;
