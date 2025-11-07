
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen'>Home</div>
  )
}

export default Home

import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import { useEffect, useMemo, useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import avator from "../assets/avator.png"

export default function Home() {
  const roles = useMemo(() => ["Web Developer", "Software Developer"], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const socials = [
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/l_azyzen/" },
    { icon: FaLinkedin, label: "Linkdin", href: "https://www.linkedin.com/in/zunaid-mullick-a9b9a6305/" },
    { icon: FaGithub, label: "Github", href: "https://github.com/AFK-Assassin" },
  ];

  const glowVariant = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))" },
    hover: {
      scale: 1.2,
      y: 0,
      filter:
        "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex(v => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex(v => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [roles, index, subIndex, deleting]);

  return (
    <section  className=" min-h-screen w-full pt-15 relative bg-black overflow-hidden" id="home">
      <ParticleBackground />

      {/* Blurred glowing background circles */}
      <div className="inset-0 absolute">
        <div
          className="absolute -top-32 -left-32 h-[70vw] sm:w-[50vw] md:w-[40vw]
          w-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-25 rounded-full blur-[100px] animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 h-[70vw] sm:h-[50vw] md:h-[40vw]
          w-[70vw] sm:w-[50vw] md:w-[40vw] max-w-[500px] max-h-[500px]
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-25 rounded-full blur-[100px] animate-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 mt-1  h-full w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2">
        <div id="left" className="relative flex flex-col h-full justify-center text-center lg:text-left">
          <div className="lg:pr-10 mx-auto w-full max-w-[48rem]">

            {/* Typewriter Text */}
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl min-h-[1.6em] mx-auto lg:m-0 font-semibold pb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>
                {roles[index].substring(0, subIndex)}
                <span
                  className="inline-block bg-white w-[2px] animate-pulse ml-1 align-middle max-h-[1.5em]"
                  style={{ height: "1em" }}
                ></span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="tracking-tight font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
            >
              Hello, I'm
              <br />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap"
              >
                Zunaid Mullick
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              I’m a developer who turns ideas into sleek, high-performing web experiences —
              where logic meets creativity and passion drives results.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              id="buttons"
              className="flex flex-wrap text-center justify-center lg:justify-start gap-6 my-10"
            >
              <a
                href="#projects"
                className="py-2 px-4 font-medium tracking-tight text-xl text-white rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-[0_0_15px_#00bf8f] hover:opacity-90 transform hover:scale-110 transition-all duration-300"
              >
                View My Work
              </a>
              <a
                href="./resume.pdf"
                download
                className="py-2 px-4 font-medium text-xl tracking-tight text-black bg-white rounded-full shadow-2xl hover:opacity-90 transform hover:scale-110 transition-all duration-300"
              >
                My Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <div id="socials" className="space-x-6 mt-5 flex justify-center lg:justify-start">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a               
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariant}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-400 text-3xl"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

          </div>
        </div>
        <div className="absolute top-1/2 right-20 -translate-y-1/2 select-none pointer-events-none">
            <motion.img
              src={avator}
              alt="Zunaid Avatar"
              className="object-contain w-[30vw] max-w-[420px] drop-shadow-[0_0_25px_rgba(0,191,143,0.6)] hidden lg:block "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>

      </div>

    </section>
  );
}

