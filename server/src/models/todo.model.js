import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export const Todo = mongoose.model("Todo", todoSchema);