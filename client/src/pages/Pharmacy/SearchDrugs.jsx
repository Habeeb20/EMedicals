import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import drug from "../../assets/EMedicals/drug.png";

const SearchDrugs = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Pharmacy');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        switch (currentCategory) {
          case 'Pharmacy':
            url = `${import.meta.env.VITE_API_MP2}/allproducts`;
            break;
          case 'Doctors':
            url = `${import.meta.env.VITE_API_D}/doctorgetall`;
            break;
          case 'Nurses':
            url = `${import.meta.env.VITE_API_HO}/nursegetall`;
            break;
          case 'Hospitals':
            url = `${import.meta.env.VITE_API_HO}/hospitalgetall`;
            break;
          default:
            return;
        }

        const response = await axios.get(url);
        setPharmacies(response.data);
        setFilteredPharmacies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentCategory]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = pharmacies.filter((pharmacy) =>
      pharmacy.name?.toLowerCase().includes(term)
    );
    setFilteredPharmacies(filtered);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchTerm('');
    setLocationInput('');
  };

  const handleFindNearbyPharmacy = () => {
    setShowLocationInput(true);
  };

  const handleLocationSearch = () => {
    const filtered = pharmacies.filter((drug) => 
      drug.sellerId?.location?.toLowerCase().includes(locationInput.toLowerCase())
    );
    setFilteredPharmacies(filtered);
  };

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen p-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto mb-4">
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
          </div>

          {/* Search Section */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="bg-purple-500 text-white p-2 rounded-md">
              <FaSearch />
            </button>
          </div>

          {/* Location Search */}
          {currentCategory === 'Pharmacy' && (
            <>
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
            </>
          )}

          {/* List Section */}
          <div className="space-y-4">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy._id}
                  className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <img
                    src={pharmacy.profilePicture || drug }
                    alt={pharmacy.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {pharmacy.name || pharmacy?.sellerId?.name ||pharmacy?.fullname }
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {pharmacy?.sellerId?.name  }
                    </h3>
                    <p className="text-sm text-gray-500">
                      {pharmacy.sellerId?.phone || pharmacy.sellerId?.email || pharmacy.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {pharmacy.sellerId?.email || pharmacy?.phone}
                    </p>
                    <p className="text-sm text-gray-500">{pharmacy.sellingPrice}</p>
                    <p className="text-sm text-gray-500">
                      {pharmacy.sellerId?.location || pharmacy.sellerId?.state || pharmacy.state || pharmacy.location}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-purple-600 text-sm">
                        <AiFillStar /> 4.7
                      </span>
                      <span className="text-gray-500 text-sm">{pharmacy.distance}</span>
                      {pharmacy._id && (
                        <Link to={`/drugsdetails/${pharmacy._id}`}>
                          <button className="bg-purple-500 text-white px-3 py-1 rounded-md">
                            View Details
                          </button>
                        </Link>
                      )}
                    </div>
                    {pharmacy.sellerId?.location && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          pharmacy.sellerId?.location
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm"
                      >
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-gray-500 text-center">No results found</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDrugs;
