import React, { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineQuestionCircle,
    AiOutlineCheckSquare,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { icon: <AiOutlineHome />, label: "Dashboard", path: "/dashboard" },
        { icon: <AiOutlineCheckSquare />, label: "Tasks", path: "/tasks" },
        { icon: <AiOutlineUser />, label: "Profile", path: "/profile" },
        { icon: <AiOutlineSetting />, label: "Settings", path: "/settings" },
        { icon: <AiOutlineQuestionCircle />, label: "Help", path: "/help" }, // Updated icon
    ];

    return (
        <>
            {/* Toggle Button */}
            <div>
                <button
                    className="absolute top-24 right-6 flex items-center justify-center w-12 h-12 
                               bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg 
                               hover:shadow-xl hover:scale-105 transition-all duration-300 z-40 focus:outline-none
                               dark:from-gray-600 dark:to-gray-800 dark:text-gray-200"
                    onClick={toggleSidebar}
                >
                    {isOpen ? (
                        <AiOutlineClose size={24} />
                    ) : (
                        <AiOutlineMenu size={24} />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className="relative min-h-screen flex">
                <div
                    className={`fixed top-0 left-0 h-full w-64 z-20 bg-gray-100 text-gray-800 
                                transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
                                transition-transform duration-500 ease-in-out shadow-xl 
                                dark:bg-gray-800 dark:text-gray-200`}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo Section */}
                        <div className="p-6 text-center bg-gray-300 dark:bg-gray-900">
                            <h1 className="text-2xl font-bold tracking-wide">Todo</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex-1 mt-4">
                            <ul className="space-y-4">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.path}
                                            className="group flex items-center p-4 space-x-4 
                                                       hover:bg-gray-200 hover:rounded-xl transition-colors 
                                                       duration-300 dark:hover:bg-gray-700"
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-sm text-gray-600 group-hover:font-bold 
                                                             dark:text-gray-400 dark:group-hover:text-gray-200">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer Section */}
                        <div className="p-6 border-t border-gray-100 text-sm text-center bg-gray-300 
                                        dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">© 2025 Todo Inc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
