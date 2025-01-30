import { ThemeToggle } from './index.js';
import NewTodoLogo from '../assets/NewTodoLogo.png';
import { useState } from 'react';

const Header = () => {

    const [star, setStar] = useState(0);

    const fetchStar = () => {
        const stared = localStorage.getItem("stared") || "false";
        if (stared === "true") {
            setStar(star - 1);
            localStorage.setItem("stared", "false");
        } else {
            setStar(star + 1);
            localStorage.setItem("stared", "true");
        }
    }

    return (
        <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center flex-wrap">
            <img src={NewTodoLogo} alt="Logo" className="h-14 w-auto sm:h-12" />
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                {/* Theme Toggle */}
                <ThemeToggle />
                <button
                    onClick={() => (fetchStar())}
                    className="p-2 px-4 rounded outline-none cursor-pointer border border-gray-300 dark:border-gray-700 font-bold"
                >
                    {star} 🌟
                </button>
            </div>
        </header>
    );
};

export default Header;
