import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      setTodos((prev) => prev.filter((t) => t._id !== id));
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

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const total = todos.length;
  const active = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 
                   rounded-2xl shadow-xl p-6 md:p-10"
      >

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Plan Your Day 🗓️
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-6">
          {today}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {[
            { label: "Total", value: total, color: "text-white" },
            { label: "Active", value: active, color: "text-indigo-400" },
            { label: "Done", value: completed, color: "text-green-400" },
            { label: "Progress", value: `${completionRate}%`, color: "text-indigo-300" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center 
                         hover:border-indigo-500/30 transition"
            >
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}

        </div>

        {/* Input */}
        <form
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white 
                       border border-slate-700 placeholder-gray-400
                       focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                       outline-none transition"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg text-white 
                       bg-indigo-500 hover:bg-indigo-600 
                       shadow-md hover:shadow-lg transition"
          >
            Add
          </motion.button>
        </form>

        {/* Empty */}
        {total === 0 && (
          <div className="text-center text-gray-400 py-10">
            No tasks yet 🚀
          </div>
        )}

        {/* Active Todos */}
        <div className="space-y-3">
          <AnimatePresence>
            {todos.filter((t) => !t.completed).map((todo) => (
              <motion.div
                key={todo._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center 
                           bg-slate-800 border border-slate-700 
                           px-4 py-3 rounded-lg 
                           hover:border-indigo-500/30 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="w-5 h-5 accent-indigo-500"
                  />
                  <span className="text-white">{todo.title}</span>
                </div>

                <button
                  onClick={() => handleDelete(todo._id)}
                  className="px-3 py-1 rounded-md 
                             bg-rose-500 hover:bg-rose-600 
                             text-white text-sm transition"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completed */}
        {completed > 0 && (
          <>
            <h3 className="text-gray-400 mt-8 mb-3">Completed</h3>

            <div className="space-y-3">
              {todos.filter((t) => t.completed).map((todo) => (
                <div
                  key={todo._id}
                  className="flex justify-between items-center 
                             bg-slate-800/60 border border-slate-700 
                             px-4 py-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="w-5 h-5 accent-indigo-500"
                    />
                    <span className="text-gray-400 line-through">
                      {todo.title}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 rounded-md 
                               bg-slate-700 hover:bg-slate-600 
                               text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </motion.div>
    </div>
  );
};

export default Dashboard;