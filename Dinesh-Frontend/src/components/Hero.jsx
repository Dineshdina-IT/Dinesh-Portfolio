import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#FFD369" },
          shape: { type: "circle" },
          opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1 } },
          size: { value: 4, random: true, anim: { enable: true, speed: 4 } },
          line_linked: { enable: true, distance: 150, color: "#393E46", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: true }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
          }
        }
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#222831]">
      {/* Particles Background */}
      <div id="particles-js" className="absolute inset-0 opacity-70" />

      {/* Content Container */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Content - Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#EEEEEE]">
              Hi, I'm <span className="text-[#FFD369]">Dinesh</span>
            </h1>
            
            <div className="text-xl md:text-2xl min-h-[2rem] text-[#EEEEEE] mb-4 font-mono">
              <TypeAnimation
                sequence={[
                  'Software Engineer',
                  1500,
                  'Frontend Developer',
                  1500,
                  'React Developer',
                  1500,
                  'Tailwind CSS Expert',
                  1500
                ]}
                speed={30}
                deletionSpeed={20}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="inline-block"
                style={{ textShadow: '0 0 8px rgba(255, 211, 105, 0.3)' }}
              />
            </div>

            {/* New Professional Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-[#EEEEEE] mb-8 max-w-lg leading-relaxed"
            >
              I craft beautiful, responsive web experiences with modern technologies. 
              Passionate about creating intuitive user interfaces and seamless interactions 
              that blend form and function.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#FFD369] text-[#222831] font-semibold rounded-lg hover:bg-[#f8c247] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
             <a href="#projects"> View My Work</a>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Profile Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 5, 0],
                y: [0, -10, 10, -10, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full border-4 border-[#FFD369] overflow-hidden shadow-2xl"
            >
              <img 
                src="Hero.jpg" 
                alt="saqib"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </motion.div>
            <div className="absolute -inset-4 rounded-full border-2 border-[#FFD369] opacity-20 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}