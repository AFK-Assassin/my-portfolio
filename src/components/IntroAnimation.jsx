import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const greet = [
    "Hello",
    "Hola",
    "Bonjour",
    "Ciao",
    "Hallo",
    "Konnichiwa",
    "Nihao",
    "Annyeonghaseyo",
    "Privet",
    "Ola",
    "Marhaban",
    "Namaste",
    "Merhaba",
    "Yiasou",
    "Salam",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    if (index < greet.length - 1) {
      const id = setInterval(() => {
        setIndex((i) => i + 1);
      }, 200); // change greeting every 0.3s

      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 300); // fade out after last
      return () => clearTimeout(t);
    }
  }, [index, visible, greet.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[999] text-white bg-black overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {greet[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
