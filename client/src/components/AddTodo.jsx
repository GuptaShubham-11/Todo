import React from "react";
import { InputField, Button } from "../components";

const AddTodo = ({ newTodo, setNewTodo, handleAddTodo, loading }) => {
    return (
        <div className="flex items-center justify-center mb-8 gap-4">
            <InputField
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What’s next on your list?"
                className="w-full md:w-2/3 p-3 rounded-lg shadow focus:ring-2 focus:ring-purple-500"
            />
            <Button
                text="Add"
                onClick={handleAddTodo}
                disabled={newTodo.trim() === "" || loading}
                className="mb-3 px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
            />
        </div>
    );
};

export default AddTodo;
