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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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

  const total = todos.length;
  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const completed = completedTodos.length;
  const active = activeTodos.length;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 flex items-start md:items-center justify-center px-4 py-6 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
          Dashboard
        </h2>

        {/* 📊 Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all">
            <p className="text-gray-500 text-xs md:text-sm mb-1 md:mb-2">
              Total Tasks
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {total}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-4 md:p-6 shadow-lg border border-yellow-200">
            <p className="text-yellow-600 text-xs md:text-sm mb-1 md:mb-2">
              Active
            </p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-700">
              {active}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 md:p-6 shadow-lg border border-green-200">
            <p className="text-green-600 text-xs md:text-sm mb-1 md:mb-2">
              Completed
            </p>
            <p className="text-2xl md:text-3xl font-bold text-green-700">
              {completed}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4 md:p-6 shadow-lg border border-indigo-200">
            <p className="text-indigo-600 text-xs md:text-sm mb-1 md:mb-2">
              Progress
            </p>
            <p className="text-2xl md:text-3xl font-bold text-indigo-700">
              {completionRate}%
            </p>
          </div>
        </div>

        {/* Input Section */}
        <form
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="px-6 py-3 rounded-xl text-white bg-indigo-500 hover:bg-indigo-600 shadow-lg"
          >
            Add
          </motion.button>
        </form>

        {/* Empty State */}
        {total === 0 && (
          <div className="text-center py-10 text-white/80">
            <p className="text-base md:text-lg font-semibold mb-2">
              No tasks yet 🚀
            </p>
            <p className="text-sm">
              Add your first task and start being productive!
            </p>
          </div>
        )}

        {/* Active Todos */}
        <div className="space-y-3 md:space-y-4">
          <AnimatePresence>
            {activeTodos.map((todo) => (
              <motion.div
                key={todo._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-white/90 px-4 py-3 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="w-5 h-5 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-gray-800 text-sm md:text-base font-medium">
                    {todo.title}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(todo._id)}
                  className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-lg bg-rose-400 hover:bg-rose-500 text-white"
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
            <h3 className="text-white font-semibold mt-8 mb-4 text-sm md:text-base">
              Completed
            </h3>

            <div className="space-y-3 md:space-y-4">
              <AnimatePresence>
                {completedTodos.map((todo) => (
                  <motion.div
                    key={todo._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center bg-white/60 px-4 py-3 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo)}
                        className="w-5 h-5 accent-indigo-500 cursor-pointer"
                      />
                      <span className="text-gray-500 line-through text-sm md:text-base font-medium">
                        {todo.title}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(todo._id)}
                      className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
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