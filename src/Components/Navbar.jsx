import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900 px-10 py-4 flex justify-between items-center shadow-lg">
      
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        smartTrip – Location-Based Travel & Task Planner
      </h1>

      <div className="flex gap-8 items-center text-gray-300">

        {token && (
          <>
            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "text-white border-indigo-500"
                    : "border-transparent hover:text-white hover:border-gray-500"
                }`
              }
            >
              Dashboard
            </NavLink>

            {/* Trips */}
            <NavLink
              to="/trips"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "text-white border-indigo-500"
                    : "border-transparent hover:text-white hover:border-gray-500"
                }`
              }
            >
              Trips
            </NavLink>

            {/* 🔥 NEW Explore */}
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "text-white border-indigo-500"
                    : "border-transparent hover:text-white hover:border-gray-500"
                }`
              }
            >
              Explore
            </NavLink>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white transition shadow-md"
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "hover:text-white transition"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white transition shadow-md"
            >
              Register
            </NavLink>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;