import React, { useState } from "react";

const Slider = () => {
    const items = [

        <div className="p-6 bg-gradient-to-r from-teal-100 via-white to-teal-50 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-3">
                Focus Mode
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
                Filter and display only uncompleted todos to stay focused.
            </p>
        </div>,

        <div className="p-6 bg-gradient-to-r from-pink-100 via-white to-pink-50 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-3">
                Track Progress
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
                View your task progress and recent activities.
            </p>
        </div>,

        <div className="p-6 bg-gradient-to-r from-rose-100 via-white to-rose-50 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-3">
                Analytics
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
                Gain insights into your productivity & efficiency.
            </p>
        </div>,

        <div className="p-6 bg-gradient-to-r from-indigo-100 via-white to-indigo-50 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                Manage Todos
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
                Add, edit, delete, and toggle your todos effortlessly.
            </p>
        </div>,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-400 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-xl">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-center text-secondary dark:text-secondary-dark tracking-wide">
                Why Choose Us?
            </h2>
            {/* Slider Content */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
                    width: `${items.length * 100}%`,
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center justify-center rounded-lg hover:scale-105 transition-transform duration-500"
                    >
                        {item}
                    </div>
                ))}
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md hover:bg-gradient-to-l hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className="px-6 py-2 bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md hover:bg-gradient-to-l hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Slider;
