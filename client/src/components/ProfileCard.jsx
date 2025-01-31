import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { authAPI } from "../api/authAPI.js";
import { Alert, Loader } from "../components";

const ProfileCard = ({ user, loading, handleLogout }) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(user?.name || "Guest");
    const [profilePic, setProfilePic] = useState(user?.profilePic || "/default-avatar.png");
    const [message, setMessage] = useState(null);
    const [loadingState, setLoadingState] = useState(false);

    // Toggle the edit name state
    const handleEditName = () => setEditName((prev) => !prev);

    // Handle name change
    const handleNameChange = (e) => setNewName(e.target.value);

    // Save new name to server
    const handleSaveName = async () => {
        setLoadingState(true);
        try {
            const response = await authAPI.updateUserDetails({ name: newName });

            if (response.data.statusCode < 400) {
                setMessage({ text: "Name updated successfully.", code: response.data.statusCode });
                localStorage.setItem("user", JSON.stringify(response.data.message));
                setEditName(false); // Close edit mode
            } else {
                setMessage({ text: response.data.message || "Server Error occurred!", code: response.data.status || 500 });
            }
        } catch (error) {
            setMessage({ text: "Error while updating name.", code: 500 });
        } finally {
            setLoadingState(false);
        }
    };

    // Save profile picture to server
    const handleSaveProfilePic = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            setLoadingState(true);
            const response = await authAPI.updateUserProfilePic(formData);

            if (response.data.statusCode < 400) {
                setMessage({ text: "Profile picture updated successfully.", code: response.data.statusCode });

                localStorage.setItem("user", JSON.stringify(response.data.message));

                // Update profile picture with new URL to force re-render
                setProfilePic(`${response.data.message.profilePic}?t=${new Date().getTime()}`);
            } else {
                setMessage({ text: response.data.message || "Server Error occurred!", code: response.data.status || 500 });
            }
        } catch (error) {
            setMessage({ text: "Error while updating profile picture.", code: 500 });
        } finally {
            setLoadingState(false);
        }
    };

    return (
        <div className="relative w-full bg-gray-100 dark:bg-gray-800 shadow-2xl rounded-xl p-6">
            {message && <Alert message={message.text} code={message.code} onClose={() => setMessage(null)} />}

            <div className="flex flex-col items-center mb-6">
                {/* Profile Image */}
                <div className="relative w-24 h-24">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                        <FaEdit />
                        <input type="file" accept="image/*" className="hidden" onChange={handleSaveProfilePic} />
                    </label>
                </div>

                {/* User Name and Username */}
                <div className="mt-4 text-center">
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
                        <button className="text-blue-500 ml-2" onClick={editName ? handleSaveName : handleEditName} disabled={loadingState}>
                            {loadingState ? <Loader /> : editName ? <FaSave /> : <FaEdit />}
                        </button>
                    </div>

                    {/* Username */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">@{user?.username || "Unknown"}</p>
                </div>
            </div>

            {/* Logout Button */}
            <button
                className="w-full py-2 bg-red-500 dark:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:dark:ring-blue-300 transition duration-300"
                onClick={handleLogout}
                disabled={loading}
            >
                {loading ? <Loader /> : "Log Out"}
            </button>
        </div>
    );
};

export default ProfileCard;
