import React, { useState, useEffect, useRef } from "react";
import {
    AiOutlineHome,
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineQuestionCircle,
    AiOutlineCheckSquare,
    AiOutlineGithub,
    AiOutlineLinkedin
} from "react-icons/ai";
import { FaBullseye } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = ""; // Enable scrolling
        }
    };

    const closeSidebar = () => {
        setIsOpen(false);
        document.body.style.overflow = ""; // Enable scrolling
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const menuItems = [
        { icon: <AiOutlineHome />, label: "Dashboard", path: "/dashboard" },
        { icon: <AiOutlineCheckSquare />, label: "Tasks", path: "/tasks" },
        { icon: <FaBullseye />, label: "Focus Mode", path: "/focus-mode" },
        {
            icon: <AiOutlineGithub />,
            label: "GitHub",
            path: "https://github.com/GuptaShubham-11/Todo",
        },
        {
            icon: <AiOutlineLinkedin />,
            label: "LinkedIn",
            path: "https://www.linkedin.com/in/guptashubham11/",
        },
        {
            icon: <SiLeetcode />,
            label: "LeetCode",
            path: "https://leetcode.com/u/GuptaShubham-11/",
        },
        {
            icon: <AiOutlineQuestionCircle />,
            label: "Help (Discord)",
            path: "https://discord.gg/d2dPhDHN",
        },
    ];

    return (
        <>
            {/* Toggle Button */}
            <button
                className="absolute top-24 right-6 flex items-center justify-center w-12 h-12 
                           bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg 
                           hover:shadow-xl hover:scale-105 transition-all duration-300 z-50 focus:outline-none
                           dark:from-gray-600 dark:to-gray-800 dark:text-gray-200"
                onClick={toggleSidebar}
            >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-800 z-40 
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
                    <nav className="flex-1 mt-4 overflow-y-auto">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.path.startsWith("http") ? (
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center p-4 space-x-4 
                                                       hover:bg-gray-200 hover:rounded-xl transition-colors 
                                                       duration-300 dark:hover:bg-gray-700"
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-sm text-gray-600 group-hover:font-bold 
                                                             dark:text-gray-400 dark:group-hover:text-gray-200">
                                                {item.label}
                                            </span>
                                        </a>
                                    ) : (
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
                                    )}
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
        </>
    );
}
