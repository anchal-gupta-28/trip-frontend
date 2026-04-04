import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

// 🔹 Email Validation
const isValidEmail = (email) => {
return /\S+@\S+.\S+/.test(email);
};

// 🔹 Password Validation
const isStrongPassword = (password) => {
return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
};

const handleRegister = async () => {
setError("");

//  Validations
if (!name || !email || !password) {
  setError("All fields are required");
  return;
}

if (!isValidEmail(email)) {
  setError("Please enter a valid email");
  return;
}

if (!isStrongPassword(password)) {
  setError(
    "Password must be 6+ chars, include 1 uppercase & 1 number"
  );
  return;
}

try {
  setLoading(true);

  const res = await fetch(
    "https://trip-backend-0bp1.onrender.com/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    navigate("/login");
  } else {
    setError(data.message || "Registration failed");
  }
} catch (err) {
  setError("Server error. Try again.");
} finally {
  setLoading(false);
}

};

return ( <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 p-6">

  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Create Account ✨
    </h2>

    {/* Name */}
    <input
      placeholder="Enter Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-3 mb-3 rounded-xl bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 mb-3 rounded-xl bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 mb-3 rounded-xl bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    {/* Error */}
    {error && (
      <p className="text-red-300 text-sm mb-3 text-center">
        {error}
      </p>
    )}

    {/* Button */}
    <button
      onClick={handleRegister}
      disabled={loading}
      className={`w-full py-3 rounded-xl font-semibold transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
      }`}
    >
      {loading ? "Creating..." : "Register"}
    </button>

    {/* Login Link */}
    <p className="text-sm text-gray-200 mt-5 text-center">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-indigo-300 cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>

  </div>
</div>

);
};

export default Register;
