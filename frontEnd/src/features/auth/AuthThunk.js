import api from '../../api/api';
import { register, login, logout, setError } from './AuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await api.post('/register', userData);

    // Assume data contains user and token
    const userWithToken = { ...data.user, token: data.token };
    dispatch(register(userWithToken));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/login', userData);
    const userWithToken = { ...response.data.user, token: response.data.token };
    dispatch(login(userWithToken));
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
          'Content-Type': 'application/json'
        }
      });
    }
    dispatch(logout());
  } catch (error) {
    // Even if the API call fails, we still want to clear the local auth state
    dispatch(logout());
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};