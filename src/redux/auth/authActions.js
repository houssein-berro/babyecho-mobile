import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure } from './authSlice';

// Login action creator
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`, userData);
    console.log('1222222222',process.env);
    
    dispatch(loginSuccess(response.data));
    console.log(response.data);

    await AsyncStorage.setItem('token', response?.data.token);
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message || "Login failed"));
  }
};

// Signup action creator
export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/signup`, userData);
    dispatch(signupSuccess(response.data));
    await AsyncStorage.setItem('token', response?.data.token);
  } catch (error) {
    dispatch(signupFailure(error.response?.data?.message || error.message || "Signup failed"));
  }
}; 
