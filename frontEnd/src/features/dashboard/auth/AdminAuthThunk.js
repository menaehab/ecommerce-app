import apiAdmin from '../../../api/apiAdmin';
import { login, logout, setError, setAdmin } from './AdminAuthSlice';

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

// Get admin - using the unified /user endpoint with admin token
export const getAdmin = () => async (dispatch, getState) => {
  try {
    const { adminToken } = getState().adminAuth;
    
    if (!adminToken) {
      return { success: false, error: 'No token found' };
    }

    // Use apiAdmin which automatically includes the admin token
    // The Laravel backend will detect it's an admin token and return admin data
    // Note: Using relative path '../user' to go to /api/user instead of /api/admin/user
    const { data } = await apiAdmin.get('/../user', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    // The response structure is { success: true, data: { user: {...}, guard: 'admin' } }
    dispatch(setAdmin({ admin: data.data.user }));
    return { success: true };
  } catch (error) {
    // Error handling is done by the interceptor in apiAdmin
    return handleError(error, dispatch);
  }
};

// Helper to handle errors
const handleError = (error, dispatch) => {
  const payload = error?.response?.data?.message || error?.response?.data?.errors;
  dispatch(setError(payload));
  return { success: false, error: payload };
};