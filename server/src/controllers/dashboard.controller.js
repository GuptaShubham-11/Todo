import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";


const getCompletedTodosCount = asyncHandler(async (req, res) => {
    const result = await Todo.aggregate([
        {
            $match: {
                user: req.user?._id,
                isCompleted: true
            }
        },
        {
            $facet: {
                count: [{ $count: "completedCount" }],
            }
        }
    ]);

    const completedCount = result[0]?.count[0]?.completedCount || 0;


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { completedCount },
                "Completed todos counted successfully."
            )
        );
});

const getUncompeltedTodosCount = asyncHandler(async (req, res) => {
    const result = await Todo.aggregate([
        {
            $match: {
                user: req.user?._id,
                isCompleted: false
            }
        },
        {
            $facet: {
                count: [{ $count: "uncompletedCount" }],
            }
        }
    ]);

    const uncompletedCount = result[0]?.count[0]?.uncompletedCount || 0;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { uncompletedCount },
                "Uncompleted todos counted successfully."
            )
        );
});

const getTodosCount = asyncHandler(async (req, res) => {
    const result = await Todo.aggregate([
        {
            $match: {
                user: req.user?._id
            }
        },
        {
            $facet: {
                count: [{ $count: "totalCount" }],
            }
        }
    ]);

    const totalCount = result[0]?.count[0]?.totalCount || 0;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { totalCount },
                "Total todos counted successfully."
            )
        );
});

const getRecentActivity = asyncHandler(async (req, res) => {
    const recentTodos = await Todo.aggregate([
        {
            $match: {
                user: req.user?._id
            }
        },
        {
            $sort: {
                updatedAt: -1
            }
        },
        {
            $limit: 5
        },
        {
            $facet: {
                completed: [{ $match: { isCompleted: true } }],
                uncompleted: [{ $match: { isCompleted: false } }]
            }
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                recentTodos[0],
                "Recent activity fetched successfully."
            )
        );
});

export {
    getCompletedTodosCount,
    getUncompeltedTodosCount,
    getTodosCount,
    getRecentActivity
};

