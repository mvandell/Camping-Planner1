import { createSlice } from '@reduxjs/toolkit';
import api from './api';
import store from './store';

function storeToken(state, { payload }) {
    state.token = payload.token;
    window.sessionStorage.setItem("token", payload.token);
    if (payload.isAdmin == true) {
        window.sessionStorage.setItem("admin", true);
        state.admin = true
    }
}
// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.sessionStorage.getItem("token") ?? null,
        admin: window.sessionStorage.getItem("admin") ?? false
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(
            api.endpoints.logout.matchFulfilled, (state) => {
                state.token = null;
            //state.admin = false;
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("admin");
            });
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;