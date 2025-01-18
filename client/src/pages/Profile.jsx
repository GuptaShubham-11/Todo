import React, { useState } from "react";
import { Sidebar } from "../components";

const Profile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        username: "johndoe",
        country: "United States",
        profilePic: "/default-avatar.png",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleEditing = () => setIsEditing(!isEditing);

    const handleSave = () => {
        // Save user details logic
        setIsEditing(false);
    };

    const profileCompletion = 70; // Example progress percentage

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            <Sidebar />
            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src={user.profilePic}
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-4 border-blue-500 dark:border-gray-700 shadow-lg object-cover"
                            />
                            {isEditing && (
                                <label
                                    htmlFor="profilePic"
                                    className="absolute bottom-0 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow cursor-pointer transition"
                                >
                                    ✏️
                                    <input
                                        type="file"
                                        id="profilePic"
                                        className="hidden"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                profilePic: URL.createObjectURL(e.target.files[0]),
                                            })
                                        }
                                    />
                                </label>
                            )}
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                                />
                            ) : (
                                user.name
                            )}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={user.country}
                                    onChange={(e) => setUser({ ...user, country: e.target.value })}
                                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                                />
                            ) : (
                                user.country
                            )}
                        </p>
                    </div>

                    {/* Profile Completion */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Profile Completion: {profileCompletion}%
                        </p>
                        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${profileCompletion}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="mb-6">
                        <label className="block text-gray-800 dark:text-gray-100 font-semibold mb-2">
                            Change Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                                placeholder="Enter new password"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-between">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={toggleEditing}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
