
import React from 'react'
import { motion, useMotionValue } from "framer-motion";
import { FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiMongodb,
  SiAngular,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { useEffect, useState, useRef } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
  ];

  const repeated = [...skills, ...skills]; // duplicated array for seamless looping

  const [dir, setDir] = useState(-1); // animation direction
  const [active, setActive] = useState(false); // whether section is visible in viewport

  const sectionRef = useRef(null); // section reference
  const trackRef = useRef(null); // animation track reference
  const touchY = useRef(null); // for touch start position
  const x = useMotionValue(0); // x-axis animation position

  // 👁️ Track if section is visible in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { threshold: [0.1] }
    );

    io.observe(el); // start observing section visibility
    return () => io.disconnect(); // cleanup observer on unmount
  }, []);

  // 🖱️ Handle wheel and touch events to change scroll direction
  useEffect(() => {
    if (!active) return; // only listen when section is visible

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1); // scroll down → -1, up → +1

    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY); // record initial touch
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1); // swipe down → +1, swipe up → -1
      touchY.current = e.touches[0].clientY; // update touch position
    };

    // register listeners
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // cleanup listeners
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // ⚙️ Continuous animation loop
  useEffect(() => {
    if (!active) return; // pause animation when section not visible

    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000; // time difference in seconds
      last = now;
      let next = x.get() + SPEED * dt * dir; // move icons based on speed and direction
      const loop = (trackRef.current?.scrollWidth ?? 0) / 2; // get half track width for looping

      if (loop) {
        if (next <= -loop) next += loop; // reset when left edge reached
        if (next > 0) next -= loop; // reset when right edge reached
      }

      x.set(next); // update position
      id = requestAnimationFrame(tick); // continue animation
    };

    id = requestAnimationFrame(tick); // start animation
    return () => cancelAnimationFrame(id); // stop on unmount
  }, [dir, x, active]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full h-1/2 py-10 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient background glows */}
      <div className="inset-0 absolute pointer-events-none">
        <div className="absolute left-0 top-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-40 animate-pulse blur-[100px]" />
        <div className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-40 animate-pulse blur-[100px]" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-5xl sm:px-3 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
      >
        My Skills
      </motion.h1>

      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xs md:text-lg sm:px-3 py-5 mx-auto flex flex-nowrap"
      >
        Modern Applications | Modern Technologies
      </motion.h4>

      {/* Skill icons loop */}
      <div className="relative w-full py-5 overflow-hidden">
        <motion.div
          ref={trackRef}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-10 text-[#1cd8d2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="text-5xl flex flex-col items-center min-w-[120px]"
            >
              <span className="hover:scale-125 transition-transform duration-300 text-[#1cd8d2]">
                {s.icon}
              </span>
              <span className="text-sm pt-5">{s.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

