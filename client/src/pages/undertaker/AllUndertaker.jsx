
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import im from "../../assets/EMedicals/ikmmm.png"
const AllUndertaker = () => {
    const [cemeteries, setCemeteries] = useState([]);
    const [state, setState] = useState('');
    const [localGovt, setLocalGovt] = useState('');
    const [flowerSearch, setFlowerSearch] = useState(false);
    const [verseSearch, setVerseSearch] = useState(false);
    const [location, setLocation] = useState('');
    const [casketSearch, setCasketSearch] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
  


    useEffect(() => {
        const fetchUndertaker = async() => {
            try {
                  const response = await fetch(
          `${import.meta.env.VITE_API_U}`
        );
        const data = await response.json();
        setCemeteries(data);
        console.log(data)
            } catch (error) {
                console.error("Error fetching cemeteries:", error);
            }
        }

        fetchUndertaker()
    }, [])

    
  // Function to handle search
//   const handleSearch = () => {
//     let results = cemeteries;

//     if (state) {
//       results = results.filter(cemetery => cemetery.state === state);
//     }

//     if (localGovt) {
//       results = results.filter(cemetery => cemetery.LGA === localGovt);
//     }

//     if (flowerSearch) {
//       results = results.filter(cemetery => cemetery.name);
//     }

//     if (verseSearch) {
//       results = results.filter(cemetery => cemetery.location);
//     }


//     if (results.length === 0) {
//       toast.error("No result matches your search.");
//     }

//     setFilteredResults(results);
//   };

  return (
    <div>
    <Navbar />
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Undertakers</h1>

        {/* Search Inputs */}
        {/* <div className="flex flex-col md:flex-row justify-between mb-4">
          <select
            className="border rounded-lg p-2 mb-2 md:mb-0"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="State1">State1</option>
            <option value="State2">State2</option>
          </select>

          <select
            className="border rounded-lg p-2 mb-2 md:mb-0"
            value={localGovt}
            onChange={(e) => setLocalGovt(e.target.value)}
          >
            <option value="">Select Local Govt</option>
            <option value="LGA1">LGA1</option>
            <option value="LGA2">LGA2</option>
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-2 md:mb-0"
            onClick={() => {
              setFlowerSearch(!flowerSearch);
              setVerseSearch(false);
              setCasketSearch(false);
              handleSearch();
            }}
          >
            {flowerSearch ? "Flower Search Active" : "Search Flower"}
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-2 md:mb-0"
            onClick={() => {
              setVerseSearch(!verseSearch);
              setFlowerSearch(false);
              setCasketSearch(false);
              handleSearch();
            }}
          >
            {verseSearch ? "Verse Search Active" : "Search Verse"}
          </button>

          <input
            type="text"
            className="border rounded-lg p-2 mb-2 md:mb-0"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-2 md:mb-0"
            onClick={() => {
              setCasketSearch(!casketSearch);
              setFlowerSearch(false);
              setVerseSearch(false);
              handleSearch();
            }}
          >
            {casketSearch ? "Casket Search Active" : "Search Casket"}
          </button>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div> */}

        {/* Display cemeteries or filtered results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {( cemeteries).map((cemetery) => (
            <div
              key={cemetery.uniqueNumber}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">{cemetery.name}</h2>

              {/* Conditional Rendering based on search */}
           
                <div>
                  <img src={cemetery.picture1 || cemetery.picture2 || im} alt={cemetery.f} className="h-16 object-cover mb-2" />
                  <p><strong>email:</strong> {cemetery.email}</p>
                  <p><strong>phone number:</strong> {cemetery.phone}</p>
                </div>
  

                <div>
                  
                  <p><strong>state:</strong> {cemetery.state}</p>
                  <p><strong>LGA:</strong> {cemetery.LGA}</p>
                </div>
            

                <div>
                 
                  <p><strong>Address:</strong> {cemetery.location}</p>
                  <p><strong>Available time :</strong> {cemetery.openingTime}- {cemetery.closingTime}</p>
                </div>
 

              {/* View Profile Button */}
              <Link to={`/undertakerdetails/${cemetery._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  View Profile
                </button>
              </Link>

              {/* View on Map Button */}
              {location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cemetery.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-4 text-blue-600"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  View on Map
                </a>
              )}

              {/* Contact and Share Icons */}
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
  )
}

export default AllUndertaker
