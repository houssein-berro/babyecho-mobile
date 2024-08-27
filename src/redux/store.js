import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import recordingReducer from './recording/recordingSlice';
export const store = configureStore({
  reducer: {
  user: authReducer,
  recordings: recordingReducer
  },
});

export default store;
