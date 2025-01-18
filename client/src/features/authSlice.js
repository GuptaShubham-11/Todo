import { createSlice } from '@reduxjs/toolkit';

const initialStatus = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: { auth: initialStatus },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
