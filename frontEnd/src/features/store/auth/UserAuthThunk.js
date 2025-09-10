import apiUser from '../../../api/apiUser';
import { register, login, logout, setError } from './UserAuthSlice';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log('Sending registration request with data:', userData);
    const response = await apiUser.post('/register', userData);
    console.log('Registration response:', response);
    dispatch(register({ user: response.data.data.user, userToken: response.data.data.token }));
    return { success: true };
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      request: error.request,
    });
    
    const payload = error?.response?.data?.errors || 
                  error?.response?.data?.message || 
                  error.message;
    dispatch(setError(payload));
    return { success: false, error: payload };
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    console.log('Sending login request with data:', userData);
    const response = await apiUser.post('/login', userData);
    console.log('Login response:', response.data);
    
    if (response.data && response.data.data) {
      const { user, token } = response.data.data;
      dispatch(login({ user, userToken: token }));
      return { success: true };
    }
    
    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Login error:', error);
    const payload = error?.response?.data?.errors || 
                  error?.response?.data?.message || 
                  error.message;
    dispatch(setError(payload));
    return { success: false, error: payload };
  }
};

// Logout user
export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { userToken } = getState().userAuth;
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
