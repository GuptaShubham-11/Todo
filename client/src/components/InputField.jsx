import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder, required = false, accept }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                required={required}
                accept={accept} // For file input
            />
        </div>
    );
};

export default InputField;
