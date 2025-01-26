import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";
import axios from "axios";



const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_API_URL}/api/v1/todos`, // Base URL for todo-related APIs
    headers: {
        "Content-Type": "application/json",
    }
});

// Set Authorization header globally using an interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // Get the token from localStorage
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Attach the token to every request
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const createTodo = async (todoData) => {
    try {
        const response = await apiClient.post("/create-todo", todoData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getTodoById = async (id) => {
    try {
        const response = await apiClient.get(`/get-todo/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getAllTodos = async () => {
    try {
        const response = await apiClient.get("/get-all-todos");
        if (response.data && Array.isArray(response.data.message)) {
            return handleResponse(response); // Extract the array from the response
        }
        return []; // Return an empty array if no todos are found
    } catch (error) {
        return handleError(error);
    }
};


const deleteTodo = async (id) => {
    try {
        const response = await apiClient.delete(`/delete-todo/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const updateTodo = async (id, todoData) => {
    try {
        const response = await apiClient.put(`/update-todo/${id}`, todoData);

        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const isCompleteTodo = async (id, todoData) => {
    try {
        const response = await apiClient.put(`/toggle-todo/${id}`, todoData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const todoAPI = {
    getTodoById,
    createTodo,
    getAllTodos,
    deleteTodo,
    updateTodo,
    isCompleteTodo
};

