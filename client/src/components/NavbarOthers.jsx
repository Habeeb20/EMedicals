
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaHospitalAlt, FaCapsules, FaMicroscope, FaSyringe, FaHeartbeat, FaArrowLeft } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";

const NavbarOthers = () => {
  const [activeTab, setActiveTab] = useState("Hospitals");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState("Hospitals");

  const navigate = useNavigate();

  const menuItems = [
    { name: "Hospitals", icon: <FaHospitalAlt />, link: "/loginhospitaladmin" },
    { name: "Pharmacy", icon: <FaCapsules />, link: "/medicalpharmacylogin" },
    { name: "Laboratory", icon: <FaMicroscope />, link: "/userlabdashboard" },
    { name: "Telemedicine", icon: <FaSyringe />, link: "/SignupModalTelemedicine" },
    { name: "Pro Life", icon: <FaHeartbeat />, link: "/afterdeathsearviceuser" },
    { name: "Back", icon: <FaArrowLeft />, link: "#", }, // Placeholder link, handled dynamically
  ];

  const handleMenuItemClick = (itemName) => {
    setActiveTab(itemName);
    setSelectedNotification(itemName);
    setNotificationOpen(true);
    if (itemName === "Back") {
      navigate(-1); // Navigate to previous page
    }
    setMenuOpen(false); // Close mobile menu
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
                <div className="w-full h-1 bg-blue-500 rounded-full mt-1" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-blue-500">
          <IoMenu className="text-2xl" />
        </button>

        {/* Notification Button */}
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="text-blue-500 hidden md:block"
          aria-label="Toggle notifications"
        >
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
                <div className="w-full h-1 bg-blue-500 rounded-full mt-1" />
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Notification Sidebar */}
      {notificationOpen && (
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-md p-4 md:w-1/3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              {selectedNotification} Notifications
            </h2>
            <button
              onClick={() => setNotificationOpen(false)}
              className="text-gray-500"
              aria-label="Close notifications"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {selectedNotification === "Back"
              ? "No notifications for navigation actions."
              : `This is where ${selectedNotification} related notifications will appear.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default NavbarOthers;
