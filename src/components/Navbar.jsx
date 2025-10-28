import { useEffect, useRef, useState, useCallback } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/Z_logo.png";
import { CgMenuRound } from "react-icons/cg";

export default function Navbar() {
  // Controls overlay menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar visibility
  const [visible, setVisible] = useState(true);
  const [isHomeVisible, setIsHomeVisible] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  /** --- HANDLE INTERSECTION OF HOME SECTION --- **/
  useEffect(() => {
    const homeSection = document.querySelector("#home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHomeVisible(true);
          setVisible(true);
        } else {
          setIsHomeVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, []);

  /** --- SCROLL BEHAVIOR --- **/
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Always show when home is visible
    if (isHomeVisible) {
      setVisible(true);
      lastScrollY.current = currentScrollY;
      // Always clear any running timer
      if (hideTimer.current) clearTimeout(hideTimer.current);
      return;
    }

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY.current) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    // Only start timer if NOT on home
    if (!isHomeVisible) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }

    lastScrollY.current = currentScrollY;
  }, [isHomeVisible]);

  /** --- ATTACH SCROLL LISTENER --- **/
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimer.current);
    };
  }, [handleScroll]);

  /** --- JSX --- **/
  return (
    <>
      <nav
        className={`w-full fixed px-6 py-2 z-50 flex items-center justify-between 
        backdrop-blur-md
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Left section: Logo */}
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 object-contain"
            src={logo}
            alt="Zunaid Logo"
            loading="lazy"
          />
          <span className="text-2xl font-bold text-white hidden sm:block">
            Zunaid
          </span>
        </div>

        {/* Center: Menu Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-4xl hover:scale-110 hover:text-cyan-400 transition-transform lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          aria-label="Open menu"
        >
          <CgMenuRound />
        </button>

        {/* Right: Contact Button */}
        <div className="hidden lg:block">
          <a
            href="#Contact"
            className="inline-block py-2 px-4 font-medium text-white rounded-full bg-gradient-to-r from-pink-500 to-blue-500 shadow-xl
            hover:opacity-90 transform hover:scale-110 transition-all duration-300"
          >
            Contact us
          </a>
        </div>
      </nav>

      {/* Overlay Menu */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

