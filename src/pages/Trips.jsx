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
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white tracking-wide">
            ✈️ My Trips
          </h2>

          <button
            onClick={() => navigate("/create-trip")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-2xl 
                       font-semibold shadow-lg hover:shadow-xl 
                       hover:scale-105 transition-all duration-300"
          >
            + Create New Trip
          </button>
        </div>

        {/* Empty State */}
        {trips.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-2xl">
            <p className="text-gray-500 text-xl font-medium mb-4">
              No trips created yet.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {trips.map((trip) => {
              const totalTasks = trip.tasks?.length || 0;
              const completedTasks =
                trip.tasks?.filter((t) => t.completed).length || 0;

              return (
                <motion.div
                  key={trip._id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                >
                  {/* City */}
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {trip.city}
                  </h3>

                  {/* Dates */}
                  <p className="text-gray-500 mb-6">
                    {new Date(trip.fromDate).toDateString()} -{" "}
                    {new Date(trip.toDate).toDateString()}
                  </p>

                  {/* Task Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Tasks</span>
                      <span>
                        {completedTasks}/{totalTasks} Completed
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width:
                            totalTasks === 0
                              ? "0%"
                              : `${(completedTasks / totalTasks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="flex-1 px-4 py-2.5 rounded-xl 
                                 bg-indigo-500 text-white 
                                 hover:bg-indigo-600 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/edit-trip/${trip._id}`)
                      }
                      className="flex-1 px-4 py-2.5 rounded-xl 
                                 bg-gray-200 text-gray-800 
                                 hover:bg-gray-300 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="flex-1 px-4 py-2.5 rounded-xl 
                                 bg-rose-400 text-white 
                                 hover:bg-rose-500 transition"
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