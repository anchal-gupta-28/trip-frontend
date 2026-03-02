import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 text-white">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-5xl font-bold mb-6">✈️ Welcome to iTask</h1>
        <p className="text-lg mb-8 opacity-90">
          Plan, organize and manage your trips beautifully.
          Track tasks, explore cities, and stay productive.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;