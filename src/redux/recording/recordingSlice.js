import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recordings: [],
  mlResponse: "",
  status: 'idle',
  error: null,
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
    // Add these reducers
    fetchRecordingsStart(state) {
      state.status = 'loading';
    },
    fetchRecordingsSuccess(state, action) {
      state.recordings = action.payload;
      state.status = 'succeeded';
    },
    fetchRecordingsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  uploadStart,
  uploadSuccess,
  uploadFailure,
  fetchRecordingsStart,
  fetchRecordingsSuccess,
  fetchRecordingsFailure,
} = recordingSlice.actions;

export default recordingSlice.reducer;
