import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

export default function Footer() {
  const socials = [
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/l_azyzen/",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/AFK-Assassin",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/zunaid-mullick-a9b9a6305/",
    },
  ];

  return (
    <footer className="relative bg-black text-gray-300 py-16 overflow-hidden">
      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-20 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-25 blur-[120px]"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 h-[220px] w-[220px] rounded-full bg-gradient-to-r from-[#0D58CC] to-[#00bf8f] opacity-25 blur-[130px]"
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          Zunaid Mullick
        </h1>

        {/* Gradient underline */}
        <div className="h-[3px] w-24 md:w-32 mt-4 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400 shadow-[0_0_20px_rgba(45,212,191,0.3)]"></div>

        {/* Social Icons */}
        <div className="flex space-x-8 mt-10">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{
                scale: 1.2,
                color: "#22d3ee",
                textShadow: "0px 0px 8px rgba(34,211,238,0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl text-gray-400 transition-colors duration-300 hover:text-cyan-400"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-400 mt-10 italic max-w-xl leading-relaxed">
          “Success is when preparation meets opportunity.”
        </p>

        {/* Divider */}
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Zunaid Mullick. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
