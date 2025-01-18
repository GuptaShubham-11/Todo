import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice.js"; // Logout action from authSlice
import { Sidebar, Alert, ProfileCard } from "../components"; // Import necessary components

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user); // User data from Redux
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Authentication state
    const [message, setMessage] = useState(null); // State for alert messages
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    // Handle logout action
    const handleLogout = () => {
        setLoading(true);
        dispatch(logout());
        navigate("/login", { replace: true }); // Redirect after logout
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-transparent dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 transition-transform">
                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-8">
                    <ProfileCard user={user} loading={loading} handleLogout={handleLogout} />

                </div>

                {/* Dashboard Content */}
                <div className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Recent Activities
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="text-gray-700 dark:text-gray-300">
                                ✅ Completed Task: Build Authentication API
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <span className="text-gray-700 dark:text-gray-300">
                                ✨ Added new feature: User Dashboard
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            <span className="text-gray-700 dark:text-gray-300">
                                🐞 Fixed bugs in the app's UI
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Display Alert Message */}
                {message && (
                    <Alert
                        message={message.message}
                        code={message.code}
                        onClose={() => setMessage(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
