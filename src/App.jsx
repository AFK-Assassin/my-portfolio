import React from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <div className="relative gradient text-white"> 
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
