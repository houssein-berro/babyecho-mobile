import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import recordingReducer from './recording/recordingSlice';
import deviceReducer from './devices/devicesSlice';
export const store = configureStore({
  reducer: {
  user: authReducer,
  recordings: recordingReducer,
  devices: deviceReducer
  },
});

export default store;
