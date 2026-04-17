import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await API.get("/trips");
      setTrips(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/trips/${id}`);
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-white">
            ✈️ My Trips
          </h2>

          <button
            onClick={() => navigate("/create-trip")}
            className="bg-indigo-500 hover:bg-indigo-600 
                       text-white px-5 py-2.5 rounded-lg 
                       shadow-md hover:shadow-lg 
                       active:scale-95 transition"
          >
            + New Trip
          </button>
        </div>

        {/* Empty */}
        {trips.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 
                          rounded-2xl p-12 text-center">
            <p className="text-gray-400 mb-4">
              No trips created yet.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="bg-indigo-500 hover:bg-indigo-600 
                         text-white px-5 py-2 rounded-lg"
            >
              Create Trip
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {trips.map((trip) => {
              const totalTasks = trip.tasks?.length || 0;
              const completedTasks =
                trip.tasks?.filter((t) => t.completed).length || 0;

              const progress =
                totalTasks === 0
                  ? 0
                  : (completedTasks / totalTasks) * 100;

              return (
                <motion.div
                  key={trip._id}
                  whileHover={{ y: -4 }}
                  className="bg-slate-900 border border-slate-800 
                             rounded-xl p-6 
                             hover:border-indigo-500/30 
                             transition"
                >
                  {/* City */}
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {trip.city}
                  </h3>

                  {/* Dates */}
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(trip.fromDate).toDateString()} -{" "}
                    {new Date(trip.toDate).toDateString()}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{completedTasks}/{totalTasks}</span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="flex-1 py-2 rounded-md 
                                 bg-indigo-500 hover:bg-indigo-600 
                                 text-white transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/edit-trip/${trip._id}`)
                      }
                      className="flex-1 py-2 rounded-md 
                                 bg-slate-800 hover:bg-slate-700 
                                 text-gray-300 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="flex-1 py-2 rounded-md 
                                 bg-rose-500 hover:bg-rose-600 
                                 text-white transition"
                    >
                      Delete
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;