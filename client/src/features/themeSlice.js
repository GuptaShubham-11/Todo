import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem('theme') || 'light', // Persist theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            document.documentElement.classList.toggle('dark', state.theme === 'dark');
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
