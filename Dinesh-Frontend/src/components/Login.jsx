import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Experience from "./Experience";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const form = useRef();
  const { login, user } = useContext(AuthContext); // get user from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      login(res.data.user, res.data.token);
      setEmail("");
      setPassword("");
    //   alert("✅ Login successful!");
    } catch (err) {
      alert(err.response?.data.error || "Something went wrong");
    }
  };

  // If logged in, render main app components
  if (user) {
    return (
      <div className="bg-gray-100 text-gray-800">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    );
  }

  // Otherwise, render login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Login</h2>
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
          Login
        </button>

        {/* Sign Up link */}
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => (window.location.href = "/register")}
            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
        
<button
  type="button"
  onClick={() => window.location.href = "/"}
  className="w-full py-3 bg-gray-600 text-gray-100 font-semibold rounded-lg hover:bg-gray-700 transition-all"
>
  Back to Home
</button>

      </form>
    </div>
  );
}
