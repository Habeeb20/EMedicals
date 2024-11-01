import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { Link,Navigate,useNavigate } from 'react-router-dom'

const MedicalHitory = () => {
    const navigate = useNavigate()

    const [medicalHistory, setMedicalHistory] = useState([])
    const [error, setError] = useState('')
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPatientMedicalHistory = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error("Token not found");
                  }
                    const response = await axios.get(`${import.meta.env.VITE_API_P}/getmedicalhistory`, {
                      headers:{
                          Authorization:`Bearer ${token}`
                      },
                      withCredentials: true
                    });
                    console.log(response)
                    setMedicalHistory(response.data)
            } catch (error) {
                console.error("Error fetching patient medical History:", error);
                setError("Failed to load medical history.");
            } finally {
                setLoading(false);
            }
            }
            fetchPatientMedicalHistory()
        }, [navigate])

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
        

  return (
    <div>
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
            <a href="getpatientappointments" className="flex  items-center space-x-2">
              <i className="fas fa-calendar"></i>
              <span>Appointments</span>
            </a>
            <a
              href="patientprofile"
              className="flex items-center space-x-2text-gray-500 font-semibold"
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
            <a href="/patientdiagnosis" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>previous diagnosis with doctors</span>
            </a>
            <a href="/registermedicalhistory" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>Fill your medical history</span>
            </a>
            <a href="/medicalhistories" className="flex items-center  text-purple-600  space-x-2">
              <i className="fas fa-comments"></i>
              <span> Your medical history</span>
            </a>
            <a href="/registerdonation" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>Wish to donate after death?</span>
            </a>
            <a href="/patientdonations" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>see your donations</span>
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
          {/* <div className="flex justify-between items-center mb-6">
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
          </div> */}

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
          {/* <div className="flex justify-between items-center mb-6">
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
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {medicalHistory.length > 0 ? (
    medicalHistory.map((medical, index) => (
      <div
        key={index}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Medical Record</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Chronic Conditions:</span> {medical.chronicConditions}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Ever had surgery?:</span> {medical.surgeries}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Ever been hospitalized?:</span> {medical.hospitalized}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Taking any Medication currently:</span> {medical.currentMedications}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Blood Group:</span> {medical.bloodGroup}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Blood Genotype:</span> {medical.genotype}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Medical Conditions:</span> {medical.medicalConditions}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Smoking or Drinking:</span> {medical.smokingOrAlcohol}
        </p>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500 font-medium text-lg">
      No medical history found.
    </p>
  )}
</div>



{/*           
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
          </div> */}
        </div>
      </div>
      
    </div>
  )
}

export default MedicalHitory
