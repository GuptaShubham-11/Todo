import { useState } from "react";
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
        const allowedTypes = ["image/jpeg", "image/png"];

        if (file && (!allowedTypes.includes(file.type) || file.size > 2 * 1024 * 1024)) {
            setMessage({ message: "Invalid file. Only JPG/PNG allowed under 2MB.", code: 400 });
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

            setMessage({
                message: response?.data?.data || response?.message || "Registered successfully!",
                code: response?.data?.statusCode || response?.status,
            });

            if (response?.data?.statusCode < 400) {
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setMessage({
                message: err.response?.data?.message || "Registration failed!",
                code: err.response?.status || 500,
            });
        } finally {
            setLoading(false);
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
                    code={message.code}
                    onClose={() => setMessage(null)}
                />
            )}
        </div>
    );
};

export default Register;
