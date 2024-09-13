import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    removeDevice: (state, action) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
    }
  }
});

export const { setLoading, setError, setDevices, addDevice, updateDevice, removeDevice } = devicesSlice.actions;

export default devicesSlice.reducer;
