import axios from "axios";
import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";


// Create an Axios instance
const apiClient = axios.create({
    baseURL: `/api/v1/users`, // Base URL for user-related APIs
    headers: {
        "Content-Type": "application/json",
    },
});

// API calls
const registerUser = async (userData) => {
    try {

        const response = await apiClient.post("/register", userData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


const loginUser = async (userData) => {
    try {
        const response = await apiClient.post("/login", userData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const logoutUser = async () => {
    try {
        const response = await apiClient.post("/logout");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


const getCurrentUser = async () => {
    try {
        const response = await apiClient.get("/current-user");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const updateUserDetails = async (userData) => {
    try {
        const response = await apiClient.put("/update-user-details", userData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const updateUserProfilePic = async (formData) => {
    try {
        const response = await apiClient.put("/update-user-profile-pic", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const changeCurrentPassword = async (userData) => {
    try {
        const response = await apiClient.put("/change-current-password", userData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const deleteCurrentUser = async () => {
    try {
        const response = await apiClient.delete("/delete-user");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const refreshAccessToken = async () => {
    try {
        const response = await apiClient.get("/refresh-token");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Export all functions as a single object
export const authAPI = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateUserDetails,
    updateUserProfilePic,
    changeCurrentPassword,
    deleteCurrentUser,
    refreshAccessToken,
};
