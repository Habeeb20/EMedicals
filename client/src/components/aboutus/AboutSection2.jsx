import React from "react";
import { motion } from "framer-motion";
import m from "../../assets/EMedicals/im.jpeg"
const AboutSection2 = () => {
  return (
    <motion.div
      className="flex flex-col-reverse md:flex-row items-center justify-center px-4 py-8 md:py-16 bg-white"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
          Highlight the key benefits of your services. Share some unique
          selling points and create trust with your audience.
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition">
          Get Started
        </button>
      </div>
      <div className="flex-1 mb-6 md:mb-0 md:ml-8">
        <img
          src={m}
          alt="About Image 2"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </motion.div>
  );
};

export default AboutSection2;
