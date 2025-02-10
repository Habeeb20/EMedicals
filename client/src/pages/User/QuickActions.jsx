import React, { useState } from "react";
import { FaAmbulance, FaFileAlt, FaHome, FaPhoneAlt, FaCapsules, FaPlane, FaDonate } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const [viewAll, setViewAll] = useState(false);

  const actions = [
    { id: 1, name: "Call an ambulance", icon: <FaAmbulance />, link: "/callambulance", bgColor: "bg-red-100" },
    { id: 2, name: "Fundbridge", icon: <FaDonate />, link: "/fundraisingpopup", bgColor: "bg-purple-100" },
    { id: 3, name: "Get home care", icon: <FaHome />, link: "/gethomecare", bgColor: "bg-blue-100" },
    { id: 4, name: "Consult a doctor", icon: <FaPhoneAlt />, link: "/consultadoctorlist", bgColor: "bg-green-100" },
    { id: 5, name: "Purchase medicines", icon: <FaCapsules />, link: "/finddrugs", bgColor: "bg-yellow-100" },
    { id: 6, name: "Review Report & Cost", icon: <FaFileAlt />, link: "/review", bgColor: "bg-pink-100" },
    { id: 7, name: "Health Tourism", icon: <FaPlane />, link: "/tourism", bgColor: "bg-indigo-100" },
  ];

  return (
    <div className="p-4 text-black">
      {/* Title */}
      <h1 className="text-xl font-bold mb-4 text-center">Quick Action</h1>

      {/* Grid Container */}
      <div
        className={`grid gap-4 ${
          viewAll
            ? "grid-cols-2" // View All: Two columns for mobile
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-7" // Default responsive grid
        }`}
      >
        {actions.map((action) => (
          <Link
            to={action.link}
            key={action.id}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${action.bgColor}`}
          >
            <div className="text-4xl text-blue-600 mb-2">{action.icon}</div>
            <p className="text-sm font-semibold text-center">{action.name}</p>
          </Link>
        ))}
      </div>

      {/* View All Button for Mobile */}
      {!viewAll && (
        <div className="flex justify-center mt-4 sm:hidden">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => setViewAll(true)}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
