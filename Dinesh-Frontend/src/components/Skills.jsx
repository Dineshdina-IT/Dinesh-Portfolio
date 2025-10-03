import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Skills() {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedSkill, setEditedSkill] = useState({ name: "", level: 0 });

  useEffect(() => {
    axios.get(`${API_URL}/api/skills`).then((res) => setSkills(res.data)).catch(console.error);
  }, []);

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setEditedSkill({ name: skill.name, level: skill.level });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedSkill({});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${API_URL}/api/skills/${id}`, editedSkill, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(skills.map((s) => (s._id === id ? { ...s, ...editedSkill } : s)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update skill");
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-[#393E46]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">My Skills</h2>
        <div className="w-20 h-1 bg-[#FFD369] mx-auto mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <motion.div key={skill._id} className="bg-[#222831] rounded-xl p-6 text-center shadow-lg relative">
              {editingId === skill._id ? (
                <>
                  <input value={editedSkill.name} onChange={(e) => setEditedSkill({ ...editedSkill, name: e.target.value })} className="w-full mb-2 p-1 rounded text-black text-center" />
                  <input type="number" value={editedSkill.level} onChange={(e) => setEditedSkill({ ...editedSkill, level: e.target.value })} className="w-full mb-2 p-1 rounded text-black text-center" />
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(skill._id)} className="flex items-center gap-1 px-3 py-2 bg-yellow-400 rounded"><FaSave /> Save</button>
                    <button onClick={handleCancel} className="flex items-center gap-1 px-3 py-2 bg-red-500 rounded"><FaTimes /> Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#EEEEEE]">{skill.name}</h3>
                  <div className="w-full bg-[#393E46] rounded-full h-2.5 mb-2">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} className="bg-[#FFD369] h-2.5 rounded-full" />
                  </div>
                  <span className="text-sm text-[#EEEEEE]/80">{skill.level}%</span>
                  {user?.isAdmin && (
                    <button onClick={() => handleEdit(skill)} className="absolute top-2 right-2 bg-yellow-400 rounded px-2 py-1 text-gray-900"><FaEdit /></button>
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
