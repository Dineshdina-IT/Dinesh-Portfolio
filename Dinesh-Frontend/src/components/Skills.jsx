import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaReact, FaGitAlt, FaEdit ,FaTimes , FaSave } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiHtml5, SiCss3 } from "react-icons/si";
import { RiNodejsFill } from "react-icons/ri";
import axios from "axios";
import { AuthContext } from "./AuthContaxt";

const iconMap = {
  HTML: <SiHtml5 className="text-4xl" />,
  CSS: <SiCss3 className="text-4xl" />,
  Tailwind: <SiTailwindcss className="text-4xl" />,
  JavaScript: <SiJavascript className="text-4xl" />,
  React: <FaReact className="text-4xl" />,
  Git: <FaGitAlt className="text-4xl" />,
  Nodejs: <RiNodejsFill className="text-4xl" />,
};

const API_URL = import.meta.env.VITE_API_URL;

export default function Skills() {
  const { user } = useContext(AuthContext); // check if logged in
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null); // track which skill is being edited
  const [editedSkill, setEditedSkill] = useState({ name: "", level: 0 });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/skills`)
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setEditedSkill({ name: skill.name, level: skill.level });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedSkill({ });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${API_URL}/api/skills/${id}`, editedSkill, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(
        skills.map((s) => (s._id === id ? { ...s, ...editedSkill } : s))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update skill");
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-[#393E46]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-[#FFD369] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#222831] rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all relative"
            >
              <div className="text-[#FFD369] mb-4 flex justify-center">
                {iconMap[skill.name] || (
                  <span className="text-4xl">{skill.name}</span>
                )}
              </div>

              {editingId === skill._id ? (
                <>
                  <input
                    value={editedSkill.name}
                    onChange={(e) =>
                      setEditedSkill({ ...editedSkill, name: e.target.value })
                    }
                    className="w-full mb-2 p-1 rounded text-black text-center"
                  />
                  <input
                    type="number"
                    value={editedSkill.level}
                    onChange={(e) =>
                      setEditedSkill({ ...editedSkill, level: e.target.value })
                    }
                    className="w-full mb-2 p-1 rounded text-black text-center"
                  />
                  <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(skill._id)}
                    type="button"
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-400 text-gray-900 rounded hover:scale-105 transition-all"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:scale-105 transition-all"
                  >
                    <FaTimes /> Cancel
                  </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#EEEEEE]">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-[#393E46] rounded-full h-2.5 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="bg-[#FFD369] h-2.5 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-[#EEEEEE]/80">
                    {skill.level}%
                  </span>
                  {user && (
                    <button
                      onClick={() => handleEdit(skill)}
                      className="absolute top-2 right-2 text-sm px-2 py-1 bg-yellow-400 text-gray-900 rounded hover:scale-105 transition-all"
                    >
                      <FaEdit />
                    </button>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
