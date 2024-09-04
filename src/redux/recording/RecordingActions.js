import axios from 'axios';
import { uploadStart, uploadSuccess, uploadFailure } from './recordingSlice';
import { BACKEND_URL, ML_URL } from '@env';  // ML_URL is not needed here, Node.js will handle it

export const uploadRecording = (formData) => async (dispatch) => {
  dispatch(uploadStart());

  try {
    // Upload the recording to the backend
    const response = await axios.post(`${BACKEND_URL}/api/recordings`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { recordingId } = response.data; 
    // Accessing the "audioFile" field
    const audioFileField = formData._parts.find(part => part[0] === 'audioFile');

    if (!audioFileField) {
      throw new Error('audioFile field not found in formData');
    }

    const audioFile = audioFileField[1];  // Get the audio file object

    // Create a new FormData for the ML server
    const mlFormData = new FormData();
    mlFormData.append('file', {
      uri: audioFile.uri,
      name: audioFile.name,
      type: audioFile.type,
    });

    // Send the file to the ML server
    const MLresponse = await axios.post(`${ML_URL}/upload`, mlFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await axios.put(`${BACKEND_URL}/api/recordings/${recordingId}/analysis`, {
      resultDetails: MLresponse.data.prediction,
    });
    // Dispatch success action with the recording data and prediction from ML server

    dispatch(uploadSuccess({ mlPrediction: MLresponse?.data?.prediction }));
    return MLresponse.data.prediction;  
  } catch (error) {
    // console.error('Error uploading recording:', error);
    dispatch(uploadFailure(error.message));
  }
};
