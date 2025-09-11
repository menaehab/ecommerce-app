import apiUser from '../../../api/apiUser';
import { register, login, logout, setError } from './UserAuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await apiUser.post('/register', userData);
    dispatch(register({ user: data.data.user, userToken: data.data.token }));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await apiUser.post('/login', userData);
    dispatch(login({ user: data.data.user, userToken: data.data.token }));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

// Logout user
export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { userToken } = getState().userAuth;
    if (userToken) {
      await apiUser.post('/logout', {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
    }
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(logout());
  }
};

// Helper to handle errors
const handleError = (error, dispatch) => {
  const payload = error?.response?.data?.errors || 
                  error?.response?.data?.message || 
                  error.message;
  dispatch(setError(payload));
  return { success: false, error: payload };
};