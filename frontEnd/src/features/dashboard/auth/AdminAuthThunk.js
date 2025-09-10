import apiAdmin from '../../../api/apiAdmin';
import { login, logout, setError } from './AdminAuthSlice';

// Login admin
export const loginAdmin = (userData) => async (dispatch) => {
  try {
    console.log('Sending admin login request with data:', userData);
    const response = await apiAdmin.post('/login', userData);
    console.log('Admin login response:', response.data);
    
    if (response.data && response.data.data) {
      const { user, token } = response.data.data;
      dispatch(login({ admin: user, adminToken: token }));
      return { success: true };
    }
    
    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Admin login error:', error);
    const payload = error?.response?.data?.errors || 
                  error?.response?.data?.message || 
                  error.message;
    dispatch(setError(payload));
    return { success: false, error: payload };
  }
};

// Logout admin
export const logoutAdmin = () => async (dispatch, getState) => {
  try {
    const { adminToken } = getState().adminAuth;
    if (adminToken) {
      await apiAdmin.post('/logout', {}, {
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
