import apiAdmin from '../../../api/apiAdmin';
import { login, logout, setError } from './AdminAuthSlice';

// Login admin
export const loginAdmin = (adminData) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.post('/login', adminData);
    dispatch(login({ admin: data.data.user, adminToken: data.data.token }));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

// Logout admin
export const logoutAdmin = () => async (dispatch, getState) => {
  try {
    const { adminToken } = getState().adminAuth;
    if (adminToken) {
      await apiAdmin.post('/logout', {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
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
  const payload = error?.response?.data?.errors;
  dispatch(setError(payload));
  return { success: false, error: payload };
};