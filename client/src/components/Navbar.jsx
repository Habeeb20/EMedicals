// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa"; 
// import { FaHospitalAlt, FaCapsules, FaMicroscope, FaSyringe, FaHeartbeat } from "react-icons/fa";
// import { IoMenu } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { FiBell } from "react-icons/fi";
// const Navbar = () => {
//   const [activeTab, setActiveTab] = useState("Hospitals");
//   const [notificationOpen, setNotificationOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile menu
//   const [selectedNotification, setSelectedNotification] = useState("Hospitals");

//   const menuItems = [
//     { name: "Hospitals", icon: <FaHospitalAlt /> },
//     { name: "Pharmacy", icon: <FaCapsules /> },
//     { name: "Laboratory", icon: <FaMicroscope /> },
//     { name: "Telemedicine", icon: <FaSyringe /> },
//     { name: "Pro Life", icon: <FaHeartbeat /> },
//   ];

//   const handleMenuItemClick = (itemName) => {
//     setActiveTab(itemName);
//     setSelectedNotification(itemName); // Update notification to match selected tab
//     setNotificationOpen(true); // Auto-open notification panel when item is clicked
//   };

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <div className="relative w-full">
//       {/* NavBar */}
//       <nav className="flex items-center justify-between p-4 bg-white shadow-lg static ">
//         <div className="hidden md:flex items-center gap-6">
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={`/${item.name.toLowerCase()}`}
//               className={`flex items-center gap-1 text-sm font-semibold transition ${
//                 activeTab === item.name ? "text-blue-500" : "text-gray-500"
//               }`}
//               onClick={() => handleMenuItemClick(item.name)}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//               {activeTab === item.name && (
//                 <div className="w-full h-1 bg-blue-500 rounded-full" />
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={toggleMenu} className="md:hidden text-blue-500">
//           <IoMenu className="text-2xl" />
//         </button>

//         {/* Notification Button */}
//         <button onClick={() => setNotificationOpen(!notificationOpen)} className="text-blue-500 hidden md:block">
//           <FiBell className="text-2xl" />
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={`/${item.name.toLowerCase()}`}
//               className={`flex items-center gap-2 text-sm font-semibold transition ${
//                 activeTab === item.name ? "text-blue-500" : "text-gray-500"
//               }`}
//               onClick={() => handleMenuItemClick(item.name)}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//               {activeTab === item.name && (
//                 <div className="w-full h-1 bg-blue-500 rounded-full" />
//               )}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Notification Sidebar */}
//       {notificationOpen && (
//         <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-md p-4 md:w-1/3">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-700">{selectedNotification} Notifications</h2>
//             <button onClick={() => setNotificationOpen(false)} className="text-gray-500">
//               <FaTimes className="text-xl" /> {/* Close icon */}
//             </button>
//           </div>
//           <p className="text-sm text-gray-500 mt-2">This is where {selectedNotification} related notifications will appear.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; 
import { FaHospitalAlt, FaCapsules, FaMicroscope, FaSyringe, FaHeartbeat } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Hospitals");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile menu
  const [selectedNotification, setSelectedNotification] = useState("Hospitals");

  const menuItems = [
    { name: "Hospitals", icon: <FaHospitalAlt />, link: "/hospitals" },
    { name: "Pharmacy", icon: <FaCapsules />, link: "/pharmacy" },
    { name: "Laboratory", icon: <FaMicroscope />, link: "/laboratory" },
    { name: "Telemedicine", icon: <FaSyringe />, link: "/SignupModalTelemedicine" },
    { name: "Pro Life", icon: <FaHeartbeat />, link: "/pro-life" },
  ];

  const handleMenuItemClick = (itemName) => {
    setActiveTab(itemName);
    setSelectedNotification(itemName); 
    setNotificationOpen(true); 
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative w-full">
      {/* NavBar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-lg static">
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex items-center gap-1 text-sm font-semibold transition ${
                activeTab === item.name ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeTab === item.name && (
                <div className="w-full h-1 bg-blue-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-blue-500">
          <IoMenu className="text-2xl" />
        </button>

        {/* Notification Button */}
        <button onClick={() => setNotificationOpen(!notificationOpen)} className="text-blue-500 hidden md:block">
          <FiBell className="text-2xl" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex items-center gap-2 text-sm font-semibold transition ${
                activeTab === item.name ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeTab === item.name && (
                <div className="w-full h-1 bg-blue-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Notification Sidebar */}
      {notificationOpen && (
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-md p-4 md:w-1/3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">{selectedNotification} Notifications</h2>
            <button onClick={() => setNotificationOpen(false)} className="text-gray-500">
              <FaTimes className="text-xl" /> {/* Close icon */}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">This is where {selectedNotification} related notifications will appear.</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
