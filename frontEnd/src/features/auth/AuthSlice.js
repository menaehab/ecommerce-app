import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getStoredUser = () => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const token = Cookies.get('token') || null;
    return { user, token };
};

const initialState = {
    user: getStoredUser().user,
    token: getStoredUser().token,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.token;
            state.error = null;
            Cookies.set('user', JSON.stringify(action.payload));
            Cookies.set('token', action.payload.token);
        },
        login: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.token;
            state.error = null;
            Cookies.set('user', JSON.stringify(action.payload));
            Cookies.set('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            Cookies.remove('user');
            Cookies.remove('token');
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.token = null;
        },
    },
});

export const { register, login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
