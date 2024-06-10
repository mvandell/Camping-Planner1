import { createSlice } from '@reduxjs/toolkit';
import api from './api';
import store from './store';

function storeToken(state, { payload }) {
    state.token = payload.token;
    window.localStorage.setItem("token", payload.token);
    if (payload.isAdmin) {
        window.localStorage.setItem("admin", true)
    }
}
// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.localStorage.getItem("token") ?? null,
        admin: window.localStorage.getItem("admin") ?? false
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(
            api.endpoints.logout.matchFulfilled, (state) => {
                state.token = null;
            state.admin = false;
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("admin");
            });
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;