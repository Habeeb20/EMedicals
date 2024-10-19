import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaShareAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import SearchPage from "./SearchPage";
import Navbar from "../../components/Navbar";

// List of Nigerian States and corresponding LGAs (for simplicity, using few LGAs per state)
const statesAndLgas = {
  Lagos: ["Ikeja", "Surulere", "Alimosho", "Eti-Osa", "Agege"],
  Oyo: ["Ibadan North", "Ibadan South-East", "Ogbomosho", "Saki", "Egbeda"],
  Rivers: ["Port Harcourt", "Obio/Akpor", "Eleme", "Ikwerre", "Opobo"],
  // Add all other states and their LGAs here
};

const CemeteryPage = () => {
  const [mortuaries, setMortuaries] = useState([]);
  const [filteredMortuaries, setFilteredMortuaries] = useState([]);
  const [stateFilter, setStateFilter] = useState(""); // State input filter
  const [lgaFilter, setLgaFilter] = useState(""); // LGA input filter
  const [category, setCategory] = useState("all"); // Default category is 'all'
  const [userLocation, setUserLocation] = useState(""); // User's input location

  const handleClick = async (id) => {
    try {
      console.log("ID being passed:", id);
      const response = await fetch(
        `${import.meta.env.VITE_API_m}/mortuarydetails/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching mortuary profile:", error);
    }
  };

  useEffect(() => {
    const fetchMortuaries = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_m + "/getallmortuary"
        );
        const data = await response.json();
        setMortuaries(data);
        setFilteredMortuaries(data); // Initially show all mortuaries
      } catch (error) {
        console.error("Error fetching mortuaries:", error);
      }
    };

    fetchMortuaries();
  }, []);

  // Handle search filtering based on state, LGA, and category
  const handleSearch = () => {
    const filtered = mortuaries.filter((mortuary) => {
      const matchesState =
        stateFilter === "" ||
        mortuary.state.toLowerCase().includes(stateFilter.toLowerCase());
      const matchesLga =
        lgaFilter === "" ||
        mortuary.localGovtArea.toLowerCase().includes(lgaFilter.toLowerCase());
      const matchesCategory =
        category === "all" || mortuary.category === category;

      return matchesState && matchesLga && matchesCategory;
    });
    setFilteredMortuaries(filtered);
  };

  // Handle share functionality
  const handleShare = (mortuary) => {
    if (navigator.share) {
      navigator
        .share({
          title: mortuary.name,
          text: `Check out this mortuary: ${mortuary.name}`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  // Update LGA options based on selected state
  const getLgasForState = (state) => statesAndLgas[state] || [];

  return (
    <>
      <Navbar />
      <div className="p-4">
        {/* Search Section */}
        <header className="bg-white shadow-md mb-4 p-4 rounded-lg">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {/* State Filter */}
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  setLgaFilter(""); // Reset LGA filter when state changes
                }}
              >
                <option value="">Select State</option>
                {Object.keys(statesAndLgas).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Filter */}
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={lgaFilter}
                onChange={(e) => setLgaFilter(e.target.value)}
                disabled={!stateFilter} // Disable if no state is selected
              >
                <option value="">Select LGA</option>
                {getLgasForState(stateFilter).map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="hospital">Hospital</option>
                <option value="military">Military</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaMapMarkerAlt className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter location"
                className="bg-transparent outline-none ml-2 w-full"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors md:w-18"
            >
              Search
            </button>
          </div>
        </header>

        {/* Filtered Mortuary List */}
        <div>
          {filteredMortuaries.length > 0 ? (
            filteredMortuaries.map((mortuary, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg my-4"
              >
                <SearchPage
                  image={mortuary.profilePicture}
                  name={mortuary.name}
                  contact={mortuary.phonenum}
                  email={mortuary.email}
                  location={mortuary.address}
                  state={mortuary.state}
                  localGovtArea={mortuary.localGovtArea}
                  bio={mortuary.bio}
                  uniqueNumber={mortuary.uniqueNumber}
                  category={mortuary.category}
                />

                {/* Phone Call and WhatsApp Icons */}
                <div className="flex items-center mt-4">
                  <a
                    href={`tel:${mortuary.phonenum}`}
                    className="text-blue-600 mr-4"
                  >
                    <FaPhoneAlt size={20} />
                  </a>
                  <a
                    href={`https://wa.me/${mortuary.phonenum}`}
                    className="text-green-500 mr-4"
                  >
                    <FaWhatsapp size={20} />
                  </a>

                  {/* Email Icon */}
                  <a
                    href={`mailto:${mortuary.email}`}
                    className="text-red-600 mr-4"
                  >
                    <FaEnvelope size={20} />
                  </a>
                </div>

                {/* Share and Google Maps Links */}
                <div className="flex space-x-4 mt-4">
                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(mortuary)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaShareAlt className="mr-2" />
                    Share
                  </button>
                  {mortuary._id &&   <Link  to={`/mortuarydetail/${mortuary._id}`}>
                  <button onClick={handleClick}     className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  View Profile
                  </button>
                  </Link>}

                  {userLocation && (
                    <a
                      href={`https://www.google.com/maps/dir/${encodeURIComponent(
                        userLocation
                      )}/${encodeURIComponent(mortuary.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No mortuaries found matching your search criteria.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CemeteryPage;



//button

// {mortuary._id && (
//   <Link to={`/mortuarydetail/${mortuary._id}`}>
//     <button
//       onClick={() => handleClick(mortuary._id)} // Pass the ID correctly here
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//     >
//       View Profile
//     </button>
//   </Link>
// )}
