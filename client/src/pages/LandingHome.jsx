import React from 'react';
import { FaHospital, FaPrescriptionBottle, FaVials, FaBookDead, FaUserMd } from 'react-icons/fa'; 
import im from '../assets/EMedicals/young-woman-doctor-white-coat-with-stethoscope-pointing-with-index-finger-side-with-serious-face-standing-orange-wall-removebg-preview 1.png'
import Navbar from '../components/Navbar';
export default function LandingPage() {
  return (
   <div>
    <Navbar />
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-1/4 bg-white shadow-lg p-6">
        <ul className="space-y-6">
          <li className="text-blue-600 font-bold text-lg">
            <a href="#">Hospitals</a>
          </li>
          <li className="text-blue-600 font-bold text-lg">
            <a href="#">Pharmacy</a>
          </li>
          <li className="text-blue-600 font-bold text-lg">
            <a href="#">Laboratory</a>
          </li>
          <li className="text-blue-600 font-bold text-lg">
            <a href="#">Doctors</a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src="https://via.placeholder.com/80" 
              alt="User" 
              className="w-16 h-16 rounded-full border-2 border-blue-500" 
            />
            <div>
              <h1 className="text-xl font-bold">Welcome! Adewale</h1>
              <p className="text-gray-500">How is it going today?</p>
            </div>
          </div>
          {/* Doctor Image */}
          <img 
            src={im}
            alt="Doctor" 
            className="hidden md:block rounded-lg " 
          />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Hospital, Doctor..."
            className="w-full p-4 pl-12 rounded-full shadow-md focus:outline-none border border-gray-300"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Grid Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaHospital className="text-4xl text-blue-500" />
            <div>
              <h3 className="text-xl font-bold">Hospitals</h3>
              <p className="text-gray-500">Find healthcare centers</p>
            </div>
          </div>
          
          <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaPrescriptionBottle className="text-4xl text-purple-500" />
            <div>
              <h3 className="text-xl font-bold">Pharmacy</h3>
              <p className="text-gray-500">Find nearby pharmacies</p>
            </div>
          </div>

          <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaVials className="text-4xl text-teal-500" />
            <div>
              <h3 className="text-xl font-bold">Laboratory</h3>
              <p className="text-gray-500">Find test centers</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaBookDead className="text-4xl text-gray-500" />
            <div>
              <h3 className="text-xl font-bold">Death Services</h3>
              <p className="text-gray-500">Funeral services</p>
            </div>
          </div>

          <div className="bg-pink-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaUserMd className="text-4xl text-pink-500" />
            <div>
              <h3 className="text-xl font-bold">Doctors</h3>
              <p className="text-gray-500">Find specialized doctors</p>
            </div>
          </div>
        </div>
      </main>
    </div>
   </div>
  );
}
