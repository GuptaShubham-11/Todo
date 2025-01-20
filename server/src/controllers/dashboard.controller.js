import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
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
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                recentTodos,
                "Recent activity fetched successfully."
            )
        );
});

export {
    getCompletedTodosCount,
    getTodosCount,
    getRecentActivity
};

