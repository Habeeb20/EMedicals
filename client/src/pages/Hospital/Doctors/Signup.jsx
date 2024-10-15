import React from 'react';
import { FaLinkedin, FaFacebookF, FaGoogle, FaEnvelope } from "react-icons/fa";
import { UserGroupIcon } from '@heroicons/react/outline';  

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-2xl shadow-lg overflow-hidden bg-white">
        
        {/* Left Illustration Section */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-teal-500 to-blue-500 justify-center items-center relative">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center">
            {/* Modified illustration styling */}
            <UserGroupIcon className="text-white h-36 w-36 sm:h-48 sm:w-48 opacity-90" aria-hidden="true" />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-white p-6 md:p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-green-600 mb-4 md:mb-6">Signup</h2>

          {/* Social Media Signup */}
          <div className="flex justify-center space-x-3 mb-4 md:mb-6">
            <button className="bg-blue-700 text-white p-2.5 md:p-3 rounded-full shadow-md hover:bg-blue-800">
              <FaLinkedin size={18} />
            </button>
            <button className="bg-blue-600 text-white p-2.5 md:p-3 rounded-full shadow-md hover:bg-blue-700">
              <FaFacebookF size={18} />
            </button>
            <button className="bg-red-500 text-white p-2.5 md:p-3 rounded-full shadow-md hover:bg-red-600">
              <FaGoogle size={18} />
            </button>
          </div>

          <p className="text-center text-gray-600 mb-3">or</p>

          {/* Email Input */}
          <div className="relative mb-3">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              className="w-full py-2.5 md:py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email address"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              className="w-full py-2.5 md:py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="password"
            />
          </div>

          {/* Signup Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 md:py-3 rounded-lg transition duration-300">
            Signup
          </button>

          {/* Footer Links */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
            <p className="mt-2 text-gray-600">
              Don’t have an email?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Register now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
