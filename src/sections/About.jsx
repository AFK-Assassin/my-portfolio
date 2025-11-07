import React from "react";
import boy from "../assets/boy.png";
import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { label: "Experience", value: "Fresher" },
    { label: "Speciality", value: "Frontend" },
    { label: "Focus", value: "Performance & UX" },
  ];

  const glows = [
    "top-10 left-10 h-[200px] w-[200px] opacity-30 blur-[120px] from-[#00bf8f] to-[#1cd8d2]",
    "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[150px] w-[150px] opacity-20 blur-[140px] from-[#302b63] to-[#00bf8f]",
    "bottom-20 right-20 h-[220px] w-[220px] opacity-40 blur-[160px] from-[#1cd8d2] to-[#00bf8f]",
  ];

  return (
    <section
      id="about"
      className="w-full min-h-screen relative bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute ${c} rounded-full bg-gradient-to-r animate-pulse`}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto px-6 md:px-10 lg:px-12 w-full max-w-6xl py-20 gap-10 flex flex-col">

        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center sm:items-stretch gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-[200px] w-[200px] rounded-2xl overflow-hidden border border-transparent bg-clip-padding backdrop-blur-sm transition-all duration-500 hover:border-[#00bf8f]/60 hover:shadow-[0_0_20px_#00bf8f50]"
          >
            <img
              src={boy}
              alt="profile"
              className="absolute inset-0 object-cover object-center"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            className="flex flex-1 flex-col justify-center text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] tracking-tight">
              Zunaid Mullick
            </h1>
            <h4 className="text-2xl font-semibold md:text-3xl py-5">
              Web Developer
            </h4>
            <p className="flex justify-center max-w-3xl text-xl md:text-lg leading-relaxed tracking-tight">
              Frontend Developer skilled in React, JavaScript, Tailwind CSS, and
              Bootstrap with backend knowledge in Python and Flask. Focused on
              building responsive, user-friendly interfaces with clean,
              maintainable code. Experienced in creating full-stack projects
              using Flask and React. Currently enhancing backend and API
              integration skills to become a full-stack developer.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
              {stats.map((items, i) => (
                <motion.div
                  key={i}
                  className="text-sm text-center border border-white/10 bg-white/5 rounded-xl py-5 px-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-stone-400 text-sm mb-2">
                    {items.label}
                  </div>
                  <div className="font-semibold text-base">{items.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-5 lg:justify-start sm:justify-center">
              <a
                className="py-3 px-6 bg-white border border-white/5 text-black rounded-2xl font-semibold hover:opacity-90 transform hover:scale-110 transition-all duration-300"
                href="project"
              >
                View Projects
              </a>
              <a
                className="py-3 px-6 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:opacity-90 transform hover:scale-110 transition-all duration-300"
                href="contact"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* About Me section */}
        <motion.div
          className="mt-10 flex flex-col items-start text-left sm:items-center sm:text-center lg:items-start lg:text-left max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            About Me
          </motion.h1>

          <motion.p
            className="text-gray-300 leading-relaxed text-lg max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            I love crafting web experiences that feel intuitive and alive. Every
            project is a chance to learn something new and make something
            better. Whether I’m refining a design detail or optimizing
            performance, I care about building things that people enjoy using —
            simple, fast, and meaningful.
          </motion.p>

          <motion.p
            className="mt-3 text-lg text-[#00bf8f] font-medium italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            “Always learning, always building — one line of code at a time.”
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
