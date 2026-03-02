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
    <nav className="bg-slate-900 text-white px-10 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        iTask
      </h1>

      <div className="flex gap-8 items-center text-gray-300">

        {token && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-indigo-500 pb-1"
                  : "hover:text-white transition duration-200"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/trips"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-indigo-500 pb-1"
                  : "hover:text-white transition duration-200"
              }
            >
              Trips
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1.5 rounded-lg text-white transition duration-200 shadow-sm"
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
                  ? "text-white font-semibold border-b-2 border-indigo-500 pb-1"
                  : "hover:text-white transition duration-200"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-indigo-500 pb-1"
                  : "hover:text-white transition duration-200"
              }
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