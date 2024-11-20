import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import DashboardHomePage from "./DashboardHomePage";
import Employees from "./Employees";
const HomePage = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
