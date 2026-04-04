import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogin = async () => {
setError("");


// 🔹 Validation
if (!email || !password) {
  setError("Please enter email and password");
  return;
}

try {
  setLoading(true);

  const res = await fetch(
    "https://trip-backend-0bp1.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    login(data.token);
    navigate("/dashboard");
  } else {
    setError(data.message || "Invalid email or password");
  }
} catch (err) {
  setError("Server not responding. Try again.");
} finally {
  setLoading(false);
}


};

return ( <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 p-6">

  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

    {/* Title */}
    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Welcome Back 👋
    </h2>

    {/* Email */}
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    {/* Error */}
    {error && (
      <p className="text-red-300 text-sm mb-3 text-center">
        {error}
      </p>
    )}

    {/* Button */}
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
      }`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    {/* Register */}
    <p className="text-sm text-gray-200 mt-5 text-center">
      Don't have an account?{" "}
      <span
        onClick={() => navigate("/register")}
        className="text-indigo-300 cursor-pointer hover:underline"
      >
        Register
      </span>
    </p>

  </div>
</div>

);
};

export default Login;
