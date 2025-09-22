import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

export default function Contact() {
  const form = useRef();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData);

    // 🔑 check for JWT token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first before sending a message.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/contact`,
        {
          name: data.user_name,
          email: data.user_email,
          message: data.message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert(`✅ Thanks for your message, ${data.user_name}! I'll get back to you soon.`);
        form.current.reset();
      } else {
        alert("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Try again later.");
    }
  };

  // Floating animation
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-[#222831] to-[#393E46] relative overflow-hidden"
    >
      {/* floating circles */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-[#FFD369]/20"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute bottom-1/3 right-20 w-12 h-12 rounded-full bg-[#FFD369]/10"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-[#FFD369]/15"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">
            Let's <span className="text-[#EEEEEE]">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-[#FFD369] mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="lg:w-1/2 bg-[#393E46]/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#FFD369]/10 hover:border-[#FFD369]/30 transition-all"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#FFD369]">
              Send Me a Message
            </h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[#EEEEEE]">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-[#222831] border border-[#393E46] rounded-lg focus:border-[#FFD369] focus:outline-none text-[#EEEEEE] transition-all placeholder-[#EEEEEE]/40"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#EEEEEE]">Your Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-[#222831] border border-[#393E46] rounded-lg focus:border-[#FFD369] focus:outline-none text-[#EEEEEE] transition-all placeholder-[#EEEEEE]/40"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#EEEEEE]">Your Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-[#222831] border border-[#393E46] rounded-lg focus:border-[#FFD369] focus:outline-none text-[#EEEEEE] transition-all placeholder-[#EEEEEE]/40"
                  placeholder="What would you like to say?"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD369] to-[#f8c247] text-[#222831] font-semibold rounded-lg transition-all duration-300 shadow-lg w-full"
              >
                <FaPaperPlane /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
