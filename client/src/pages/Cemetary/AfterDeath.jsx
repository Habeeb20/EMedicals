import React from "react";
import { FaMortarPestle, FaChurch, FaBell, FaCog, FaSearch } from "react-icons/fa"; // Added FaSearch
import Navbar from "../../components/Navbar";
import im from "../../assets/EMedicals/Frame 1261152793.png";
import { Link } from "react-router-dom";

const AfterDeathService = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-full w-full p-4">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-2 rounded-md shadow">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full">
            <FaSearch className="text-gray-500" /> {/* Search Icon */}
            <input
              type="text"
              placeholder="Search Hospitals, Doctors, and more"
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>
          <div className="flex items-center bg-green-500 p-2 rounded-lg ml-2">
            <FaBell className="text-white" /> {/* Notification Icon */}
          </div>
        </header>

        {/* Image Section */}
        <div className="my-4 relative">
          <img
            src={im}
            alt="Casket"
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="absolute bottom-8 left-4 text-white font-bold text-2xl">
            We Offer After Death Service
          </div>
        </div>

        {/* Service Reminder Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBell className="text-blue-500" />
              <div>
                <h2 className="font-bold text-lg">Get the After death Service</h2>
                <p className="text-sm">Time to take your pill, Adewale.</p>
              </div>
            </div>
            <p className="text-gray-500">6:30AM</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <button className="text-blue-500">Adjust reminders</button>
            <FaCog className="text-gray-500" />
          </div>
        </div>

        {/* Options Section */}
        <div className="flex justify-between items-center mt-6">
        <Link to='/getallcemetery'>
        <div className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-1 flex flex-col items-center">
            <FaChurch className="text-blue-500 text-2xl" />
            <p className="text-sm mt-2">Cemetery</p>
          </div>

        </Link>

         <Link>
         <div className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-1 flex flex-col items-center">
            <FaMortarPestle className="text-green-500 text-2xl" />
            <p className="text-sm mt-2">Mortuary</p>
          </div>

         </Link>

         <Link>
         <div className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-1 flex flex-col items-center">
            <FaMortarPestle className="text-red-500 text-2xl" />
            <p className="text-sm mt-2">Undertakers</p>
          </div>
         </Link>
        
        
        </div>

    
        <div className="mt-6">
        <Link to="/cemeterypage">
          <button className="bg-green-500 w-full text-white font-bold p-3 rounded-lg">
            Get Started
          </button>
          </Link>
        </div> 

    
        
     
      </div>
    </>
  );
};

export default AfterDeathService;
