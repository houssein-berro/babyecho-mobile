import axios from 'axios';
import {
  uploadStart,
  uploadSuccess,
  uploadFailure,
  fetchRecordingsStart,
  fetchRecordingsSuccess,
  fetchRecordingsFailure,
} from './recordingSlice';
import {BACKEND_URL, ML_URL, ESP_WS_URL} from '@env'; // ML_URL is not needed here, Node.js will handle it
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadRecording = formData => async dispatch => {
  dispatch(uploadStart());

  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/recordings`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const {recordingId} = response.data;
    const audioFileField = formData._parts.find(
      part => part[0] === 'audioFile',
    );

    if (!audioFileField) {
      throw new Error('audioFile field not found in formData');
    }

    const audioFile = audioFileField[1];
    const mlFormData = new FormData();
    mlFormData.append('file', {
      uri: audioFile.uri,
      name: audioFile.name,
      type: audioFile.type,
    });

    const MLresponse = await axios.post(`${ML_URL}/upload`, mlFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await axios.put(`${BACKEND_URL}/api/recordings/${recordingId}/analysis`, {
      resultDetails: MLresponse.data.prediction,
    });

    dispatch(uploadSuccess({mlPrediction: MLresponse?.data?.prediction}));
    if (MLresponse.data.prediction == 'tired') {
      sendTurnOffLedCommand();
    }
    return MLresponse.data.prediction;
  } catch (error) {
    dispatch(uploadFailure(error.message));
  }
};

const sendTurnOffLedCommand = () => {
  console.log(ESP_WS_URL);
  const socket = new WebSocket(ESP_WS_URL);

  socket.onopen = () => {
    console.log('Connected to ESP WebSocket');
    socket.send('LED_OFF');
  };

  socket.onerror = error => {
    console.log('WebSocket error:', error.message);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

export const fetchRecordingsByBaby = babyId => async dispatch => {
  dispatch(fetchRecordingsStart());
  const token = await AsyncStorage.getItem('token')
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/recordings/baby/${babyId}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      },
    );
    dispatch(fetchRecordingsSuccess(response.data));
  } catch (err) {
    dispatch(fetchRecordingsFailure(err.message));
  }
};
