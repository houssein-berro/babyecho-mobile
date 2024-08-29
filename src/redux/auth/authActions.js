import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  signupStart, 
  signupSuccess, 
  signupFailure,
  addBabyStart,
  addBabySuccess,
  addBabyFailure
} from './authSlice';

// Login action creator
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, userData);
    dispatch(loginSuccess(response.data));
    await AsyncStorage.setItem('token', response?.data.token);
    return true;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message || "Login failed"));
    return false;
  }
};

// Signup action creator
export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, userData);
    dispatch(signupSuccess(response.data));
    await AsyncStorage.setItem('token', response?.data.token);
  } catch (error) {
    dispatch(signupFailure(error.response?.data?.message || error.message || "Signup failed"));
  }
};

// Validate token action creator
export const validateToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await axios.get(`${BACKEND_URL}/api/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(loginSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(loginFailure("Invalid token or session expired."));
    return false;
  }
};

// Add baby action creator
export const addBabyToUser = (userId, babyData) => async (dispatch) => {
  console.log(userId);
  console.log(babyData);
  
  
  dispatch(addBabyStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/add-baby/${userId}`, babyData);
    dispatch(addBabySuccess(response.data));
  } catch (error) {
    dispatch(addBabyFailure(error.response?.data?.message || error.message || "Failed to add baby"));
  }
};
