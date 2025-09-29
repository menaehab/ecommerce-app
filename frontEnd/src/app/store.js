import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/store/auth/UserAuthSlice'
import adminAuthReducer from '../features/dashboard/auth/AdminAuthSlice'
import categoryReducer from '../features/dashboard/categories/AdminCategorySlice'
import { injectStore as injectUserStore } from '../api/apiUser';
import { injectStore as injectAdminStore } from '../api/apiAdmin';

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    category: categoryReducer,
  },
})

// Inject the store into both API configurations
injectUserStore(store);
injectAdminStore(store);

export { store };