import apiUser from '../../../api/apiUser';
import { login, logout, setError } from './AdminAuthSlice';

// Login admin
export const loginAdmin = (userData) => async (dispatch) => {
  try {
    const { data } = await apiUser.post('/login', userData);
    dispatch(login({ user: data.data.user, token: data.data.token }));
  } catch (error) {
    const payload = error?.response?.data?.errors || error.message;
    dispatch(setError(payload));
  }
};

// Logout admin
export const logoutAdmin = () => async (dispatch, getState) => {
  try {
    const { adminToken } = getState().auth;
    if (adminToken) {
      await apiUser.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
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
