import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaShareAlt,
  } from "react-icons/fa";
const GetAllCemetery = () => {
  const [cemeteries, setCemeteries] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch all cemeteries
  useEffect(() => {
    const fetchCemetery = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_c}/cgetall`);
        const data = await response.json();
        setCemeteries(data);
        setFilteredResults(data); // Set initial filtered results to all cemeteries
      } catch (error) {
        console.error("Error fetching cemeteries:", error);
        toast.error("Failed to fetch cemeteries.");
      }
    };

    fetchCemetery();
  }, []);

//   // Function to handle search
//   const handleSearch = () => {
//     const results = cemeteries.filter(cemetery =>
//       cemetery.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (results.length === 0) {
//       toast.error("No cemetery found matching your search.");
//     }

//     setFilteredResults(results);
//   };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Cemeteries</h1>

        {/* Search Input */}
        <div className="flex mb-4">
          <Link to='/cemeteries'>
          <button
            
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>

          </Link>
        
        </div>

        {/* Display cemeteries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResults.map((cemetery) => (
            <div
              key={cemetery.uniquenumber}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <img
                src={cemetery.profilePicture}
                alt={cemetery.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold">{cemetery.name}</h2>
              <p><strong>Phone:</strong> {cemetery.phone}</p>
              <p><strong>State:</strong> {cemetery.state}</p>
              <p><strong>Address:</strong> {cemetery.address}</p>
              <p><strong>LGA:</strong> {cemetery.LGA}</p>
              <p><strong>Opening Time:</strong> {cemetery.openingTime}</p>
              <p><strong>Closing Time:</strong> {cemetery.closingTime}</p>

              <Link to={`/cemeterydetail/${cemetery.uniquenumber}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                  View Profile
                </button>
              </Link>

              <div className="flex justify-between mt-4">
                <a href={`https://wa.me/${cemetery.phone}`} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-green-500" />
                </a>
                <a href={`tel:${cemetery.phone}`}>
                  <FaPhoneAlt className="text-blue-500" />
                </a>
                <a href={`mailto:${cemetery.email}`}>
                  <FaEnvelope className="text-red-500" />
                </a>
                <a href={`https://share-url.com?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  <FaShareAlt className="text-gray-500" />
                </a>
              </div>

              
            </div>
          ))}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default GetAllCemetery;
