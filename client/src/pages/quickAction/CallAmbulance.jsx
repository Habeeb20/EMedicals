import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const CallAmbulance = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch doctors' data
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_HO}/hospitalgetall`);
        setDoctors(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error)
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
      <header className="py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Consult a Doctor</h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by hospital name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <svg
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.318 1.1a5.5 5.5 0 1 1 0-7.778 5.5 5.5 0 0 1 0 7.778z" />
          </svg>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="mb-6 bg-white p-4 shadow-lg rounded-lg transition-transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-700">Name:</h2>
                <p className="font-semibold text-red-700">{doctor.name}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-700">Email:</h2>
                <p className="text-gray-600">{doctor.email}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-700">location:</h2>
                <p className="text-red-200">{doctor.location}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700">Phone number:</h2>
                <p className="text-gray-600">{doctor.phone}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.location.href = `mailto:${doctor.email}`}
                  className="w-full p-2 text-white bg-red-400 rounded-lg hover:bg-red-600">
                  send mail
                </button>
                <button 
                 onClick={() => window.location.href = `tel:${doctor.phone}`}
                className="w-full p-2 text-black-500 border-2 border-red-300 rounded-lg hover:bg-red-500 hover:text-white">
                  Call 
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
    </>
  
  );
};

export default CallAmbulance;
