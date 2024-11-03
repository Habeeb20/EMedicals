import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function AdminDashboard() {
  const chartData = {
    labels: ['Doctors', 'Nurses', 'Patients'],
    datasets: [
      {
        label: 'Number of Users',
        data: [10, 20, 50],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <Bar data={chartData} />
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">Create New User</h3>
          {/* Admin form to create accounts goes here */}
        </div>
      </div>
    </div>
  );
}
