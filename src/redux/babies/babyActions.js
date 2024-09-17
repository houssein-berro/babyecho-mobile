import axios from 'axios';
import { addBabyStart, addBabySuccess, addBabyFailure } from './babySlice';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addBabyToUser = (userId, babyData) => async (dispatch) => {    
  dispatch(addBabyStart());
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/users/add-baby/${userId}`,
      babyData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(addBabySuccess(response.data));
  } catch (error) {
    dispatch(addBabyFailure(error.response?.data?.message || error.message || 'Failed to add baby'));
  }
};
