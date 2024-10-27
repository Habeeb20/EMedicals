import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const ProfilePatient = () => {
  const [doctor, setDoctor] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_D}/doctorgetall`
        );
        setDoctor(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch doctors");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [navigate]);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_P}/patientprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setPatient(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatientProfile();
  }, [navigate]);

  // Filter doctors by gender
  const handleGenderFilter = async (gender) => {
    setGenderFilter(gender);
    setSearchQuery("");
    setCurrentPage(1);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_D}/doctorgetall?gender=${gender}`
      );
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
  
    try {
     
      const response = await axios.get(
        `${import.meta.env.VITE_API_D}/doctorgetall?specialization=${query}`
      );
      
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return <p className="text-center text-indigo-900">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-64 bg-white border-r-2 border-gray-200 p-5">
          <nav className="flex-1 space-y-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 font-semibold"
            >
              <i className="fas fa-chart-pie"></i>
              <span>Overview</span>
            </a>
            <a href="getpatientappointments" className="flex items-center space-x-2">
              <i className="fas fa-calendar"></i>
              <span>Appointments</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-purple-600 font-semibold"
            >
              <i className="fas fa-user-md"></i>
              <span>Specialists</span>
            </a>
            <a href="#" className="flex items-center space-x-2">
              <i className="fas fa-vials"></i>
              <span>Pathology Results</span>
            </a>
            <a href="/chatlogin" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>Chats</span>
            </a>
            <p className="mt-8 text-blue-700">Personal details</p>
            {patient && (
              <>
                <img
                  src={patient.profilePicture}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-7"
                />
                <p className="font-semibold">Your name: {patient.fullname}</p>
                <p className="font-semibold">Your Email: {patient.email}</p>
                <p className="font-semibold">
                  Your Phone number: {patient.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">PATIENT</p>
              </>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-700">Doctors</h1>
            <div className="flex items-center space-x-4">
              <button
                className={`py-2 px-4 rounded-lg ${
                  genderFilter === "all" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleGenderFilter("all")}
              >
                ALL
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${
                  genderFilter === "man" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleGenderFilter("man")}
              >
                Man
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${
                  genderFilter === "woman" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleGenderFilter("woman")}
              >
                Woman
              </button>
            </div>
          </div>

          {patient && (
            <div className="ml-4 text-center">
              <img
                src={patient.profilePicture}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full  object-cover mx-auto mb-2"
              />
              <p className="font-semibold">{patient.fullname}</p>
              <p className="text-sm text-gray-600">PATIENT</p>
            </div>
          )}

          {/* Search bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-white rounded-lg p-2 shadow-sm w-1/2">
              <input
                type="text"
                className="flex-grow px-4 py-2 border-0 focus:outline-none"
                placeholder="Search Specialist by name or title"
                value={searchQuery}
  onChange={handleSearch}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <div className="absolute top-4 right-4">
                  <span className="block h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <img
                  src={doctor.profilePicture}
                  alt="Doctor"
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h2 className="mt-4 text-center font-semibold text-gray-700">
                  {doctor.fullname}
                </h2>
                <p className="text-center text-blue-500 text-sm">
                  {doctor.specialization}
                </p>
                <p className="text-center text-black text-sm">
                  {doctor.currentWorkplace}
                </p>
                <p className="text-center text-black text-sm">
                  State: {doctor.state}
                </p>
                <p className="text-center text-black text-sm">
                  LGA: {doctor.LGA}
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
                    Chat
                  </button>

       
                 
                  {doctor && <Link to={`/doctor/${doctor._id}/book-appointment`}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Book
                  </button>

                  </Link>
                  }
                  
                
                
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`py-2 px-4 ${
                  i + 1 === currentPage ? "bg-gray-200 text-gray-700" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePatient;
