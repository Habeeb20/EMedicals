import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUserNurse, FaHospital, FaStethoscope, FaPills, FaAmbulance } from 'react-icons/fa';

const LPage3 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center py-12 bg-gray-50"
    >
      {/* Icons on the arc */}
      <div className="relative h-64 w-full flex justify-center">
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaHeartbeat className="text-red-500 w-8 h-8" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaUserNurse className="text-blue-500 w-8 h-8" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaHospital className="text-green-500 w-8 h-8" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaStethoscope className="text-purple-500 w-8 h-8" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaPills className="text-orange-500 w-8 h-8" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaAmbulance className="text-teal-500 w-8 h-8" />
          </div>
        </div>

        {/* Arc Lines */}
        <div className="absolute w-full h-full">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 500 250"
          >
            <path
              d="M0 200 Q250 -50 500 200"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6c63ff" />
                <stop offset="0.5" stopColor="#ff6584" />
                <stop offset="1" stopColor="#50d1a0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Text Section */}
      <div className="text-center mt-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Redefine How You Deliver Care
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Streamline and scale healthcare delivery with our innovative and
          cost-effective digital solutions.
        </p>
      </div>
    </motion.div>
  );
};

export default LPage3;
