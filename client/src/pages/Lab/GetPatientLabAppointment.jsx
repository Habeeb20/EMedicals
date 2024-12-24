import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const GetPatientLabAppointment = () => {
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [error, setError] = useState('')
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPatientAppointment = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) {
                    throw new Error("token not found");

                }

                const response = await axios.get(`${import.meta.env.VITE_API_L}/patientlabappointment`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    withCredentials: true
                });
                console.log(response.data)

                setAppointments(response.data)
            } catch (error) {
                console.error("Error fetching patient appointments:", error);
                setError("Failed to load appointments.");
            }finally {
                setLoading(false);
            }
        }
        fetchPatientAppointment()
    }, [navigate])


    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    throw new Error ("token not found")
                }

                const response = await axios.get(`${import.meta.env.VITE_API}/getprofile`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    withCredentials: true,
                })
                setPatient(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchPatientProfile();
    }, [navigate])
  return (
    <div className="p-6 bg-gray-100 ">
    <div className="mb-8">
      <h2 className="text-2xl font-extrabold text-gray-800">Your Lab Appointments</h2>
      <p className="text-gray-600">Manage your lab appointments below</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Test : {appointment.testName}
            </h3>
            <div className="text-sm text-gray-600">
              <p className="mb-1">
                <strong className="font-medium text-gray-700">Your Name:</strong>{" "}
                {appointment.patientName}
              </p>
              <p className="mb-1">
                <strong className="font-medium text-gray-700">Status:</strong>{" "}
                {appointment.status}
              </p>
              <p className="mb-1">
                <strong className="font-medium text-gray-700">
                  Your Contact:
                </strong>{" "}
                {appointment.patientContact}
              </p>
              <p className="mb-1">
                <strong className="font-medium text-gray-700">Lab Name:</strong>{" "}
                {appointment.labId?.name}
              </p>
              <p className="mb-1">
                <strong className="font-medium text-gray-700">Email:</strong>{" "}
                {appointment.labId?.email}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600">
          No appointments found.
        </p>
      )}
    </div>
  </div>
  
  )
}

export default GetPatientLabAppointment

