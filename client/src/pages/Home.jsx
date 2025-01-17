import React from "react";
import { Slider } from "../components";

const Home = () => {

    const sliderItems = [
        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2">Feature 1</h3>
            <p className="text-sm text-secondary dark:text-secondary-dark">
                Organize your tasks effortlessly.
            </p>
        </div>,

        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2">Feature 2</h3>
            <p className="text-sm text-secondary dark:text-secondary-dark">
                Stay productive with reminders.
            </p>
        </div>,

        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2">Feature 3</h3>
            <p className="text-sm text-secondary dark:text-secondary-dark">
                Organize your tasks effortlessly.
            </p>
        </div>,

        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2">Feature 4</h3>
            <p className="text-sm text-secondary dark:text-secondary-dark">
                Stay productive with reminders.
            </p>
        </div>
    ];


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
            <div className="mb-12 text-center space-y-6">
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
                        aria-label="Go to Login Page"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="px-6 py-2 rounded-lg bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-white"
                        aria-label="Go to Register Page"
                    >
                        Register
                    </a>
                </div>
            </div>
            {/* Add Slider Below */}
            <div className="w-full max-w-lg">
                <Slider items={sliderItems} title="Why Choose Us?" />
            </div>
        </div>
    );
};

export default Home;
