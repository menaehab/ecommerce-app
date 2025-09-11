import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
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
      state.categories = action.payload;
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map((category) =>
        category.slug === action.payload.slug ? action.payload : category
      );
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
  updateCategory,
  deleteCategory,
  setError,
} = categorySlice.actions;
export default categorySlice.reducer;
