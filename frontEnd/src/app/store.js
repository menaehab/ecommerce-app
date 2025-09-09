import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import { injectStore } from '../api/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Inject the store into the API configuration
injectStore(store);

export { store };