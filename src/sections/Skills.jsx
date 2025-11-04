import { motion } from "framer-motion";
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

  const repeated = [...skills, ...skills];

  return (
    <section
      id="skills"
      className="relative w-full h-1/2 py-10 bg-black flex flex-col items-center justify-center overflow-hidden "
    >
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

      <div className="relative w-full py-5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-10 text-[#1cd8d2]"
        >
          {repeated.map((s, i) => (
            <div
              className="text-5xl flex flex-col items-center min-w-[120px] "
              key={i}
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
