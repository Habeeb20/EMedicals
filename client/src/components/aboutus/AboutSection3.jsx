import React from "react";
import { motion } from "framer-motion";

const AboutSection3 = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 mb-6 md:mb-0 md:mr-8">
        <img
          src="/path-to-image-3.png"
          alt="About Image 3"
          className="w-full rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
          Share your long-term goals and aspirations. Give the audience a
          reason to align with your mission and grow trust in your values.
        </p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition">
          Contact Us
        </button>
      </div>
    </motion.div>
  );
};

export default AboutSection3;
