import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../api/dashboardAPI.js';
import Loader from './Loader.jsx';

const RecentActivities = () => {
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fatchedActivities = async () => {
            setLoading(true);
            const response = await dashboardAPI.getRecentActivity();
            setActivities(response?.data?.message || []);
            setLoading(false);
        };
        fatchedActivities();
    }, []);

    return (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-xl p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center md:text-left">
                Recent Activities
            </h2>
            <ul className="space-y-4">
                {loading ? (
                    <Loader />
                ) : (
                    activities.length > 0 ? (
                        activities.map((activity) => (
                            <li
                                key={activity._id}
                                className="flex items-center space-x-4 border-b pb-3 last:border-none 
                                           text-sm sm:text-base lg:text-lg"
                            >
                                <span className="text-gray-700 dark:text-gray-300 flex-1 break-words">
                                    ✅ {activity.text}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                            No recent activities found.
                        </p>
                    )
                )}
            </ul>
        </div>
    );
};

export default RecentActivities;
