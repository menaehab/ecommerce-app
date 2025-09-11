import apiAdmin from '../../../api/apiAdmin';
import { createCategory, setCategory, showCategory, updateCategory, deleteCategory, setError } from './AdminCategorySlice';

export const fetchCategoriesThunk = (page = 1) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.get(`/categories?page=${page}`);
    dispatch(setCategory(data));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

export const createCategoryThunk = (categoryData) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.post('/categories', categoryData);
    dispatch(createCategory(data.data));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

export const fetchCategoryThunk = (slug) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.get(`/categories/${slug}`);
    dispatch(showCategory(data.data));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

export const updateCategoryThunk = (categoryData) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.put(`/categories/${categoryData.slug}`, { name: categoryData.name });
    dispatch(updateCategory(data.data));
    return { success: true, payload: data.data };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

export const deleteCategoryThunk = (categoryData) => async (dispatch) => {
  try {
    const { data } = await apiAdmin.delete(`/categories/${categoryData.slug}`);
    dispatch(deleteCategory(data.data));
    return { success: true };
  } catch (error) {
    return handleError(error, dispatch);
  }
};

// Helper to handle errors
const handleError = (error, dispatch) => {
  const payload = error?.response?.data?.errors;
  dispatch(setError(payload));
  return { success: false, error: payload };
};