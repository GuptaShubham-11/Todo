import { useState } from "react";
import { InputField, Button, Loader, Alert } from "../components";
import { authAPI } from "../api/authAPI.js";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [formData, SetFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        SetFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage(null);
        setLoading(true);

        try {
            const data = {
                username: formData.username,
                password: formData.password,
            };

            const response = await authAPI.loginUser(data);

            console.log(response);

            setLoading(false);
            setMessage({ message: response?.data?.data || response?.message, code: response?.data?.statusCode || response?.status });

            // If login is successful
            if (response?.data?.statusCode < 400 && response?.data?.message?.user) {
                // Dispatching user data, accessToken, refreshToken, and isAuthenticated to Redux
                dispatch(login({
                    user: response.data.message.user,
                    accessToken: response.data.message.accessToken,
                    refreshToken: response.data.message.refreshToken,
                }));
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }

        } catch (err) {
            setLoading(false);
            setMessage({
                message: err.response.data || "Login failed!",
                code: err.response.statusCode || 400,
            });
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="mb-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    {/* Show loader or button based on loading state */}
                    {loading ? (
                        <div className="flex justify-center mt-4">
                            <Loader /> {/* Simple visible loader */}
                        </div>
                    ) : (
                        <Button
                            text="Login"
                            type="submit"
                            className="mt-4 w-full"
                        />
                    )}
                </form>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                    Create an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary dark:text-primary-dark hover:underline"
                    >
                        Register here
                    </Link>
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

export default Login;
