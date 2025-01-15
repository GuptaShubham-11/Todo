import React, { useState } from "react";
import { Button, InputField, Alert, Loader } from "../components";
import { registerUser } from "../api/authAPI.js";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        profilePic: null,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // Simplified state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); // Clear previous message
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("username", formData.username);
            data.append("password", formData.password);
            if (formData.profilePic) {
                data.append("profilePic", formData.profilePic);
            }

            const response = await registerUser(data);

            setLoading(false);
            setMessage({ message: response?.data?.message || response?.data, code: response?.status || response?.statusCode });

        } catch (err) {
            setLoading(false);
            setMessage({
                message: err.response.data || "Registration failed!",
                code: err.response.statusCode || 400,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="mb-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Register
                </h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                    />
                    <InputField
                        label="Profile Picture"
                        type="file"
                        name="profilePic"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {/* Show loader or button based on loading state */}
                    {loading ? (
                        <div className="flex justify-center mt-4">
                            <Loader /> {/* Simple visible loader */}
                        </div>
                    ) : (
                        <Button
                            text="Register"
                            type="submit"
                            className="mt-4"
                        />
                    )}
                </form>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-primary dark:text-primary-dark hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>

            {/* Alert Component */}
            {message && (
                <Alert
                    message={message.message}
                    code={message.code}
                    onClose={() => setMessage(null)}
                />
            )}
        </div>
    );
};

export default Register;
