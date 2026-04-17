import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);
      const trip = res.data;

      setCity(trip.city);
      setFromDate(trip.fromDate.split("T")[0]);
      setToDate(trip.toDate.split("T")[0]);
      setTasks(trip.tasks || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskChange = (index, value) => {
    const updated = [...tasks];
    updated[index].title = value;
    setTasks(updated);
  };

  const toggleTaskCompleted = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { title: newTask, completed: false }
    ]);

    setNewTask("");
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/trips/${id}`, {
        city,
        fromDate,
        toDate,
        tasks
      });

      toast.success("Trip updated successfully ✨");
      navigate("/trips");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update trip");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 
                      rounded-2xl shadow-xl p-6 md:p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Edit Trip
        </h2>

        {/* City */}
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full p-3 mb-4 rounded-lg bg-slate-900 text-white 
                     border border-slate-800 
                     focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                     outline-none transition"
        />

        {/* Dates */}
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-900 text-white border border-slate-800"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-900 text-white border border-slate-800"
          />
        </div>

        {/* Tasks */}
        <h3 className="text-white font-semibold mb-3">Tasks</h3>

        {tasks.length === 0 && (
          <p className="text-gray-400 mb-4">No tasks yet.</p>
        )}

        <div className="space-y-3 mb-6">
          {tasks.map((task, index) => (
            <div
              key={task._id || index}
              className="flex items-center gap-3 
                         bg-slate-900 border border-slate-800 
                         p-3 rounded-lg hover:border-indigo-500/30 transition"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompleted(index)}
                className="w-5 h-5 accent-indigo-500"
              />

              <input
                value={task.title}
                onChange={(e) =>
                  handleTaskChange(index, e.target.value)
                }
                className={`flex-1 p-2 rounded bg-slate-800 text-white 
                            border border-slate-700 
                            focus:border-indigo-500 outline-none ${
                              task.completed
                                ? "line-through text-gray-400"
                                : ""
                            }`}
              />

              <button
                onClick={() => removeTask(index)}
                className="px-3 py-1 rounded-md 
                           bg-rose-500 hover:bg-rose-600 
                           text-white text-sm 
                           shadow-sm hover:shadow-md transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            className="flex-1 p-3 rounded-lg bg-slate-900 text-white 
                       border border-slate-800 
                       focus:border-indigo-500 outline-none"
          />

          <button
            onClick={addTask}
            className="px-5 rounded-lg 
                       bg-indigo-500 hover:bg-indigo-600 
                       text-white shadow-md hover:shadow-lg 
                       transition"
          >
            Add
          </button>
        </div>

        {/* Update */}
        <button
          onClick={handleUpdate}
          className="w-full bg-indigo-500 hover:bg-indigo-600 
                     text-white py-3 rounded-xl font-semibold 
                     shadow-md hover:shadow-lg 
                     active:scale-95 transition-all duration-200"
        >
          Update Trip
        </button>

      </div>
    </div>
  );
};

export default EditTrip;