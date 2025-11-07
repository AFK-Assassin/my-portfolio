import { motion, useAnimation } from "framer-motion";
import React from "react";
import { FaRegCircle } from "react-icons/fa";
import portfolio from "../assets/portfolio_mb.png";
import Rentooz from "../assets/Rentooz.png";
import Blog from "../assets/blog.png";
import Todo from "../assets/todo.png";

export default function Projects() {
  const cards = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];

  const handleHover = (index) => cards[index].start({ y: "0%" });
  const handleHoverEnd = (index) => cards[index].start({ y: "100%" });

  const projects = [
    { title: "Portfolio", img: portfolio, link: "https://github.com/AFK-Assassin/my-portfolio" },
    { title: "Rentooz", img: Rentooz, link: "https://github.com/AFK-Assassin/Rentooz" },
    { title: "Blog App", img: Blog, link: "https://github.com/AFK-Assassin/faltu_blogs" },
    { title: "Todo", img: Todo, link: "https://github.com/AFK-Assassin/todo_list" },
  ];

  return (
    <section className="relative w-full py-20 bg-black text-white overflow-hidden">
      {/* ==== BLOBS ==== */}
      {[
        { top: "10%", left: "10%", delay: 0 },
        { top: "10%", right: "10%", delay: 2 },
        { bottom: "0%", left: "10%", delay: 4 },
        { bottom: "0%", right: "10%", delay: 6 },
        { top: "50%", left: "50%", delay: 1 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute h-[220px] w-[220px] rounded-full opacity-40 blur-[160px] bg-gradient-to-tr from-[#1cd8d2] via-[#0fe3c0] to-[#00bf8f] animate-pulse"
          style={{ top: b.top, left: b.left, right: b.right }}
          animate={{
            y: ["0%", "10%", "0%"],
            x: ["0%", "10%", "0%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}

      {/* ==== SECTION HEADER ==== */}
      <div className="relative z-10 border-b border-zinc-700 pb-10 px-6 md:px-10">
        <h1 className='text-4xl md:text-6xl font-["neue_Montreal"] text-center md:text-left'>
          Featured Projects
        </h1>
      </div>

      {/* ==== PROJECT GRID ==== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 px-6 md:px-10 mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <div key={i} className="w-full">
              <div className="flex gap-2 items-center mb-5">
                <FaRegCircle className="text-[10px] md:text-[12px]" />
                <h5 className="uppercase text-sm md:text-md">{project.title}</h5>
              </div>

              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  onMouseEnter={() => handleHover(i)}
                  onMouseLeave={() => handleHoverEnd(i)}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
                >
                  <div className="card relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden z-0">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={project.img}
                      alt={project.title}
                    />
                  </div>

                  {/* ==== CENTERED HOVER TITLE ==== */}
                  <h1
                    className="absolute flex overflow-hidden bg-gradient-to-r from-[#7EF29D] via-[#0FE3C0] to-[#1cd8d2] 
                    bg-clip-text text-transparent text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
                    uppercase z-20 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    {project.title.split("").map((ch, j) => (
                      <motion.span
                        key={j}
                        initial={{ y: "100%" }}
                        animate={cards[i]}
                        transition={{
                          ease: [0.61, 1, 0.88, 1],
                          delay: j * 0.01,
                        }}
                        className="inline-block"
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

