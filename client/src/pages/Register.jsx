import React, { useState } from "react";
import { Button, InputField, Alert, Loader } from "../components";
import { authAPI } from "../api/authAPI.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        profilePic: null,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // 2MB limit
            setMessage({ message: "File size should not exceed 2MB", code: 400 });
            return;
        }
        setFormData({ ...formData, [e.target.name]: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.username || !formData.password) {
            setMessage({ message: "All fields are required!", code: 400 });
            return;
        }
        setMessage(null);
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("username", formData.username);
            data.append("password", formData.password);
            if (formData.profilePic) data.append("profilePic", formData.profilePic);

            const response = await authAPI.registerUser(data);
            setLoading(false);
            setMessage({
                message: response?.data?.message || response?.data,
                code: response?.status || response?.statusCode,
            });

            if (response?.statusCode < 400) {
                navigate("/login", { replace: true });
            }
        } catch (err) {
            setLoading(false);
            setMessage({
                message: err.response?.data?.message || "Registration failed!",
                code: err.response?.status || 500,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Register</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Profile Picture"
                        type="file"
                        name="profilePic"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                    {loading ? (
                        <div className="flex justify-center mt-4">
                            <Loader />
                        </div>
                    ) : (
                        <Button text="Register" type="submit" className="mt-4 w-full" />
                    )}
                </form>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary dark:text-primary-dark hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
            {message && (
                <Alert
                    message={message.message}
                    type={message.code < 400 ? "success" : "error"}
                    onClose={() => setMessage(null)}
                />
            )}
        </div>
    );
};

export default Register;
