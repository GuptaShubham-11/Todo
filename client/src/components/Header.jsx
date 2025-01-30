import { ThemeToggle } from './index.js';
import NewTodoLogo from '../assets/NewTodoLogo.png';
import { useState, useEffect } from 'react';

const Header = () => {
    const [star, setStar] = useState(0);

    // Initialize star count from localStorage
    useEffect(() => {
        const stared = localStorage.getItem("stared") === "true";
        setStar(stared ? 1 : 0);
    }, []);

    const toggleStar = () => {
        setStar(prev => {
            const newStar = prev === 0 ? 1 : 0;
            localStorage.setItem("stared", newStar === 1 ? "true" : "false");
            return newStar;
        });
    };

    return (
        <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center flex-wrap">
            <img src={NewTodoLogo} alt="Logo" className="h-14 w-auto sm:h-12" />
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                {/* Theme Toggle */}
                <ThemeToggle />
                <button
                    onClick={toggleStar}
                    className="p-2 px-4 rounded outline-none cursor-pointer border border-gray-300 dark:border-gray-700 font-bold"
                >
                    {star} 🌟
                </button>
            </div>
        </header>
    );
};

export default Header;
