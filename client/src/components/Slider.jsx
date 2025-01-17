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
        <div className="relative w-full max-w-lg mx-auto overflow-hidden">
            <h2 className="text-lg mb-2 text-center text-secondary dark:text-secondary-dark">Why Choose Us ?</h2>
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
                    width: `${items.length * 100}%`,
                }}
            >
                {items.map((item, index) => (
                    <div key={index} className="w-full h-56 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded shadow-lg">
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition duration-300"
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition duration-300"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Slider;
