import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure } from './authSlice';

// Login action creator
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`, userData);
    dispatch(loginSuccess(response.data));
    console.log(response.data);

    await AsyncStorage.setItem('token', response?.data.token);
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message || "Login failed"));
  }
};
