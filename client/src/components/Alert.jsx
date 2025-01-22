import React, { useEffect } from "react";

const Alert = ({ message, code, onClose }) => {
    const type = code < 400 ? "success" : "danger";
    // Determine the alert type based on the code

    const bgColor = {
        success: "bg-green-100 text-green-800 border-green-500",
        danger: "bg-red-100 text-red-800 border-red-500",
    }[type];

    // Automatically close the alert after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Close after 3 seconds

        return () => clearTimeout(timer); // Clean up timer on component unmount
    }, [onClose]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border-l-4 ${bgColor} transition-all duration-300 ease-in-out transform`}
            role="alert"
        >
            <span className="flex-1">{message}</span>
            <button
                className="ml-4 text-lg font-bold text-gray-500 hover:text-gray-800"
                onClick={onClose}
            >
                &times;
            </button>
        </div>
    );
};

export default Alert;
