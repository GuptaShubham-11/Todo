import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../api/dashboardAPI';
import Loader from './Loader.jsx';

const RecentActivities = () => {
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fatchedActivities = async () => {
            setLoading(true);
            const response = await dashboardAPI.getRecentActivity();
            setActivities(response?.data?.message);
            setLoading(false);
        }
        fatchedActivities();
    }, []);


    return (
        <div className="mt-8 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Recent Activities
            </h2>
            <ul className="space-y-4">
                {
                    loading ? (
                        <Loader />
                    ) : (

                        activities.map((activity) => (
                            <li key={activity._id} className="flex items-center space-x-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    ✅ {activity.text}
                                </span>
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    );
};

export default RecentActivities;
