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
      console.error(error);
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
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-gray-400">
        Loading trip details...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-gray-400">
        <p>Trip not found</p>
        <button
          onClick={() => navigate("/trips")}
          className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
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
    <div className="min-h-screen bg-slate-950 px-4 py-10">

      <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 
                      rounded-2xl shadow-xl p-6 md:p-8">

        {/* Back */}
        <button
          onClick={() => navigate("/trips")}
          className="mb-6 text-gray-400 hover:text-white transition"
        >
          ← Back to Trips
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-2">
          {trip.city}
        </h2>

        <p className="text-gray-400 mb-6">
          {new Date(trip.fromDate).toDateString()} -{" "}
          {new Date(trip.toDate).toDateString()}
        </p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span>Progress</span>
            <span>
              {completedCount}/{trip.tasks.length} Completed
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="bg-indigo-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Tasks */}
        <h3 className="text-white font-semibold mb-4">
          Tasks
        </h3>

        {trip.tasks.length === 0 ? (
          <p className="text-gray-400">No tasks added.</p>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {trip.tasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between 
                             bg-slate-900 border border-slate-800 
                             p-4 rounded-lg 
                             hover:border-indigo-500/30 transition"
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
                          ? "line-through text-gray-500"
                          : "text-white"
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