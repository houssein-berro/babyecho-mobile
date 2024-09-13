import axios from 'axios';
import { setLoading, setError, setDevices, addDevice, updateDevice, removeDevice } from './devicesSlice';

import {BACKEND_URL} from '@env';
// Fetch all devices for a user
export const fetchDevices = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${BACKEND_URL}/api/devices`);
      dispatch(setDevices(response.data));  // Assuming the response contains an array of devices
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Add a new device
  export const addNewDevice = (device) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${BACKEND_URL}/api/devices`, device, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(addDevice(response.data));  // Assuming the response contains the newly added device
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Update a device
  export const editDevice = (deviceId, updatedDevice) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`${BACKEND_URL}/api/devices/${deviceId}`, updatedDevice, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(updateDevice(response.data));  // Assuming the response contains the updated device
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Delete a device
  export const deleteDevice = (deviceId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${BACKEND_URL}/api/devices/${deviceId}`);
      dispatch(removeDevice(deviceId));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };