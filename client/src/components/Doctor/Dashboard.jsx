import React from 'react';
import AppointmentCard from './AppointmentCard';
import PatientCard from './PatientCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-blue-800 p-4 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <h1 className="text-lg font-semibold">Hi Rajesh!</h1>
            <p className="text-sm">Welcome back</p>
          </div>
        </div>
        <button className="text-white text-2xl">☰</button>
      </div>

      {/* Appointments Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <AppointmentCard
          name="Olaoti Ifunnaya"
          illness="Typhoid and Malaria"
          time="9:30pm"
          days="Mon, Tues, Wed"
        />
        <AppointmentCard
          name="Kunal Mehra"
          illness="General Checkup"
          time="10:00pm"
          days="Mon, Tues, Wed"
        />
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search Patients"
          className="w-full p-2 rounded-md bg-white text-black"
        />
        <div className="flex items-center">
          <button className="px-4 py-2 bg-blue-600 rounded-md">OPD</button>
          <button className="px-4 py-2 bg-blue-600 rounded-md">Appointments</button>
        </div>
        <div className="relative">
          <button className="bg-blue-600 p-2 rounded-md">Today</button>
          <div className="absolute mt-2 bg-white text-black rounded shadow-md">
            <ul>
              <li className="p-2 hover:bg-gray-200">Yesterday</li>
              <li className="p-2 hover:bg-gray-200">This week</li>
              <li className="p-2 hover:bg-gray-200">This month</li>
            </ul>
          </div>
        </div>
      </div>

      {/* New Patients Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">New Patients</h2>
        <PatientCard
          name="Kunal Mehra"
          checkupType="General Checkup"
          amount="$230"
          status="Paid"
        />
        <PatientCard
          name="Kunal Mehra"
          checkupType="General Checkup"
          amount="$230"
          status="Pending"
        />
        <PatientCard
          name="Kunal Mehra"
          checkupType="General Checkup"
          amount="$230"
          status="Pending"
        />
      </div>
    </div>
  );
};

export default Dashboard;
