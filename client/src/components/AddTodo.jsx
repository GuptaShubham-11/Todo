import React from "react";
import { InputField, Button } from "../components";

const AddTodo = ({ newTodo, setNewTodo, handleAddTodo, loading }) => {
    return (
        <div className="flex items-center justify-center mb-8 gap-4 px-4 sm:px-6 lg:px-8">
            {/* Card Container */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                {/* Input and Button Container */}
                <div className="flex flex-col gap-4">
                    <InputField
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="What’s next on your list?"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                    />
                    <Button
                        text="Add"
                        onClick={handleAddTodo}
                        disabled={newTodo.trim() === "" || loading}
                        className="w-full px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
