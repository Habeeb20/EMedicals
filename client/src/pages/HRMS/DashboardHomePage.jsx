import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Navbar from '../../components/Navbar';

const DashboardHomePage = () => {
  const barData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      { label: 'Attendance', data: [10, 20, 30, 40, 50], backgroundColor: 'rgba(54, 162, 235, 0.6)' },
    ],
  };

  const pieData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      { data: [60, 20, 20], backgroundColor: ['#4CAF50', '#F44336', '#FF9800'] },
    ],
  };

  return (
    <div>
    {/* <Navbar /> */}
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="flex gap-6">
        <div className="w-1/4 p-4 ml-60 bg-white shadow rounded-lg">
          <Pie data={pieData} />
        </div>
        <div className="w-1/4 p-4 ml-5 bg-white shadow rounded-lg">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
