import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

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
      console.error("Error fetching trip:", error);
    }
  };

  // ✏️ Update task title
  const handleTaskChange = (index, value) => {
    const updated = [...tasks];
    updated[index].title = value;
    setTasks(updated);
  };

  // ✅ Toggle completed
  const toggleTaskCompleted = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // ❌ Remove task
  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // ➕ Add new task
  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        title: newTask,
        completed: false
      }
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

      alert("Trip Updated Successfully!");
      navigate("/trips");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update trip");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold mb-6">Edit Trip</h2>

        {/* City */}
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          placeholder="City"
        />

        {/* Dates */}
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Tasks Section */}
        <h3 className="font-semibold text-lg mb-3">Tasks</h3>

        {tasks.length === 0 && (
          <p className="text-gray-500 mb-4">No tasks yet.</p>
        )}

        <div className="space-y-3 mb-6">
          {tasks.map((task, index) => (
            <div
              key={task._id || index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl"
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
                className={`flex-1 p-2 border rounded ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              />

              <button
                onClick={() => removeTask(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add New Task */}
        <div className="flex gap-3 mb-6">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            className="flex-1 p-3 border rounded"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded"
          >
            Add
          </button>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Update Trip
        </button>

      </div>
    </div>
  );
};

export default EditTrip;