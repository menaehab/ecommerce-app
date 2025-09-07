import api from '../../api/api';
import { register, login, logout, setError } from './AuthSlice';
import { useSelector } from 'react-redux';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/register', userData);
    const userWithToken = { ...response.data.user, token: response.data.token };
    dispatch(register(userWithToken));
    return userWithToken;
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
    return payload;
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/login', userData);
    const userWithToken = { ...response.data.user, token: response.data.token };
    dispatch(login(userWithToken));
    return userWithToken;
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
    return payload;
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    const token = useSelector((state) => state.auth.token);
    await api.post('/logout',{}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(logout());
    return true;
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
    return false;
  }
};