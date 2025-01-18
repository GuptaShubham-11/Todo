import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice.js';
import authReducer from '../features/authSlice.js';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    },
});

export default store;
