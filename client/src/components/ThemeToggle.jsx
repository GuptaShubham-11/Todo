import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice.js';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded border border-gray-300 dark:border-gray-700"
        >
            {theme === 'light' ? '🌙' : '😎'}
        </button>
    );
};

export default ThemeToggle;
