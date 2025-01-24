import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: `/api/v1/dashboard`, // Base URL for dashboard-related APIs
    headers: {
        "Content-Type": "application/json",
    }
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

