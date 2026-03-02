import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTodos = async () => {
        try {
            const res = await API.get("/todos");
            setTodos(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // ➕ Add Todo
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const res = await API.post("/todos", { title });
            setTodos((prev) => [...prev, res.data]);
            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    // ❌ Delete
    const handleDelete = async (id) => {
        try {
            await API.delete(`/todos/${id}`);
            setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // ✅ Toggle Complete
    const toggleComplete = async (todo) => {
        try {
            const res = await API.put(`/todos/${todo._id}`, {
                completed: !todo.completed,
            });

            setTodos((prev) =>
                prev.map((t) => (t._id === todo._id ? res.data : t))
            );
        } catch (error) {
            console.error(error);
        }
    };

    // 📊 Stats
    const total = todos.length;
    const activeTodos = todos.filter((t) => !t.completed);
    const completedTodos = todos.filter((t) => t.completed);
    const completed = completedTodos.length;
    const active = activeTodos.length;
    const completionRate =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10"
            >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Dashboard
                </h2>
                {/* 📊 Stats Section */}
                <div className="grid grid-cols-4 gap-6 mb-10">

                    {/* Total */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-500 text-sm mb-2">Total Tasks</p>
                        <p className="text-3xl font-bold text-gray-800">{total}</p>
                    </div>

                    {/* Active */}
                    <div className="bg-yellow-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-200">
                        <p className="text-yellow-600 text-sm mb-2">Active</p>
                        <p className="text-3xl font-bold text-yellow-700">{active}</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200">
                        <p className="text-green-600 text-sm mb-2">Completed</p>
                        <p className="text-3xl font-bold text-green-700">{completed}</p>
                    </div>

                    {/* Progress */}
                    <div className="bg-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-200">
                        <p className="text-indigo-600 text-sm mb-2">Progress</p>
                        <p className="text-3xl font-bold text-indigo-700">
                            {completionRate}%
                        </p>
                    </div>

                </div>

                {/* Input */}
                <form onSubmit={handleAdd} className="flex gap-4 mb-8">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo..."
                        className="flex-1 px-5 py-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="px-6 py-3 rounded-xl text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30"
                    >
                        Add
                    </motion.button>
                </form>

                {/* 📝 Empty State */}
                {total === 0 && (
                    <div className="text-center py-10 text-white/80">
                        <p className="text-lg font-semibold mb-2">
                            No tasks yet 🚀
                        </p>
                        <p className="text-sm">
                            Add your first task and start being productive!
                        </p>
                    </div>
                )}

                {/* Active Todos */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {activeTodos.map((todo) => (
                            <motion.div
                                key={todo._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between items-center bg-white/80 px-5 py-3 rounded-xl shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo)}
                                        className="w-5 h-5 accent-indigo-500 cursor-pointer"
                                    />
                                    <span className="text-gray-800 font-medium">
                                        {todo.title}
                                    </span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(todo._id)}
                                    className="text-sm px-4 py-1.5 rounded-lg bg-rose-300 hover:bg-rose-400 text-white shadow-sm"
                                >
                                    Delete
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Completed Section */}
                {completed > 0 && (
                    <>
                        <h3 className="text-white font-semibold mt-10 mb-4">
                            Completed
                        </h3>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {completedTodos.map((todo) => (
                                    <motion.div
                                        key={todo._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-between items-center bg-white/50 px-5 py-3 rounded-xl shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo)}
                                                className="w-5 h-5 accent-indigo-500 cursor-pointer"
                                            />
                                            <span className="text-gray-500 line-through font-medium">
                                                {todo.title}
                                            </span>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDelete(todo._id)}
                                            className="text-sm px-4 py-1.5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white shadow-sm"
                                        >
                                            Delete
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;