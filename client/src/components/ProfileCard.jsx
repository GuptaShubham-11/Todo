import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { authAPI } from "../api/authAPI.js";
import { Alert, Loader } from "../components";

const ProfileCard = ({ user, loading, handleLogout }) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(user?.name || "Guest");
    const [message, setMessage] = useState(null);
    const [loadingState, setLoadingState] = useState(false); // Loader for saving name

    // Toggle the edit name state
    const handleEditName = () => setEditName((prev) => !prev);

    // Handle name change
    const handleNameChange = (e) => setNewName(e.target.value);

    const handleSaveName = async () => {
        setLoadingState(true); // Show loader
        try {
            // Assuming the API expects an object { name: newName }
            const response = await authAPI.updateUserDetails({ name: newName });

            if (response.data.statusCode < 400) {
                setMessage({
                    text: "Name updated successfully.",
                    code: response.data.statusCode,
                });
                setEditName(false); // Close edit mode
            } else {
                setMessage({
                    text: response.data.message || "Server Error occurred!",
                    code: response.data.status || 500,
                });
            }
        } catch (error) {
            setMessage({
                text: "Error while updating name.",
                code: 500,
            });
        } finally {
            setLoadingState(false); // Hide loader
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    };

    return (
        <div className="relative w-full bg-gray-100 dark:bg-gray-800 shadow-2xl rounded-xl p-6">
            {message && (
                <Alert
                    message={message.text}
                    code={message.code}
                    onClose={() => setMessage(null)}
                />
            )}
            <div className="flex flex-col items-center mb-6">
                {/* Profile Image */}
                <div className="relative w-24 h-24">
                    <img
                        src={user?.profilePic || "/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <button
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full"
                        onClick={() => alert("Feature to change picture coming soon!")}
                    >
                        <FaEdit />
                    </button>
                </div>

                {/* User Name and Username */}
                <div className="mt-4 text-center">
                    {/* Name Editing */}
                    <div className="flex items-center justify-center">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mr-1">
                            {editName ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={handleNameChange}
                                    className="border-b-2 border-gray-500 focus:outline-none bg-transparent text-center text-gray-800 dark:text-gray-100"
                                    autoFocus
                                />
                            ) : (
                                newName
                            )}
                        </h2>

                        {/* Edit/Save Icon */}
                        <button
                            className="text-blue-500 ml-2"
                            onClick={editName ? handleSaveName : handleEditName}
                            disabled={loadingState} // Disable the button when loading
                        >
                            {loadingState ? <Loader /> : editName ? <FaSave /> : <FaEdit />}
                        </button>
                    </div>

                    {/* Username */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        @{user?.username || "Unknown"}
                    </p>
                </div>
            </div>

            {/* Logout Button */}
            <button
                className="w-full py-2 bg-red-500 dark:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                onClick={handleLogout}
                disabled={loading}
            >
                {loading ? <Loader /> : "Log Out"}
            </button>
        </div>
    );
};

export default ProfileCard;
