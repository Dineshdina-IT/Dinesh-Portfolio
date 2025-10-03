import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from "axios";
import { AuthContext } from "./AuthContext";

const iconMap = {
  education: <FaGraduationCap />,
  experience: <FaBriefcase />
};

export default function Experience() {
  const { user } = useContext(AuthContext); // check admin
  const [timeline, setTimeline] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/experience")
      .then(res => setTimeline(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (index, item) => {
    setEditIndex(index);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/experience/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const updatedTimeline = timeline.map(item =>
          item._id === id ? editData : item
        );
        setTimeline(updatedTimeline);
        setEditIndex(null);
        setEditData({});
        alert("✅ Experience updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to update experience");
    }
  };

  return (
    <section id="experience" className="py-20 px-4 bg-[#222831] relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">Experience & Education</h2>
          <div className="w-20 h-1 bg-[#FFD369] mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#FFD369]/20"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
            >
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center
                ${item.type === 'education' ? 'bg-[#FFD369] text-[#222831]' : 'bg-[#393E46] text-[#FFD369] border-2 border-[#FFD369]'}`}>
                {iconMap[item.type]}
              </div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 211, 105, 0.2)' }}
                className={`w-5/12 p-6 rounded-xl ${item.type === 'education' ? 'bg-[#393E46]' : 'bg-[#393E46]/90'} border border-[#FFD369]/10 hover:border-[#FFD369]/30 transition-all relative`}
              >
                {editIndex === index ? (
                  <>
                    <input name="title" value={editData.title} onChange={handleChange} className="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-gray-100 border border-yellow-400" />
                    <input name="institution" value={editData.institution} onChange={handleChange} className="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-gray-100 border border-yellow-400" />
                    <input name="period" value={editData.period} onChange={handleChange} className="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-gray-100 border border-yellow-400" />
                    <textarea name="description" value={editData.description} onChange={handleChange} className="w-full mb-2 px-2 py-1 rounded bg-gray-700 text-gray-100 border border-yellow-400" />
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(item._id)} className="flex items-center gap-1 px-3 py-2 bg-yellow-400 text-gray-900 rounded"><FaSave /> Save</button>
                      <button onClick={handleCancel} className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded"><FaTimes /> Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`flex items-center gap-2 mb-2 ${item.type === 'education' ? 'text-[#FFD369]' : 'text-[#EEEEEE]'}`}>
                      {iconMap[item.type]}
                      <span className="font-semibold">{item.type === 'education' ? 'Education' : 'Experience'}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-[#EEEEEE]">{item.title}</h3>
                    <p className="text-[#FFD369] mb-2">{item.institution}</p>
                    <p className="text-sm text-[#EEEEEE]/80 mb-3">{item.period}</p>
                    <p className="text-[#EEEEEE]/90">{item.description}</p>

                    {/* Edit button only for admin */}
                    {user?.isAdmin && (
                      <button onClick={() => handleEditClick(index, item)} className="absolute top-4 right-4 text-yellow-400"><FaEdit /></button>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
