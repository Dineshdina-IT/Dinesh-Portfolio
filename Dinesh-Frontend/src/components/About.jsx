import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 w-full bg-[#393E46]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD369]">About Me</h2>
          <div className="w-20 h-1 bg-[#FFD369] mx-auto"></div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <p className="text-lg md:text-xl text-[#EEEEEE] mb-6 leading-relaxed">
              Hello! I'm <span className="text-[#FFD369] font-medium">Dinesh </span>, a passionate frontend developer specializing in creating modern, responsive web applications. With expertise in <span className="text-[#FFD369]">React</span> and <span className="text-[#FFD369]">Tailwind CSS</span>, I build intuitive user interfaces that deliver exceptional experiences.
            </p>
            <p className="text-lg md:text-xl text-[#EEEEEE] mb-8 leading-relaxed">
              My approach combines clean code with thoughtful design, ensuring websites are not only functional but also visually stunning. I'm constantly learning new technologies to stay at the forefront of web development.
            </p>
            
            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#EEEEEE]">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Git', 'Responsive Design', 'Problem Solving'].map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-[#222831] text-[#FFD369] rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Download CV Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/CV.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-[#FFD369] text-[#222831] font-semibold rounded-lg hover:bg-[#f8c247] transition-all duration-300 shadow-lg"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:w-1/3 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-lg border-4 border-[#FFD369] overflow-hidden shadow-2xl">
                <img 
                  src="pic.png" 
                  alt="saqib"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -inset-4 rounded-lg border-2 border-[#FFD369] opacity-20 animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}