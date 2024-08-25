import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '@env'
import { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure } from './authSlice';

// Login action creator
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, userData);
    dispatch(loginSuccess(response.data));
    console.log('Login Successful:', response.data);

    await AsyncStorage.setItem('token', response?.data.token);

  } catch (error) {
    console.error('Login Error:', error);
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