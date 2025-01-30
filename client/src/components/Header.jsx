import { ThemeToggle } from './index.js';
import NewTodoLogo from '../assets/NewTodoLogo.png';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Header = () => {
    const [isStarred, setIsStarred] = useState(false);
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);

    // Load star status from localStorage
    useEffect(() => {
        const savedStatus = localStorage.getItem("stared") === "true";
        setIsStarred(savedStatus);
    }, []);

    const toggleStar = () => {
        const newStatus = !isStarred;
        setIsStarred(newStatus);
        localStorage.setItem("stared", newStatus.toString());

        if (newStatus) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3s
        }
    };

    return (
        <>
            {/* 🎉 Confetti Effect (only when starred) */}
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={150} recycle={false} />}

            <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex justify-between items-center flex-wrap">
                <img src={NewTodoLogo} alt="Logo" className="h-14 w-auto sm:h-12" />
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <ThemeToggle />
                    <button
                        onClick={toggleStar}
                        className="p-2 px-4 rounded outline-none cursor-pointer border border-gray-300 dark:border-gray-700 font-bold"
                    >
                        {isStarred ? "⭐ Starred" : "☆ Star"}
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
