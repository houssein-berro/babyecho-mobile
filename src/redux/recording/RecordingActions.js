import axios from 'axios';
import { uploadStart, uploadSuccess, uploadFailure } from './recordingSlice';
import { BACKEND_URL } from '@env';

export const uploadRecording = (formData) => async (dispatch) => {
    dispatch(uploadStart()); // Dispatch the plain object to indicate loading
    console.log('a',formData);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/recordings`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(uploadSuccess(response.data)); // Dispatch the plain object with the response data
      console.log('actiomn',formData);
      console.log('success');
      
      
    } catch (error) {
      dispatch(uploadFailure(error.message)); // Dispatch the plain object with the error message
    }
  };