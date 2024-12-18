import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'
import { useParams } from 'react-router-dom'
const DiagnosisPatient = () => {
 const {patientId} = useParams()
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState([]);
  const [medical, setMedical] = useState([])
  const [doctor, setDoctor] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_P}/getmedicaltest/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        setAppointments(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
        setError('failed to display content')
        toast.error(error)
      }
    }

    fetchAppointments()
  }, [patientId])

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
        
        setPatient(response.data.patient);
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
            <a href="/patientdiagnosis" className="flex items-center text-purple-600  space-x-2">
              <i className="fas fa-comments"></i>
              <span>previous diagnosis with doctors</span>
            </a>
            <a href="/registermedicalhistory" className="flex items-center space-x-2">
              <i className="fas fa-comments"></i>
              <span>Fill your medical history</span>
            </a>
            <a href="/medicalhistories" className="flex items-center   space-x-2">
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
        <div className="flex-1 p-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {appointments?.length > 0 ? (
    appointments.map((medical, index) => (
      <div
        key={index}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Medical Record</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Sickness:</span> {medical.sickness}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Date started:</span> {medical.started}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Drugs that you have taken:</span> {medical.drugsTaken}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Drugs prescribed by the doctor:</span> {medical.prescribedDrugs}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">detected cause of your illness by the doctor:</span> {medical.cause}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Available Date by the doctor:</span> {medical.Date}
        </p>
    
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500 font-medium text-lg">
      No medical test found.
    </p>
  )}
</div>
</div>



        </div>
    </div>
  )
}

export default DiagnosisPatient
