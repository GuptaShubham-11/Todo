import React, { useState, useEffect } from "react";
import { todoAPI } from "../api/todoAPI.js";
import { Sidebar, Loader, Alert, TodoItem, AddTodo } from "../components";


const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            const response = await todoAPI.getAllTodos();
            setLoading(false);
            if (response?.data?.statusCode < 400) {
                setTodos(response.data.message);
            } else {
                setMessage({ text: response?.data?.message || "Failed to fetch todos.", code: response?.data?.statusCode || response?.status });
            }
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (!newTodo) return;
        setLoading(true);
        const response = await todoAPI.createTodo({ text: newTodo });
        setLoading(false);
        if (response?.data?.statusCode < 400) {
            setTodos([...todos, response.data.message]);
            setMessage({ text: "Todo added successfully.", code: response?.data?.statusCode || response?.data?.status });
            setNewTodo("");
        } else {
            setMessage({ text: response?.data?.message || "Failed to add todo.", code: response?.data?.statusCode || response?.status });
        }
    };

    const handleToggleTodo = async (id, isCompleted) => {
        setLoading(true);
        try {
            const response = await todoAPI.isCompleteTodo(id, { isCompleted });
            setLoading(false);
            if (response?.data?.statusCode < 400) {
                const updatedTodos = todos.map((todo) =>
                    todo._id === id ? { ...todo, isCompleted } : todo
                );
                setTodos(updatedTodos);
                setMessage({ text: "Todo toggled successfully.", code: response?.data?.statusCode });
            } else {
                setMessage({ text: response?.message || "Failed to update todo.", code: response?.status });
            }
        } catch (error) {
            setLoading(false);
            setMessage({ text: "An error occurred while updating the todo.", code: 500 });
        }
    };

    const handleUpdateTodo = async (id, text) => {
        setLoading(true);
        try {
            const response = await todoAPI.updateTodo(id, { text });
            setLoading(false);
            if (response?.data?.statusCode < 400) {
                const updatedTodos = todos.map((todo) =>
                    todo._id === id ? { ...todo, text } : todo
                );
                setTodos(updatedTodos);
                setMessage({ text: "Todo updated successfully.", code: response?.data?.statusCode });
            } else {
                setMessage({ text: response?.message || "Failed to update todo.", code: response?.status });
            }
        } catch (error) {
            setLoading(false);
            setMessage({ text: "An error occurred while updating the todo.", code: 500 });
        }
    };


    const handleDeleteTodo = async (id) => {
        setLoading(true);
        const response = await todoAPI.deleteTodo(id);
        setLoading(false);
        if (response?.data?.statusCode < 400) {
            const updatedTodos = todos.filter((todo) => todo._id !== id);
            setTodos(updatedTodos);
            setMessage({ text: "Todo deleted successfully.", code: response?.data?.statusCode });
        } else {
            setMessage({ text: response?.data?.message || "Failed to delete todo.", code: response?.data?.statusCode || response?.status });
        }
    };

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 flex">
            <Sidebar />
            <main className="flex-1 max-w-4xl mx-auto p-6">
                {/* Alert */}
                {message && message.text && (
                    <Alert
                        message={message.text || "Something went wrong!"}
                        code={message.code || 400}
                        onClose={() => setMessage(null)}
                    />
                )}

                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Manage Your Todos
                </h1>

                {/* Add Todo Section */}
                <AddTodo
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    handleAddTodo={handleAddTodo}
                    loading={loading}
                />

                {/* Todo List */}
                <div className="space-y-6">
                    {loading ? (
                        <Loader />
                    ) : todos.length === 0 ? (
                        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
                            🎉 You have no pending tasks. Enjoy your free time!
                        </p>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                handleToggleTodo={handleToggleTodo}
                                handleUpdateTodo={handleUpdateTodo}
                                handleDeleteTodo={handleDeleteTodo}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Todos;
