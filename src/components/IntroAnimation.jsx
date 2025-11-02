import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";


export default function IntroAnimation({ onFinish }) {
 const messages = useMemo(
    () => [
      "Initializing Lazy Zen OS...",
      "Connecting to neural interface...",
      "Decrypting environment variables...",
      "Boot sequence online...",
      "Access Granted ✓",
    ],
    []
  );

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  // Simulated loading progress
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 1200); // smooth fade after 100%
          return 100;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [visible]);

  // Update typewriter message based on progress
  useEffect(() => {
    const idx = Math.min(messages.length - 1, Math.floor(progress / 25));
    setMessageIndex(idx);
    let i = 0;
    const text = messages[idx];
    setDisplayed("");
    const typer = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typer);
    }, 30);
    return () => clearInterval(typer);
  }, [progress , messages]);

  // Skip intro with click or ESC key
  useEffect(() => {
    const skip = () => setVisible(false);
    const handleKey = (e) => e.key === "Escape" && skip();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", skip);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-green-400 font-mono z-[999]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Matrix-style background */}
          <div className="absolute inset-0 overflow-hidden text-green-700/20 text-xs select-none pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-700/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 100}%`,
                  whiteSpace: "pre",
                }}
                animate={{ y: ["-10%", "110%"] }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 3,
                }}
              >
                {Array.from({ length: 15 })
                  .map(
                    () =>
                      String.fromCharCode(0x30A0 + Math.random() * 96) // katakana chars
                  )
                  .join("\n")}
              </motion.div>
            ))}
          </div>

          {/* Glitch logo */}
          <motion.div
            className="relative mb-10 text-4xl md:text-6xl font-bold text-center select-none"
            animate={{
              opacity: [0.8, 1, 0.8],
              textShadow: [
                "0 0 10px #00ff99, 0 0 20px #00ff99",
                "0 0 15px #00ffaa, 0 0 25px #00ffaa",
                "0 0 10px #00ff99, 0 0 20px #00ff99",
              ],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <span className="relative inline-block">
              <span className="absolute left-0 top-0 text-green-500 blur-[1px] animate-pulse">
                LAZY ZEN
              </span>
              <span className="text-green-400">LAZY ZEN</span>
            </span>
          </motion.div>

          {/* Typewriter effect */}
          <motion.div
            key={messageIndex}
            className="text-lg sm:text-2xl mb-8 tracking-wide text-green-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.7, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {displayed}
            <motion.span
              className="inline-block w-2 bg-green-400 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-3/4 max-w-md bg-green-900/40 h-2 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(0,255,0,0.7)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="mt-3 text-sm opacity-80">
            Loading... {Math.floor(progress)}%
          </div>

          {/* Skip hint */}
          <div className="absolute bottom-8 text-xs opacity-50">
            [ Press ESC or click to skip ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
