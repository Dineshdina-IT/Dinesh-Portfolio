import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 bg-[#222831]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">My Projects</h2>
          <div className="w-20 h-1 bg-[#FFD369] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-[#393E46] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <motion.img src={project.image || "./Hero.jpg"} alt={project.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-[#EEEEEE]">{project.title}</h3>
                <p className="text-[#EEEEEE]/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-[#222831] text-[#FFD369] text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#EEEEEE] hover:text-[#FFD369] transition-colors">
                    <FiGithub className="mr-2" /> Code
                  </a>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#EEEEEE] hover:text-[#FFD369] transition-colors">
                    <FiExternalLink className="mr-2" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
