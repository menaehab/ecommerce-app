import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/store/auth/UserAuthSlice'
import adminAuthReducer from '../features/dashboard/auth/AdminAuthSlice'
import categoryReducer from '../features/dashboard/categories/AdminCategorySlice'
import { injectStore } from '../api/apiUser';

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    category: categoryReducer,
  },
})

// Inject the store into the API configuration
injectStore(store);

export { store };