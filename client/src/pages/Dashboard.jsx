import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice.js"; // Logout action from authSlice
import { Sidebar, Alert, ProfileCard } from "../components"; // Import necessary components
import TaskProgress from "../components/TaskProgress.jsx";
import RecentActivities from "../components/RecentActivities.jsx"; // Import the new RecentActivities component

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
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 transition-transform">
                {/* Profile Section and Task Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {/* ProfileCard */}
                    <ProfileCard user={user} loading={loading} handleLogout={handleLogout} />
                    {/* TaskProgress */}
                    <TaskProgress completedTasks={6} totalTasks={13} />
                </div>

                {/* Dashboard Content */}
                <div className="mt-8 rounded-xl p-6">
                    {/* Recent Activities Section */}
                    <RecentActivities />
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
