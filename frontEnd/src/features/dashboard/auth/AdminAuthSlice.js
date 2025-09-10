import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getStoredAuth = () => {
    let user = null;
    const storedUser = Cookies.get("admin");
    const adminToken = Cookies.get("admin-token") || null;
  
    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      user = null;
      Cookies.remove("admin");
    }
  
    return { user, adminToken };
  };
  

const initialState = {
    user: getStoredAuth().user,
    adminToken: getStoredAuth().adminToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.adminToken = action.payload.token;
            state.error = null;
            Cookies.set("admin", JSON.stringify(action.payload.user));
            Cookies.set("admin-token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.adminToken = null;
            state.error = null;
            Cookies.remove("admin");
            Cookies.remove("admin-token");
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { register, login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
