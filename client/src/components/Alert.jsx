import React from "react";

const Alert = ({ message, code, onClose }) => {
    const type = code >= 400 ? "danger" : "success"; // Determine the alert type based on the code
    const bgColor = {
        success: "bg-green-100 text-green-800 border-green-500",
        danger: "bg-red-100 text-red-800 border-red-500",
    }[type];

    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border-l-4 ${bgColor}`}
            role="alert"
        >
            <span className="flex-1">{type === "success" ? message + " Redirecting to dashboard..." : message}</span>
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
