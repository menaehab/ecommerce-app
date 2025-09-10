import apiUser from '../../../api/apiUser';
import { register, login, logout, setError } from './UserAuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await apiUser.post('/register', userData);
    dispatch(register({ user: data.data.user, userToken: data.data.token }));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }

};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await apiUser.post('/login', userData);
    dispatch(login({ user: data.data.user, userToken: data.data.token }));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};

// Logout user
export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { userToken } = getState().auth;
    if (userToken) {
      await apiUser.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
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
