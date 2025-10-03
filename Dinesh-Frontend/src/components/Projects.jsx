import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaEdit, FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProject, setEditedProject] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  const handleEdit = (project) => {
    setEditingId(project._id);
    setEditedProject({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      github: project.github,
      live: project.live,
      image: project.image
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProject({});
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        ...editedProject,
        tags: editedProject.tags.split(",").map(t => t.trim())
      };

      await axios.put(`${API_URL}/api/projects/${id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setProjects(projects.map(p => p._id === id ? { ...p, ...payload } : p));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update project");
    }
  };

  return (
    <section id="projects" className="py-20 px-4 bg-[#222831]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">My Projects</h2>
        <div className="w-20 h-1 bg-[#FFD369] mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div key={project._id} className="bg-[#393E46] rounded-xl overflow-hidden shadow-lg relative">
              {editingId === project._id ? (
                <div className="p-6 text-left">
                  <input
                    value={editedProject.title}
                    onChange={e => setEditedProject({ ...editedProject, title: e.target.value })}
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <textarea
                    value={editedProject.description}
                    onChange={e => setEditedProject({ ...editedProject, description: e.target.value })}
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <input
                    value={editedProject.tags}
                    onChange={e => setEditedProject({ ...editedProject, tags: e.target.value })}
                    placeholder="tags comma separated"
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <input
                    value={editedProject.github}
                    onChange={e => setEditedProject({ ...editedProject, github: e.target.value })}
                    placeholder="GitHub Link"
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <input
                    value={editedProject.live}
                    onChange={e => setEditedProject({ ...editedProject, live: e.target.value })}
                    placeholder="Live Demo Link"
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <input
                    value={editedProject.image}
                    onChange={e => setEditedProject({ ...editedProject, image: e.target.value })}
                    placeholder="Image URL"
                    className="w-full mb-2 p-1 rounded text-black"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleSave(project._id)} className="flex items-center gap-1 px-3 py-2 bg-yellow-400 rounded">
                      <FaSave /> Save
                    </button>
                    <button onClick={handleCancel} className="flex items-center gap-1 px-3 py-2 bg-red-500 rounded">
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-48 overflow-hidden">
                    <motion.img src={project.image || "./Hero.jpg"} alt={project.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2 text-[#EEEEEE]">{project.title}</h3>
                    <p className="text-[#EEEEEE]/80 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#222831] text-[#FFD369] text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#EEEEEE] hover:text-[#FFD369]"><FiGithub className="mr-2" /> Code</a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#EEEEEE] hover:text-[#FFD369]"><FiExternalLink className="mr-2" /> Live Demo</a>
                    </div>
                    {user?.isAdmin && (
                      <button onClick={() => handleEdit(project)} className="absolute top-2 right-2 bg-yellow-400 rounded px-2 py-1 text-gray-900"><FaEdit /></button>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
