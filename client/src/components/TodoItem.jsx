import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdDone, MdOutlineCircle } from "react-icons/md";

const TodoItem = ({ todo, handleUpdateTodo, handleDeleteTodo, handleToggleTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleSave = () => {
        if (newText.trim() !== "") {
            handleUpdateTodo(todo._id, newText.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setNewText(todo.text);
        setIsEditing(false);
    };

    return (
        <div
            className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg shadow-lg transition-transform transform ${todo.isCompleted
                ? "bg-emerald-100 dark:bg-emerald-300 scale-105"
                : "bg-gray-100 dark:bg-gray-800"
                }`}
        >
            {/* Checkbox and Todo Text */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                    onClick={() => handleToggleTodo(todo._id, !todo.isCompleted)}
                    className="text-2xl text-green-500 dark:text-green-600 hover:scale-110 transition-transform"
                    aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                >
                    {todo.isCompleted ? <MdDone /> : <MdOutlineCircle />}
                </button>

                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="flex-grow text-lg p-2 border rounded-lg outline-none dark:bg-gray-700 dark:text-white"
                    />
                ) : (
                    <span
                        className={`text-lg cursor-pointer ${todo.isCompleted ? "line-through text-gray-500" : "text-gray-800 dark:text-gray-200"}`}
                        onClick={() => handleToggleTodo(todo._id, !todo.isCompleted)}
                    >
                        {todo.text}
                    </span>
                )}
            </div>

            {/* Edit, Save/Cancel, and Delete Icons */}
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="text-green-500 dark:text-green-400 hover:scale-110 transition-transform"
                            aria-label="Save changes"
                        >
                            <FaCheck size={20} />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="text-red-500 dark:text-red-300 hover:scale-110 transition-transform"
                            aria-label="Cancel edit"
                        >
                            <FaTimes size={20} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 dark:text-blue-600 hover:scale-110 transition-transform"
                        aria-label="Edit todo"
                    >
                        <FaEdit size={20} />
                    </button>
                )}
                <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-red-500 dark:text-red-700 hover:scale-110 transition-transform"
                    aria-label="Delete todo"
                >
                    <FaTrashAlt size={20} />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
