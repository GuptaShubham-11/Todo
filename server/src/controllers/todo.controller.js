import { Todo } from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const createTodo = asyncHandler(async (req, res) => {
    const { text, isCompleted } = req.body;

    if (!text || text.trim() === "") {
        throw new ApiError(400, "Please fill all the fields");
    }

    const todo = await Todo.create({
        text: text.trim(),
        isCompleted: isCompleted || false,
        user: req.user?._id,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                todo,
                "Todo created successfully."
            )
        );
});

const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
        throw new ApiError(400, "Please fill all the fields");
    }

    const todo = await Todo.findOneAndUpdate(
        {
            _id: id,
            user: req.user?._id
        },
        {
            $set: {
                ...(text?.trim() && { text: text.trim() }), // Only include `text` if valid
            },
        },
        {
            new: true
        }
    );

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todo,
                "Todo updated successfully."
            )
        );
});

const isCompleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const todo = await Todo.findOneAndUpdate(
        {
            _id: id,
            user: req.user?._id
        },
        {
            $set: {
                isCompleted
            }
        },
        {
            new: true
        }
    );

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todo,
                "Todo toggled successfully."
            )
        );
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
        _id: id,
        user: req.user?._id
    });

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todo,
                "Todo deleted successfully."
            )
        );
});

const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOne({
        _id: id,
        user: req.user?._id
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todo,
                "Todo fetched successfully."
            )
        );
});

const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user?._id });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todos,
                "Todos fetched successfully."
            )
        );
});

export {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
    getAllTodos,
    isCompleteTodo
};
