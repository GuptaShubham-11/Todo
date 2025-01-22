import React from "react";
import { dashboardAPI } from "../api/dashboardAPI.js";
import { useState, useEffect } from "react";
import Loader from "./Loader.jsx";

const TaskProgress = () => {
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCountTasks = async () => {
            setLoading(true);
            const responseTotalCount = await dashboardAPI.getTodosCount();
            const responseTotalCompletedTasks = await dashboardAPI.getCompletedTodosCount();
            setLoading(false);
            setTotalTasks(responseTotalCount?.data?.message?.totalCount || 0);
            setCompletedTasks(responseTotalCompletedTasks?.data?.message?.completedCount || 0);
        };
        fetchCountTasks();
    }, []);

    // Handle 0/0 case and avoid NaN
    const progress = totalTasks === 0 ? 0 : Math.min((completedTasks / totalTasks) * 100, 100);

    return (
        <div className="relative w-full bg-gray-100 dark:bg-gray-800 shadow-2xl rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Task Progress
                </h3>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {totalTasks === 0 ? "No tasks available" : `${completedTasks}/${totalTasks} Tasks`}
                </span>
            </div>

            {/* Circular Progress */}
            {loading ? (
                <Loader />
            ) : (
                <div>
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
                                    {totalTasks === 0 ? "0%" : `${progress.toFixed(1)}%`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {totalTasks === 0 ? "No tasks available. Start adding some!" :
                                (progress === 0 ? "No tasks completed yet." :
                                    (progress === 100 ? "All tasks completed! Excellent work 😎!" : "Keep it up! You’re doing amazing."))}
                        </p>
                    </div>
                </div>
            )}

            {/* Background Design */}
            <div className="absolute -top-4 -right-6 w-20 h-20 bg-gradient-to-br from-green-300 to-blue-300 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-blue-300 to-purple-300 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-25 blur-3xl"></div>
        </div>
    );
};

export default TaskProgress;
