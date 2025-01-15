import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice.js";
import { useEffect } from "react";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        // Update Redux state
        dispatch(toggleTheme());

        // Persist the new theme in localStorage
        localStorage.setItem("theme", newTheme);

        // Apply the theme class to the <html> element
        const root = document.documentElement;
        root.classList.remove(theme); // Remove the current theme class
        root.classList.add(newTheme); // Add the new theme class
    };

    // Apply the theme on component mount (for page refreshes)
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";

        // Update the <html> element's class on mount
        const root = document.documentElement;
        root.classList.add(savedTheme);

        // Sync the Redux state with the localStorage value
        if (theme !== savedTheme) {
            dispatch(toggleTheme());
        }
    }, [theme, dispatch]);

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded border border-gray-300 dark:border-gray-700"
        >
            {theme === "dark" ? "🌙 Dark Mode" : "😎 Light Mode"}
        </button>
    );
};

export default ThemeToggle;
