import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";

const WellnessDetails = () => {
  const { id } = useParams();
  const [wellness, setWellness] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    if (!id) {
      setError("wellness center ID not found");
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_W}/awellness/${id}`)
      .then((response) => {
        setWellness(response.data.wellness);
        // setComments(response.data.exam?.comments || []);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load profile, please try again later");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleMapClick = (address) => {
    // Prompt for user's location
    const location = prompt("Enter your location to see the distance:");
    setUserLocation(location);
    if (location) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-red-600 transition"
        >
          Reload
        </button>
      </div>
    );
  }

  if (loading || !wellness) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-indigo-600"></div>
        <p className="text-lg font-semibold text-gray-700 mt-4">Loading...</p>
      </div>
    );
  }
  const detailsText = `We offer a variety of facial services to suit your individual skincare needs. Our establishment prioritizes the best customer service, providing professional care to meet your expectations.`;

  const location = `Block 16, Plot 14 Chief Albert Iyorah Street, Lekki Phase 1, Lagos State, Nigeria`;

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="text-lg">
          <span>&larr;</span>
        </button>
        <h1 className="text-xl font-bold">Beth Beauty</h1>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img
            src={wellness.picture1 || wellness.picture2 || wellness.picture3 || "https://via.placeholder.com/300x300"} // Replace with actual image URL
            alt={wellness.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call Provider Button */}
      <div className="flex justify-center mb-6">
        <button className="bg-indigo-500 text-white px-6 py-2 rounded-full text-sm shadow-lg hover:bg-indigo-600">
          Call   <span className="font-bold">{wellness.phone}</span> to book an appointment
        </button>
      </div>

      {/* Information Section */}
      <div className="px-10">
        {/* Location */}
        <div className="mb-4 ">
          <h2 className="font-semibold">Location:</h2>
          <p className="text-gray-700 text-sm">{wellness.location}</p>
          <p className="text-gray-700 text-sm">email: {wellness.email}</p>
          
        </div>

        {/* Details */}
        <div className="mb-4">
          <h2 className="font-semibold">Details:</h2>
          <p className="text-gray-700 text-sm">
            {showFullDetails ? wellness.details || wellness.services : `${wellness.details.slice(0, 100) || wellness.services.slice(0, 100)}...`}
            <button
              onClick={() => setShowFullDetails(!showFullDetails)}
              className="text-indigo-500 ml-1 underline text-sm"
            >
              {showFullDetails ? "Show less" : "See more"}
            </button>
          </p>
        </div>

        {/* Facility Features */}
        <div className="mb-4">
          <h2 className="font-semibold">Facility Features:</h2>
          <p className="text-gray-700 text-sm">{wellness.services || wellness.features}</p>
        </div>

        {/* Services */}
        <div className="mb-4">
          <h2 className="font-semibold flex justify-between items-center">
            Our Services include:
           
          </h2>
          <h4 className="text-gray-500  text-sm">{wellness.services}</h4>
          <div className="flex justify-center mb-6 mt-8 ">
       
        <div className="w-28 h-28 rounded-full overflow-hidden ">
  
          <img
            src={wellness.picture2 || wellness.picture3 || wellness.picture1 || "https://via.placeholder.com/300x300"} // Replace with actual image URL
            alt={wellness.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img
            src={wellness.picture3 || wellness.picture2 || wellness.picture1 || "https://via.placeholder.com/300x300"} // Replace with actual image URL
            alt={wellness.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
        

          <div className="flex justify-around mt-5">
          <button
            onClick={() => handleMapClick(school.location)}
            className="text-green-600"
          >
            <FaMapMarkerAlt size={20} />
          </button>
          <a
            href={`https://wa.me/${wellness.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <FaWhatsapp size={20} />
          </a>
          <a href={`tel:${wellness.phone}`} className="text-blue-500">
            <FaPhoneAlt size={20} />
          </a>
          <a href={`mailto:${wellness.email}`} className="text-red-500">
            <FaEnvelope size={20} />
          </a>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDetails;
