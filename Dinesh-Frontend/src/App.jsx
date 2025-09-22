import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Experience from "./components/Experience";

import Login from "./components/Login";       // new
import Register from "./components/Register"; // new

function App() {
  return (
    <Router>
      <Routes>
        {/* Portfolio main page */}
        <Route
          path="/"
          element={
            <div className="bg-gray-100 text-gray-800">
              <Navbar />
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </div>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
