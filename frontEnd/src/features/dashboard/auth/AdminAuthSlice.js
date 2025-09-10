import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getStoredAuth = () => {
    let admin = null;
    const storedAdmin = Cookies.get("admin");
    const adminToken = Cookies.get("admin-token") || null;
  
    try {
      admin = storedAdmin ? JSON.parse(storedAdmin) : null;
    } catch {
      admin = null;
      Cookies.remove("admin");
    }
  
    return { admin, adminToken };
  };
  

const initialState = {
    admin: getStoredAuth().admin,
    adminToken: getStoredAuth().adminToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.admin = action.payload.admin;
            state.adminToken = action.payload.adminToken;
            state.error = null;
            Cookies.set("admin", JSON.stringify(action.payload.admin));
            Cookies.set("admin-token", action.payload.adminToken);
        },
        logout: (state) => {
            state.admin = null;
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
