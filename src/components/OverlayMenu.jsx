// Import motion and AnimatePresence for animation control from Framer Motion
import { AnimatePresence, motion } from "framer-motion";
// Import close icon from react-icons
import { IoMdCloseCircleOutline } from "react-icons/io";

// OverlayMenu component receives two props:
// isOpen → controls if the menu is visible
// onClose → function to close the menu
export default function OverlayMenu({ isOpen, onClose }) {
  // Array of menu items to be rendered dynamically
  const menuItems = ["Home", "About", "Projects", "Skills", "Contact"];

  // Determine where the animation should start
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 6%" : "50% 8%"; // top-right for mobile, top-center for desktop

  return (
    // AnimatePresence ensures smooth enter/exit animations
    <AnimatePresence>
      {/* Only render the menu when isOpen is true */}
      {isOpen && (
        // motion.div allows animation of the overlay itself
        <motion.div
          // Circular reveal animation — dynamically changes based on screen size
          initial={{ clipPath: `circle(0% at ${origin})` }} // Starts invisible
          animate={{ clipPath: `circle(150% at ${origin})` }} // Expands to full screen
          exit={{ clipPath: `circle(0% at ${origin})` }} // Shrinks back on close
          transition={{
            duration: 0.9, // Smooth timing
            ease: [0.76, 0, 0.24, 1], // Bezier for fluid animation
          }}
          className="fixed inset-0 flex flex-col items-center justify-center 
          bg-black/70 backdrop-blur-lg text-white z-50"
          // fixed → covers the entire viewport
          // bg-black/70 → semi-transparent dark background
          // backdrop-blur-lg → gives a strong blur effect
          // z-50 → ensures it appears on top of everything
        >
          {/* Close Button (top-right corner) */}
          <button
            onClick={onClose} // Closes the menu when clicked
            className="absolute top-6 right-6 text-3xl 
            hover:scale-110 hover:text-cyan-400 transition-transform duration-300"
            aria-label="close menu"
          >
            <IoMdCloseCircleOutline /> {/* Close icon */}
          </button>

          {/* Menu List */}
          <ul className="space-y-8 text-center">
            {/* Loop through each menu item */}
            {menuItems.map((item, index) => (
              <motion.li
                key={item} // Unique key for each item
                // Animation for each list item (fade-in + slide-up)
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1, // Small stagger per item
                  duration: 0.4,
                }}
                className="text-3xl font-semibold 
                hover:text-cyan-400 transition-colors duration-300"
              >
                {/* Anchor link to sections */}
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

