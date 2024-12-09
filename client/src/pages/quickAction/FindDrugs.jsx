import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindDrugs = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Pharmacy');
  const [selectedCategory, setSelectedCategory] = useState('pharmacy');
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (currentCategory === 'Pharmacy') {
          response = await axios.get(`${import.meta.env.VITE_API_PH}/getdrug`);
        } else if (currentCategory === 'Doctors') {
          response = await axios.get(`${import.meta.env.VITE_API_D}/doctorgetall`);
        } else if (currentCategory === 'Nurses') {
          response = await axios.get(`${import.meta.env.VITE_API_D}/nursegetall`);
        } else if (currentCategory === 'Hospitals') {
          response = await axios.get(`${import.meta.env.VITE_API_HO}/hospitalgetall`);
        }

        const data = response.data;
        setPharmacies(data);
        setFilteredPharmacies(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentCategory]);

  // Filter drugs based on search term
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = pharmacies.filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPharmacies(filtered);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchTerm(''); // Reset search term when changing category
  };

  // Handle nearby pharmacy search by toggling location input
  const handleFindNearbyPharmacy = () => {
    setShowLocationInput(true);
  };

  // Handle location input submission to find nearby pharmacies
  const handleLocationSearch = () => {
    const filtered = pharmacies.filter((pharmacy) => {
      // Assuming pharmacies have `location` field with `latitude` and `longitude` or `address`
      return pharmacy.address && pharmacy.address.includes(locationInput);
    });
    setFilteredPharmacies(filtered);
  };

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen p-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          {/* <div className="flex space-x-2 overflow-x-auto mb-4">
            {['Pharmacy', 'Doctors', 'Nurses', 'Hospitals'].map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  currentCategory === category ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div> */}

          {/* Search Section */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search Drugs, Pharmacy"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="bg-purple-500 text-white p-2 rounded-md">
              <FaSearch />
            </button>
          </div>

          {/* Location Button and Input */}
          <button
            className="flex items-center justify-center w-full bg-purple-500 text-white p-2 rounded-md mb-6 space-x-2"
            onClick={handleFindNearbyPharmacy}
          >
            <FaMapMarkerAlt /> <span>Find Nearby Pharmacy</span>
          </button>

          {showLocationInput && (
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Enter your location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                className="bg-purple-500 text-white p-2 rounded-md"
                onClick={handleLocationSearch}
              >
                Search Nearby
              </button>
            </div>
          )}

          {/* Pharmacy List */}
          <div className="space-y-4">
            {filteredPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.name}
                className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <img
                  src={pharmacy.profilePicture}
                  alt={pharmacy.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  {/* <h3 className="text-lg font-semibold text-gray-800">{pharmacy.name}</h3> */}
                  <h3 className="text-lg font-semibold text-gray-800">{pharmacy.name }</h3>
                  <p className="text-sm text-gray-500">{pharmacy.category}</p>
                  <p className="text-sm text-gray-500">{pharmacy.price}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center text-purple-600 text-sm">
                      <AiFillStar /> 4.7
                    </span>
                    <span className="text-gray-500 text-sm">{pharmacy.distance}</span>
                    {
                       pharmacy && <Link to={`/drugsdetails/${pharmacy._id}`}>
                        <button>view details</button>
                      </Link>
                    }
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      pharmacy.address || pharmacy.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindDrugs;
