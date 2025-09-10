import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/store/auth/UserAuthSlice'
import adminAuthReducer from '../features/dashboard/auth/AdminAuthSlice'
import { injectStore } from '../api/apiUser';

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
  },
})

// Inject the store into the API configuration
injectStore(store);

export { store };