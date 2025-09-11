import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: {},
  pagination: {
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  },
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setCategory: (state, action) => {
      state.categories = action.payload.data || [];
      state.pagination = action.payload.pagination;
    },
    showCategory: (state, action) => {
      state.category = action.payload;
    },
    updateCategory: (state, action) => {
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category.slug === updatedCategory.slug ? updatedCategory : category
      );
      if (state.category?.slug === updatedCategory.slug) {
        state.category = updatedCategory;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.slug !== action.payload.slug
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createCategory,
  setCategory,
  showCategory,
  updateCategory,
  deleteCategory,
  setError,
} = categorySlice.actions;
export default categorySlice.reducer;
