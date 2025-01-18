import React, { useState } from "react";
import { InputField, Button, Sidebar } from "../components";

const Todos = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a Todo App", completed: true },
    ]);
    const [newTodo, setNewTodo] = useState("");

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo("");
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 flex">
            <Sidebar />
            <main className="flex-1 max-w-4xl mx-auto p-6">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Manage Your Todos
                </h1>

                {/* Add Todo Section */}
                <div className="flex items-center justify-center mb-8 gap-4">
                    <InputField
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="What’s next on your list?"
                        className="w-full md:w-2/3 p-3 rounded-lg shadow focus:ring-2 focus:ring-purple-500"
                    />
                    {newTodo.trim() !== "" && (
                        <Button
                            text="Add"
                            onClick={addTodo}
                            className="mb-3 px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
                        />
                    )}
                </div>


                {/* Todo List */}
                <div className="space-y-6">
                    {todos.length === 0 ? (
                        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
                            🎉 You have no pending tasks. Enjoy your free time!
                        </p>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex items-center justify-between p-4 rounded-lg shadow-lg transition-transform transform ${todo.completed
                                    ? "bg-green-100 dark:bg-green-800 scale-105"
                                    : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${todo.completed
                                            ? "bg-green-500"
                                            : "bg-purple-500 dark:bg-purple-700"
                                            }`}
                                    >
                                        {todo.text[0].toUpperCase()}
                                    </div>
                                    <span
                                        className={`flex-grow cursor-pointer text-lg ${todo.completed
                                            ? "line-through text-gray-500"
                                            : "text-gray-800 dark:text-gray-200"
                                            }`}
                                        onClick={() => toggleComplete(todo.id)}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button
                                        text={todo.completed ? "Undo" : "Complete"}
                                        className={`px-4 py-2 text-white rounded-lg shadow-lg ${todo.completed
                                            ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500"
                                            : "bg-blue-500 hover:bg-blue-600"
                                            }`}
                                        onClick={() => toggleComplete(todo.id)}
                                    />
                                    <Button
                                        text="Delete"
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-500 hover:dark:bg-red-600 text-white rounded-lg shadow-lg"
                                        onClick={() => deleteTodo(todo.id)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Todos;
