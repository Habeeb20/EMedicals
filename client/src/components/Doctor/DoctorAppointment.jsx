import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PatientDetails from './patientDetails';

export const DoctorAppointment = () => {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        setLoading(true);

        const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setDoctor(response.data.doctor);
        toast.success('Profile fetched successfully');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(`${import.meta.env.VITE_API_A}/doctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data); 
      } catch (err) {
        setError(err.message || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  useEffect(() => {
    const fetchAllPatient = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(`${import.meta.env.VITE_API_P}/getallpatient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    };
    fetchAllPatient();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
    
        <div className="w-full lg:w-64 bg-white shadow-lg flex flex-col p-4">
          {doctor && doctor.fullname && (
            <>
              <img
                src={doctor.profilePicture}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full object-cover mx-auto mb-7"
              />
              <p className="font-semibold">Your name: {doctor.fullname}</p>
              <p className="font-semibold">Your Email: {doctor.email}</p>
              <p className="font-semibold">Your Phone number: {doctor.phoneNumber}</p>
            </>
          )}
          <nav className="flex flex-col space-y-4">
          <a href="/doctordashboard" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
              <span>Overview</span>
            </a>
            <a href="/doctorappointment" className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
              <span>Appointments</span>
            </a>
            <a href="/doctorprofile" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
              <span>Patients</span>
            </a>
            <a href="#" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
              <span>Chats</span>
              <span className="bg-red-500 text-white text-xs rounded-full px-2">10</span>
            </a>
            <a href="#" className="text-red-500 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
              <span>Logout</span>
            </a>
          </nav>
        </div>

        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-6">
       
            <div className="text-2xl font-semibold">Patients that booked an appointment</div>
            
            <div className="flex space-x-2 mt-4 lg:mt-0 items-center w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search pathology results"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-auto"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full lg:w-auto">
                Search
              </button>
            </div>
          </div>
          {error && <p className='text-red-500 text center'>{error}</p>}
          {appointments.length === 0 ? (
            <p>No appointments found for this doctor.</p>
          ) : (
            <ul className="appointment-list space-y-4">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="p-4 bg-gray-100 rounded-lg shadow">
                  <p><strong>Patient:</strong> {appointment.patientName}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 lg:mt-6 flex justify-center lg:justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded-lg">1</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">2</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">3</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
