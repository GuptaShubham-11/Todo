import handleError from "./handleError.js";
import handleResponse from "./handleResponse.js";
import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api/v1/todos", // Base URL for todo-related APIs
    headers: {
        "Content-Type": "application/json",
    }
});

const createTodo = async (todoData) => {
    try {
        const response = await apiClient.post("/", todoData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getTodoById = async (id) => {
    try {
        const response = await apiClient.get(`/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getAllTodos = async () => {
    try {
        const response = await apiClient.get("/all");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const deleteTodo = async (id) => {
    try {
        const response = await apiClient.delete(`/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const updateTodo = async (id, todoData) => {
    try {
        const response = await apiClient.put(`/${id}`, todoData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export {
    getTodoById,
    createTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
};

