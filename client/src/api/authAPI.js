import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "/api/v1/users", // Base URL for user-related APIs
    headers: {
        "Content-Type": "application/json",
    },
});

// Error handling utility
const handleError = (error) => {
    return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Something went wrong",
    };
};

// API calls
const registerUser = async (userData) => {
    try {
        const response = await apiClient.post("/register", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const loginUser = async (userData) => {
    try {
        const response = await apiClient.post("/login", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const logoutUser = async () => {
    try {
        const response = await apiClient.post("/logout");
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const getCurrentUser = async () => {
    try {
        const response = await apiClient.get("/current-user");
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const updateUserDetails = async (userData) => {
    try {
        const response = await apiClient.put("/update-user-details", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const updateUserProfilePic = async (formData) => {
    try {
        const response = await apiClient.put("/update-user-profile-pic", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const changeCurrentPassword = async (userData) => {
    try {
        const response = await apiClient.put("/change-current-password", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const deleteCurrentUser = async () => {
    try {
        const response = await apiClient.delete("/delete-user");
        return { success: true, data: response.data };
    } catch (error) {
        return handleError(error);
    }
};

const refreshAccessToken = async () => {
    try {
        const response = await apiClient.get("/refresh-token");
        return { success: true, data: response.data };
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
