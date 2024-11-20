// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillDashboard, AiOutlineUsergroupAdd, AiOutlineSetting } from 'react-icons/ai';
import { FaBuilding, FaCalendarCheck, FaMoneyBillWave, FaSuitcase, FaUserTie, FaLeaf } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', link: '/hrms/dashboard', icon: <AiFillDashboard /> },
    { text: 'All Employees', link: 'employees', icon: <AiOutlineUsergroupAdd /> },
    { text: 'All Departments', link: 'departments', icon: <FaBuilding /> },
    { text: 'Attendance', link: 'attendance', icon: <FaCalendarCheck /> },
    { text: 'Payroll', link: 'payroll', icon: <FaMoneyBillWave /> },
    { text: 'Jobs', link: 'jobs', icon: <FaSuitcase /> },
    { text: 'Candidates', link: 'candidates', icon: <FaUserTie /> },
    { text: 'Leaves', link: 'leaves', icon: <FaLeaf /> },
    { text: 'Settings', link: 'settings', icon: <AiOutlineSetting /> },
  ];

  return (
    <div className="w-64 bg-white text-black fixed h-full p-4">
      <h1 className="text-2xl font-bold mb-6">HRMS</h1>
      <nav>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded mb-2 ${
                isActive ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-300'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
