import React from "react";
import PropTypes from "prop-types";

const TaskProgress = ({ completedTasks, totalTasks }) => {
    const progress = Math.min((completedTasks / totalTasks) * 100, 100);

    return (
        <div className="relative w-full bg-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Task Progress
                </h3>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {completedTasks}/{totalTasks} Tasks
                </span>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-4">
                <div className="relative">
                    <svg
                        className="w-32 h-32 transform -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="10"
                            strokeDasharray="282"
                            strokeDashoffset={`${282 - (progress / 100) * 282}`}
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#60a5fa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            {progress.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Motivational Text */}
            <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep it up! You’re doing amazing.
                </p>
            </div>

            {/* Background Design */}
            <div className="absolute -top-4 -right-6 w-20 h-20 bg-gradient-to-br from-green-300 to-blue-300 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-blue-300 to-purple-300 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-25 blur-3xl"></div>
        </div>
    );
};

TaskProgress.propTypes = {
    completedTasks: PropTypes.number.isRequired,
    totalTasks: PropTypes.number.isRequired,
};

export default TaskProgress;
