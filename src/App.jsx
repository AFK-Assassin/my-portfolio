import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {

  const [introDone,setIntroDone]= useState(false);


  return (

    <> 
    {!introDone && <IntroAnimation  onFinish={()=>setIntroDone(true) }  /> }

    {introDone && (

    <div className="relative gradient text-white"> 
      <CustomCursor />
      {/* <ParticleBackground /> */}
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
    )}
    </>
  );
}
