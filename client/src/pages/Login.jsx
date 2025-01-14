const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="mb-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Login
                </h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-lg shadow hover:bg-opacity-90 dark:bg-primary-dark">
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-primary dark:text-primary-dark hover:underline"
                    >
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
