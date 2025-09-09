import api from '../../api/api';
import { register, login, logout, setError } from './AuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await api.post('/register', userData);
    dispatch(register({ user: data.data.user, token: data.data.token }));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }

};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await api.post('/login', userData);
    dispatch(login({ user: data.data.user, token: data.data.token }));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};

// Logout user
export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (token) {
      await api.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
    }
    dispatch(logout());
  } catch (error) {
    dispatch(logout()); 
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};
