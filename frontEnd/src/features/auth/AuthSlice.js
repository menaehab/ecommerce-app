import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getStoredAuth = () => {
    let user = null;
    const storedUser = Cookies.get("user");
    const token = Cookies.get("token") || null;
  
    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      user = null;
      Cookies.remove("user");
    }
  
    return { user, token };
  };
  

const initialState = {
    user: getStoredAuth().user,
    token: getStoredAuth().token,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            Cookies.set("user", JSON.stringify(action.payload.user));
            Cookies.set("token", action.payload.token);
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            Cookies.set("user", JSON.stringify(action.payload.user));
            Cookies.set("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            Cookies.remove("user");
            Cookies.remove("token");
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { register, login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
