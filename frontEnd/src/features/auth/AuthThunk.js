import api from '../../api/api';
import { register, login, logout } from './AuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    await api.get('/register');
    const response = await api.post('/register', userData);
    dispatch(register(response.data.user));
  } catch (error) {
    console.error(error.response.data);
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    await api.get('/login');
    const response = await api.post('/login', userData);
    dispatch(login(response.data.user));
  } catch (error) {
    console.error(error.response.data);
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await api.post('/logout');
    dispatch(logout());
  } catch (error) {
    console.error(error.response.data);
  }
};