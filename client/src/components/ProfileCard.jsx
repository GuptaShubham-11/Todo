import React from "react";
import { Button, Loader } from "./"; // Assuming Button is a custom reusable component

const ProfileCard = ({ user, loading, handleLogout }) => {
    return (
        <div className="bg-gray-200 w-60 dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center mb-6">
                {/* Profile Image */}
                <div className="relative w-24 h-24">
                    <img
                        src={user?.profilePic || "/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
                    />
                </div>

                {/* User Details */}
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {`Welcome ${user?.name} !` || "Welcome, User"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Username: {user?.username || "unknown"}
                    </p>
                </div>
            </div>

            {/* Logout Button */}
            <Button
                text={loading ? <Loader /> : "Log Out"}
                onClick={handleLogout}
                className="w-full py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                disabled={loading}
            />
        </div>
    );
};

export default ProfileCard;
