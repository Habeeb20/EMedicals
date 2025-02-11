import React from "react";
import { Link } from "react-router-dom";
import {
  FaHospital,
  FaPrescriptionBottle,
  FaVials,
  FaBookDead,
  FaUserMd,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";
import HideGmailPart from "../HideGmailPart";
import AllHospital from "../Hospital/AllHospital";
import ImageCarousel from "./ImageCarousel";
import QuickActions from "./QuickActions";
import WellnessAdvert from "./WellnessAdvert";


const Testing = ({ user, bgImage, im }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* Fixed Sidebar */}
        <aside
          className="hidden md:block w-1/4 bg-white min-h-screen shadow-lg p-6 fixed top-0 left-0"
          style={{ height: "100vh" }}
        >
          <ul className="space-y-6">
            <li className="text-blue-600 font-bold text-lg">
              <a href="/hospital">Hospitals</a>
            </li>
            <li className="text-blue-600 font-bold text-lg">
              <a href="/pharmacy">Pharmacy</a>
            </li>
            <li className="text-blue-600 font-bold text-lg">
              <a href="/laboratory">Laboratory</a>
            </li>
            <li className="text-blue-600 font-bold text-lg">
              <a href="/doctors">Doctors</a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-[25%]">
          {/* Welcome Banner */}
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 rounded-lg"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out",
            }}
          >
            <div className="flex items-center space-x-4">
              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt="User"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover md:w-32 md:h-32"
                />
              )}
              <div className="mt-4 md:mt-0">
                <h1 className="text-xl font-bold text-white">
                  Welcome! <HideGmailPart email={user?.email} />
                </h1>
                <p className="text-gray-500 text-white">
                  How is it going today?
                </p>
              </div>
            </div>

            <img
              src={im}
              alt="Doctor"
              className="hidden md:block rounded-lg w-48 h-auto absolute right-6 top-6 md:relative md:w-64"
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

          <ImageCarousel />
          <QuickActions />
          <WellnessAdvert />
          <AllHospital />

          {/* Grid Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Link to="/loginpatienthospital">
              <div className="bg-blue-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaHospital className="text-4xl text-blue-500" />
                <div>
                  <h3 className="text-xl font-bold">Hospitals</h3>
                  <p className="text-gray-500">Find healthcare centers</p>
                </div>
              </div>
            </Link>

            <Link to="/searchdrugs">
              <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaPrescriptionBottle className="text-4xl text-purple-500" />
                <div>
                  <h3 className="text-xl font-bold">Pharmacy</h3>
                  <p className="text-gray-500">Find nearby pharmacies</p>
                </div>
              </div>
            </Link>

            <Link to="/laboratoryuser">
              <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaVials className="text-4xl text-teal-500" />
                <div>
                  <h3 className="text-xl font-bold">Laboratory</h3>
                  <p className="text-gray-500">Find test centers</p>
                </div>
              </div>
            </Link>

            <Link to="/afterdeathsearviceuser">
              <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaBookDead className="text-4xl text-gray-500" />
                <div>
                  <h3 className="text-xl font-bold">Death Services</h3>
                  <p className="text-gray-500">Funeral services</p>
                </div>
              </div>
            </Link>

            <Link to="/doctors">
              <div className="bg-pink-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaUserMd className="text-4xl text-pink-500" />
                <div>
                  <h3 className="text-xl font-bold">Doctors</h3>
                  <p className="text-gray-500">Find specialized doctors</p>
                </div>
              </div>
            </Link>

            <Link to="/labtech">
              <div className="bg-orange-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                <FaVials className="text-4xl text-teal-500" />
                <div>
                  <h3 className="text-xl font-bold">Lab Technicians</h3>
                  <p className="text-gray-500">Find test centers</p>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Testing;
