import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);
      setTrip(res.data);
    } catch (error) {
      console.error("Error fetching trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const res = await API.put(`/trips/${id}/tasks/${taskId}`);
      setTrip(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <h2>Loading trip details...</h2>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <h2>Trip not found</h2>
        <button
          onClick={() => navigate("/trips")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Trips
        </button>
      </div>
    );
  }

  const completedCount = trip.tasks.filter(t => t.completed).length;
  const progress = trip.tasks.length
    ? (completedCount / trip.tasks.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <button
          onClick={() => navigate("/trips")}
          className="mb-6 text-indigo-600 hover:underline"
        >
          ← Back to Trips
        </button>

        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          {trip.city}
        </h2>

        <p className="text-gray-500 mb-6">
          {new Date(trip.fromDate).toDateString()} -{" "}
          {new Date(trip.toDate).toDateString()}
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm text-gray-600">
            <span>Progress</span>
            <span>{completedCount}/{trip.tasks.length} Completed</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="bg-indigo-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Tasks */}
        <h3 className="font-semibold text-lg mb-3 text-gray-700">
          Tasks
        </h3>

        {trip.tasks.length === 0 ? (
          <p>No tasks added.</p>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {trip.tasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task._id)}
                      className="w-5 h-5 accent-indigo-500"
                    />

                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};

export default TripDetails;