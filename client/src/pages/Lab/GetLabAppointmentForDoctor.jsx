import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import toast from 'react-hot-toast'

import { FaShareAlt, FaStar } from 'react-icons/fa'
const GetLabAppointmentForDoctor = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [error, setError] = useState('')
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
 
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token);
          if (!token) {
            throw new Error("No token found");
          }
  
          const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setUser(response.data);
        } catch (err) {
          console.error(err); 
          if (err.response?.status === 401) {
            setError('Unauthorized access, please login again');
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            setError('Failed to fetch profile');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }, [navigate]);


    useEffect(() => {
        const fetchDoctorAppointment = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error("Token not found");
                  }
                    const response = await axios.get(`${import.meta.env.VITE_API_L}/doctorlabappointment`, {
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
            } finally {
                setLoading(false);
            }
            }
            fetchDoctorAppointment()
        }, [navigate])


    if(error){
        return(
          <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Reload
          </button>
        </div>
        )
      }


      if(!user){
        return(
          <div className="flex items-center justify-center ">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="text-lg font-semibold mt-4">Loading...</p>
        </div>
        )
      }
    
  return (
    <div>

      <div className="p-4 md:p-8 max-w-full mx-auto bg-gray-50 ">
      <h2 className="text-font-bold text-black">Your lab appointments</h2>
        {/* Funeral Home Card */}
        {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
            <>
        
            <div key={index} className="p-4 bg-white rounded-lg shadow">
           
                <p><strong>test:</strong> {appointment.testName}</p>
                <p><strong>patient Name:</strong> {appointment.patientName}</p>
                <p><strong>patient contact:</strong> {appointment.patientContact}</p>
                <p><strong>status:</strong> {appointment.status}</p>

                <p><strong>Your name:</strong> {appointment.labId?.name}</p>
                <p><strong>your email:</strong> {appointment.labId?.email}</p>
            </div>
            </>
          
        ))
    ) : (
        <p>you have not booked any appointment with any of the registered labs.</p>
    )}

      

      </div>

            
    </div>
  )
}

export default GetLabAppointmentForDoctor
