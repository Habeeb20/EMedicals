import React from "react";
import { motion } from "framer-motion";
import m from "../../assets/EMedicals/doc.jpeg"
const AboutSection1 = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-16 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 mb-6 md:mb-0 md:mr-8">
        <img
          src={m}
          alt="About Image 1"
          className="w-full rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
          Your description goes here. Explain the purpose and mission of your
          platform in a few sentences to grab attention.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

export default AboutSection1;
