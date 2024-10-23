
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../../../components/Navbar";

const statesAndLgas = {
  Lagos: ["Ikeja", "Surulere", "Alimosho", "Eti-Osa", "Agege"],
  Oyo: ["Ibadan North", "Ibadan South-East", "Ogbomosho", "Saki", "Egbeda"],
  Rivers: ["Port Harcourt", "Obio/Akpor", "Eleme", "Ikwerre", "Opobo"],
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [lgaFilter, setLgaFilter] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_D + "/doctorgetall"
        );
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data); // Set initial filtered data to all doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = () => {
    const filtered = doctors.filter((doctor) => {
      const matchesState =
        stateFilter === "" ||
        doctor.state.toLowerCase().includes(stateFilter.toLowerCase());
      const matchesLga =
        lgaFilter === "" ||
        doctor.LGA.toLowerCase().includes(lgaFilter.toLowerCase());
      const matchesSpecialization =
        specialization === "all" || doctor.specialization === specialization;
      return matchesState && matchesLga && matchesSpecialization;
    });
    setFilteredDoctors(filtered);
  };

  const getLgasForState = (state) => statesAndLgas[state] || [];

  return (
    <>
      <Navbar />
      <div className="p-4 bg-navyblue min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md mb-6 p-6 rounded-lg">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  setLgaFilter("");
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

            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={lgaFilter}
                onChange={(e) => setLgaFilter(e.target.value)}
                disabled={!stateFilter}
              >
                <option value="">Select LGA</option>
                {getLgasForState(stateFilter).map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5">
              <FaSearch className="text-gray-500" />
              <select
                className="bg-transparent outline-none ml-2 w-full"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
              
                 <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="endocrinology">Endocrinology</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="hematology">Hematology</option>
                <option value="immunology">Immunology</option>
                <option value="neurology">Neurology</option>
                <option value="oncology">Oncology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatrist">Psychiatrist</option>
                <option value="radiology">Radiology</option>
                <option value="surgery">Surgery</option>
                <option value="urology">Urology</option>
                <option value="obstetrics-gynecology">
                  Obstetrics & Gynecology
                </option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="otolaryngology">Otolaryngology (ENT)</option>
                <option value="pathology">Pathology</option>
                <option value="pulmonology">Pulmonology</option>
                <option value="rheumatology">Rheumatology</option>
                <option value="nephrology">Nephrology</option>
                <option value="family doctor">family doctor</option>

               
              </select>
            </div>

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

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </header>

        {/* Doctors List */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center space-y-4"
              >
                <img
                  src={doctor.profilePicture}
                  alt={`${doctor.fullname}'s profile`}
                  className="w-24 h-24 rounded-full shadow-md"
                />
                <h2 className="text-lg font-semibold text-navyblue">
                  {doctor.fullname}
                </h2>
                <p className="text-gray-600">Contact: {doctor.phoneNumber}</p>
                <p className="text-gray-600">Email: {doctor.email}</p>
                <p className="text-gray-600">
                  Location: {doctor.officeAddress}, {doctor.state}
                </p>
                <p className="text-gray-600">
                  Specialization: {doctor.specialization}
                </p>

                {/* Action Icons */}
                <div className="flex space-x-4 justify-center mt-4">
                  <a
                    href={`tel:${doctor.phoneNumber}`}
                    className="text-blue-600"
                  >
                    <FaPhoneAlt size={20} />
                  </a>
                  <a
                    href={`https://wa.me/${doctor.phoneNumber}`}
                    className="text-green-500"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                  <a href={`mailto:${doctor.email}`} className="text-red-600">
                    <FaEnvelope size={20} />
                  </a>
                </div>

                {/* Additional Links */}
                <div className="mt-4">
                  <Link to="/patientsignup" className="text-navyblue underline">
                    View More
                  </Link>
                  {userLocation && (
                    <a
                      href={`https://www.google.com/maps/dir/${encodeURIComponent(
                        userLocation
                      )}/${encodeURIComponent(doctor.officeAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-green-600 text-white mt-2 px-4 py-2 rounded-lg"
                    >
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              No doctors found matching your search criteria.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Doctors;





































