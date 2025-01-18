import React from "react";

const Button = ({ text, onClick, type = "button", className = "", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-primary text-white py-2 rounded-lg shadow hover:bg-opacity-90 dark:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
