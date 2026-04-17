import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white px-6 py-16">

      <div className="max-w-6xl mx-auto text-center">

        {/* HERO */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 leading-tight"
        >
          ✈️ Plan Smart. Travel Better.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
        >
          Manage your daily tasks and organize your trips in one place.
          Stay productive, track progress, and explore new destinations effortlessly.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-20"
        >
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition shadow-lg hover:scale-105"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
          >
            Create Account
          </Link>
        </motion.div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "📝 Task Management",
              desc: "Track daily tasks, mark them complete, and stay productive."
            },
            {
              title: "🌍 Trip Planning",
              desc: "Create trips, organize schedules, and manage travel tasks."
            },
            {
              title: "📍 Explore Cities",
              desc: "Discover popular places and must-try food before traveling."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl shadow-lg backdrop-blur"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* EXTRA INFO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-gray-400 text-sm"
        >
          👉 Create trips in the{" "}
          <span className="text-indigo-400 font-medium">Trips</span> section  
          & explore destinations in{" "}
          <span className="text-indigo-400 font-medium">Explore</span> ✨
        </motion.div>

      </div>
    </div>
  );
};

export default Home;