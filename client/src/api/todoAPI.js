import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: `${BASE_URL}/api/v1/todos`, // Base URL for todo-related APIs
    headers: {
        "Content-Type": "application/json",
    }
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

