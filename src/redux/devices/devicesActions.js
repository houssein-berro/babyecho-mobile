import axios from 'axios';
import {
  setLoading,
  setError,
  setDevices,
  addDevice,
  updateDevice,
  removeDevice,
} from './devicesSlice';

import {BACKEND_URL} from '@env';


export const fetchDevices = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${BACKEND_URL}/api/devices`);
    dispatch(setDevices(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewDevice = device => async dispatch => {
  dispatch(setLoading(true));
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.post(`${BACKEND_URL}/api/devices`, device, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addDevice(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editDevice = (deviceId, updatedDevice) => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  dispatch(setLoading(true));
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/devices/${deviceId}`,
      updatedDevice,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(updateDevice(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a device
export const deleteDevice = deviceId => async dispatch => {
  dispatch(setLoading(true));
  const token = await AsyncStorage.getItem('token');

  try {
    await axios.delete(`${BACKEND_URL}/api/devices/${deviceId}`, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(removeDevice(deviceId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
