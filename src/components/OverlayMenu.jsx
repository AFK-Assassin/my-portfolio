import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function OverlayMenu({ isOpen, onClose }) {
  const menuItems = ["Home", "About", "Projects", "Skills", "Contact"];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 6%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // keep the same circular reveal — just smoother
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{
            clipPath: `circle(150% at ${origin})`,
            transition: {
              duration: 1.2, // smoother and slower
              ease: [0.22, 1, 0.36, 1], // soft acceleration/deceleration
            },
          }}
          exit={{
            clipPath: `circle(0% at ${origin})`,
            transition: {
              duration: 1.1, // same smooth duration for reverse
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 flex flex-col items-center justify-center 
          bg-black/70 backdrop-blur-lg text-white z-50"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-3xl 
            hover:scale-110 hover:text-cyan-400 transition-transform duration-300"
            aria-label="close menu"
          >
            <IoMdCloseCircleOutline />
          </button>

          {/* Menu List */}
          <ul className="space-y-8 text-center">
            {menuItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  delay: 0.25 + index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="text-3xl font-semibold 
                hover:text-cyan-400 transition-colors duration-300"
              >
                <a href={`#${item.toLowerCase()}`} onClick={onClose}>
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
