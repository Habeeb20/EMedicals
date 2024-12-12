import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TeleMedicineNavbar from "../../components/TeleMedicineNavbar";

const TeleHospital = () => {
  const [hospital, setHospital] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_T}/allteledoctor`);
        setHospital(response.data);
        console.log(response.data);
      } catch (error) {
        setError("No available hospital");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const filteredHospitals = hospital.filter((hosp) =>
    hosp.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <TeleMedicineNavbar />
      <div className="px-4 mt-4">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <span className="material-icons text-gray-500 mr-2">search</span>
          <input
            type="text"
            placeholder="Search doctors"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Options */}
      <div className="mt-4 px-4 space-y-4">
        {filteredHospitals.map((hospital, index) => (
          <label
            key={index}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
            
              <img
                src={hospital.picture1 || "https://picsum.photos/200"} 
                alt={hospital.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            
              <span className="text-gray-700">Doctor {hospital.name}</span>
            </div>
            {/* <input
              type="radio"
              name="careOption"
              value={hospital.name}
              checked={selectedOption === hospital.name}
              onChange={() => setSelectedOption(hospital.name)}
              className="form-radio w-5 h-5 text-purple-500 focus:ring-purple-500"
            /> */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TeleHospital;
