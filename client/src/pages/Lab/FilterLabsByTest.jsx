import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import drug from "../../assets/EMedicals/drug.png";

const FilterLabsByTest = () => {
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_L}/all`);
        setLabs(response.data);
        setFilteredLabs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredLabs(labs);
      return;
    }

    const filtered = labs.filter((lab) =>
      ["testA", "testB", "testC", "testD", "testE", "testF", "testG", "testH", "testI", "testJ"].some(
        (test) => lab[test]?.toLowerCase().includes(term)
      )
    );

    setFilteredLabs(filtered);
  };

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen p-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Search Section */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search for a test done by these laboratories"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="bg-green-500 text-white p-2 rounded-md">
              <FaSearch />
            </button>
          </div>

          {/* List Section */}
          <div className="space-y-4">
            {filteredLabs.length > 0 ? (
              filteredLabs.map((lab) => (
                <div
                  key={lab._id}
                  className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <img
                    src={lab?.picture1 || drug}
                    alt={lab.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {lab.name}
                    </h3>
                    <p className="text-sm text-gray-500">{lab.phone || lab.email}</p>
                    <p className="text-sm text-gray-500">{lab.location || lab.state}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-green-600 text-sm">
                        <AiFillStar /> 4.7
                      </span>
                      {lab._id && (
                       
                        <Link to={`/singlelabdetails/${lab._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-medium mt-4 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                        View Details
                      </button>
                    </Link>
                    
                      )}
                    </div>
                    {lab.location && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          lab.location
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

export default FilterLabsByTest;
