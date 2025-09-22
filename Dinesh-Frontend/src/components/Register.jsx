import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      alert("✅ Registration successful! Please login.");
    } catch (err) {
      alert(err.response?.data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Register</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-semibold rounded-lg hover:scale-105 transition-all"
        >
          Register
        </button>
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
