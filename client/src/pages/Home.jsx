import React, { useState, useEffect } from "react";
import { Slider } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
            {/* Moving pointer effect */}
            <div
                className="absolute w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 pointer-events-none transition-transform duration-200 ease-out"
                style={{
                    transform: `translate(${cursorPosition.x - 90}px, ${cursorPosition.y - 90}px)`,
                }}
            ></div>

            <div className="mb-12 text-center space-y-6 relative z-10">
                <h1 className="text-4xl font-extrabold text-primary dark:text-primary-dark">
                    Welcome to Todo App
                </h1>
                <p className="text-lg max-w-md mx-auto text-secondary dark:text-secondary-dark">
                    Manage your tasks effectively and stay productive with our user-friendly Todo app.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 shadow-md dark:bg-primary-dark"
                        aria-label="Go to Login Page"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 rounded-lg bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-white"
                        aria-label="Go to Register Page"
                    >
                        Register
                    </Link>
                </div>
            </div>

            {/* Slider Component */}
            <div className="w-full max-w-lg relative z-10">
                <Slider />
            </div>
        </div>
    );
};

export default Home;
