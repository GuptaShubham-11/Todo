const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="mb-32 text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-primary dark:text-primary-dark">
                    Welcome to Todo App
                </h1>
                <p className="text-lg max-w-md mx-auto text-secondary dark:text-secondary-dark">
                    Manage your tasks effectively and stay productive with our user-friendly Todo app.
                </p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="/login"
                        className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 shadow-md dark:bg-primary-dark"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="px-6 py-2 rounded-lg bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-white"
                    >
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
