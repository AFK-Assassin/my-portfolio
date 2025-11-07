import React from 'react'
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ParticleBackground from "../components/ParticleBackground";
import Astra from "../assets/Astra.png";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && /\d/.test(value)) {
      setError("Name cannot contain numbers");
      return;
    }
    setError("");
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_o876lwq",
        "template_0z6qwil",
        formData,
        "DsE1x7cCoH0pXRPZ-"
      )
      .then(
        () => console.log("✅ Admin notified"),
        (error) => console.error("❌ Admin email failed: " + error.text)
      );

    emailjs
      .send(
        "service_o876lwq",
        "template_ar6dkoa",
        formData,
        "DsE1x7cCoH0pXRPZ-"
      )
      .then(
        () => alert("✅ Message sent successfully!"),
        (error) => alert("❌ Auto-reply failed: " + error.text)
      );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      {/* Background particles */}
      <ParticleBackground />

      {/* Main layout */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 w-full h-full items-center"
      >
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center items-center p-6"
        >
          <motion.img
            src={Astra}
            alt="Contact visual"
            className="object-contain w-[40vw] max-w-sm md:max-w-md select-none pointer-events-none drop-shadow-[0_0_25px_rgba(45,212,191,0.3)]"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center items-center p-6"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-5 bg-gray-900/80 p-8 rounded-2xl shadow-2xl text-white border border-white/10 backdrop-blur-sm"
            whileHover={{ boxShadow: "0 0 20px rgba(45,212,191,0.2)" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold text-center mb-2 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent"
            >
              Get in Touch
            </motion.h2>

            {/* Name input */}
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Email input */}
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />

            {/* Message textarea */}
            <motion.textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                background:
                  "linear-gradient(to right, rgb(45,212,191), rgb(74,222,128))",
                boxShadow: "0 0 15px rgba(45,212,191,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="w-full bg-gradient-to-r from-teal-400 to-green-400 text-black font-semibold py-3 rounded-md transition-all duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}

