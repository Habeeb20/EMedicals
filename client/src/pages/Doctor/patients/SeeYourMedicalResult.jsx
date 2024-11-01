
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
const SeeYourMedicalResult = () => {
    const {patientId} = useParams();
    const [medicalResult, setMedicalResult] = useState([])
    const [doctor, setDoctor] = useState([])
    const [patient, setPatient] = useState([])
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async() => {
            setLoading(true); 
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    throw new Error('Token not found')
                    
                 
                }

                
        const response = await axios.get(`${import.meta.env.VITE_API_P}/patientprofile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setPatient(response.data);
          toast.success('Profile fetched successfully');
            } catch (error) {
                setError(error.message);
                console.log(error)
            }finally {
                setLoading(false);
              }
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        const fetchMedicalResults = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');
    
            const response = await axios.get(`${import.meta.env.VITE_API_P}/getmedicaltest`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setMedicalResult(response.data); 
          } catch (err) {
            console.log(err)
            setError(err.message || 'Error fetching appointments');
          } finally {
            setLoading(false);
          }
        };
    
        fetchMedicalResults();
      }, [patientId]);

   
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
            <a href="getpatientappointments" className="flex items-center space-x-2">
              <i className="fas fa-calendar"></i>
              <span>Appointments</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-grey-600 font-semibold"
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
            <a href="/patientdiagnosis" className="flex items-center  text-purple-600 space-x-2">
              <i className="fas fa-comments"></i>
              <span>previous diagnosis with doctors</span>
            </a>
            <a href="/registermedicalhistory" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>Fill your medical history</span>
            </a>
            <a href="/medicalhistories" className="flex items-center space-x-2">
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
          <div className="flex justify-between items-center mb-6">
          {error && <p className="text-red-500">{error}</p>}
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
                Male
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${
                  genderFilter === "woman" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleGenderFilter("woman")}
              >
                Female
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
          {loading && <p className="text-red-500">{loading}...</p>}
            {medicalResult.map((medical) => (
              <div
                key={medical.id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <div className="absolute top-4 right-4">
                  <span className="block h-3 w-3 rounded-full bg-green-500"></span>
                </div>
            
                <h2 className="mt-4 text-center font-semibold text-gray-700">
                  {medical.sickness}
                </h2>
                <p className="text-center text-blue-500 text-sm">
                  {medical.cause}
                </p>
                <p className="text-center text-black text-sm">
                  {medical.drugsTaken}
                </p>
                <p className="text-center text-black text-sm">
                  State: {medical.prescribedDrugs}
                </p>
                <p className="text-center text-black text-sm">
                  LGA: {medical.date}
                </p>
                <div className="flex justify-center space-x-2 mt-4">
              
               

       
                 
                 
                  
                
                
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
      
    </div>
  )
}

export default SeeYourMedicalResult
