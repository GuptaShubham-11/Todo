import React, { useState } from "react";

const Slider = ({ items }) => {
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
