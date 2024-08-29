import axios from 'axios';
import { addBabyStart, addBabySuccess, addBabyFailure } from './babySlice';
import { BACKEND_URL } from '@env';

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
  
