import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recordings: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};



export const { uploadStart, uploadSuccess, uploadFailure } = recordingSlice.actions;

export default recordingSlice.reducer;
 