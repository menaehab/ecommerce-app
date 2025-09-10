import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/store/auth/UserAuthSlice'
import { injectStore } from '../api/apiUser';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Inject the store into the API configuration
injectStore(store);

export { store };