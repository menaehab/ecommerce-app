import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getStoredAuth = () => {
    let user = null;
    const storedUser = Cookies.get("user");
    const userToken = Cookies.get("user-token") || null;
  
    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      user = null;
      Cookies.remove("user");
    }
  
    return { user, userToken };
  };
  

const initialState = {
    user: getStoredAuth().user,
    userToken: getStoredAuth().userToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload.user;
            state.userToken = action.payload.token;
            state.error = null;
            Cookies.set("user", JSON.stringify(action.payload.user));
            Cookies.set("user-token", action.payload.token);
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.userToken = action.payload.token;
            state.error = null;
            Cookies.set("user", JSON.stringify(action.payload.user));
            Cookies.set("user-token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.userToken = null;
            state.error = null;
            Cookies.remove("user");
            Cookies.remove("user-token");
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { register, login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
