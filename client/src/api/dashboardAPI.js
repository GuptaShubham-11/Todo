import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";
import axios from "axios";


const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_API_URL}/api/v1/dashboard`, // Base URL for dashboard-related APIs
    headers: {
        "Content-Type": "application/json",
    }
});

// Add an interceptor to dynamically attach the token to each request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Attach token if it exists
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const getRecentActivity = async () => {
    try {
        const response = await apiClient.get("/recent-activity");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getCompletedTodosCount = async () => {
    try {
        const response = await apiClient.get("/completed-todos-count");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getTodosCount = async () => {
    try {
        const response = await apiClient.get("/todos-count");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const dashboardAPI = {
    getRecentActivity,
    getCompletedTodosCount,
    getTodosCount,
};

