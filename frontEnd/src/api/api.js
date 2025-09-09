import axios from 'axios';
import { logout } from '../features/auth/AuthSlice';

// Create axios instance without interceptors first
const api = axios.create({
  baseURL: 'http://ecommerce-app.test/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// This will be set when the store is available
let store;

export const injectStore = (_store) => {
  store = _store;
  
  // Add request interceptor to include the auth token
  api.interceptors.request.use(
    (config) => {
      const { token } = store.getState().auth;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle 401 Unauthorized responses
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // If we get a 401, dispatch logout action
        store.dispatch(logout());
        // Redirect to login page
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default api;
