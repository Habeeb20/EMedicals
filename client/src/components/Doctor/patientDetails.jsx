import React from 'react';
import { FaTooth, FaPhone, FaMale, FaEdit } from 'react-icons/fa';

const PatientDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Patient Header */}
      <div className="bg-blue-800 text-white p-4 rounded-b-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
            {/* Placeholder for Profile Image */}
            <img
              src="/profile-placeholder.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Kunal Mishra</h2>
            <p className="text-sm flex items-center">
              <FaPhone className="mr-1" /> 918498498378
            </p>
            <p className="text-sm flex items-center">
              <FaMale className="mr-1" /> 33, male
            </p>
          </div>
          <div className="text-right">
            <p>Total Bill: <strong>2400</strong></p>
            <p>Paid: <strong>2400</strong></p>
            <p>Pending: <strong>2400</strong></p>
          </div>
        </div>
        <div className="text-sm text-right">
          <FaEdit className="inline-block mr-1" /> Swipe left to Edit
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex justify-around bg-white py-2 mt-2 shadow">
        <button className="text-gray-700 font-semibold">Treatments</button>
        <button className="text-gray-700 font-semibold">Payments</button>
        <button className="text-gray-700 font-semibold">Prostho</button>
        <button className="text-blue-700 font-semibold">Appointments</button>
      </div>

      {/* Appointments Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-blue-700">Appointments</h3>
          <button className="bg-gray-300 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h13M8 12h13m-7 6h7" />
            </svg>
          </button>
        </div>
        {/* Appointment Cards */}
        <div className="space-y-4">
          <AppointmentCard
            icon={<FaTooth />}
            treatment="General Checkup"
            date="08-09-2023"
            status="Completed"
          />
          <AppointmentCard
            icon={<FaTooth />}
            treatment="Malaria Treatment"
            date="08-09-2023"
            status="Completed"
          />
          <AppointmentCard
            icon={<FaTooth />}
            treatment="General Checkup"
            date="08-09-2023"
            status="Completed"
          />
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ icon, treatment, date, status }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{treatment}</h4>
        <p className="text-sm text-gray-500">{status}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-700">{date}</p>
        <div className="w-full bg-gray-300 h-1 rounded-full mt-2">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
