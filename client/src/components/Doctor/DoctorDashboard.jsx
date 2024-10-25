import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Navbar from '../Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if(!token){
          throw new Error("token not found")
        }
        setLoading(true)

        const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }, 
          withCredentials: true
        });
        console.log(response.data)
        setDoctor(response.data.doctor);
        toast.success("successfully fetched")
      } catch (error) {
        console.error(error)
        setError(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  useEffect(() => {
    const fetchAllPatient = async () => {
      try {
        const token = localStorage.getItem("token")
        if(!token){
          throw new Error("token not found")
        }
        
        const response = await axios.get(`${import.meta.env.VITE_API_P}/getallpatient`)
        if(!response){
          console.log("details not found")
          toast.error("patient not not found")
        }
        console.log(response)
        setPatients(response.data)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
    fetchAllPatient ()
  }, [])

  if(loading){
    return <h5>Loading...</h5>
  }


  const pieData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#34D399', '#FBBF24', '#EF4444'],
        hoverBackgroundColor: ['#10B981', '#F59E0B', '#DC2626'],
      },
    ],
  };

 
  const barDataPatients = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Patients',
        backgroundColor: '#6366F1',
        borderColor: '#6366F1',
        borderWidth: 1,
        hoverBackgroundColor: '#818CF8',
        hoverBorderColor: '#6366F1',
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
  };


  const barDataHealth = {
    labels: ['Blood Pressure', 'Heart Rate', 'Blood Sugar', 'Cholesterol'],
    datasets: [
      {
        label: 'Health Index',
        backgroundColor: '#F43F5E',
        borderColor: '#F43F5E',
        borderWidth: 1,
        hoverBackgroundColor: '#FB7185',
        hoverBorderColor: '#F43F5E',
        data: [120, 75, 90, 110],
      },
    ],
  };

  return (
   <>
   <Navbar />
     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white p-5 border-r border-gray-200 shadow-lg md:h-screen sticky top-0">
        <div className="flex flex-col items-center">
        <img src={doctor.profilePicture} alt="Logo"    className="w-16 h-16 rounded-full object-cover mx-auto mb-7"/>
          <nav className="space-y-6 w-full">
            <a href="#" className="text-blue-600 flex items-center space-x-2 p-2 hover:bg-blue-100 rounded-md">
              <i className="fas fa-home"></i>
              <span>Overview</span>
            </a>
            <a href="/doctorappointment" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Appointments</span>
          </a>
          <a href="/doctorprofile" className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Patients</span>
          </a>
          <a href="#" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Chats</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2">10</span>
          </a>
            {/* Add more sidebar links here */}
          </nav>
          <p className="font-semibold">Your name: {doctor.fullname}</p>
          <p className="font-semibold">Your Email: {doctor.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-blue-50">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 lg:mb-0">Welcome {doctor.fullname}, How're you feeling today?</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search pathology results"
              className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm">Apply Dark Theme</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center space-x-2">
              <img src={doctor.profilePicture} alt="Doctor" className="w-10 h-10 rounded-full shadow-lg" />
              <span className="font-bold text-gray-800">{doctor.fullname}</span>
              <i className="fas fa-user-md text-blue-500"></i>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Diagnostics (Pie Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Diagnostics</h2>
            <Pie data={pieData} />
          </div>

          {/* Patients (Bar Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Patients</h2>
            <Bar data={barDataPatients} />
          </div>

          {/* Health Index (Bar Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Health Index</h2>
            <Bar data={barDataHealth} />
          </div>
        </div>

        {/* Appointments and COVID Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* COVID Pandemic */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">COVID 19 Pandemic</h2>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">COVID Map Placeholder</div>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Upcoming Appointments</h2>
            <ul className="space-y-3">
              <li className="border-b border-gray-200 py-2">John Doe - 10:00 AM</li>
              <li className="border-b border-gray-200 py-2">Jane Smith - 11:30 AM</li>
              <li className="border-b border-gray-200 py-2">Robert Davis - 1:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Patients</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
              <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Allergics</th>
                <th className="p-2">state</th>
             
              </tr>
            </thead>
            <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr className="text-center">
                <img src={patient.profilePicture} className="w-15 h-20 rounded-full object-cover" />
                <td className="p-2">{patient.fullname}</td>
                <td className="p-2">{patient.email}</td>
                <td className="p-2">{patient.allergics}</td>
                <td className="p-2">{patient.state}</td>
                {/* <td className="p-2">
                  <button className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    Booked
                  </button>
                </td> */}
              </tr>

              ))
            ) : (
              <p>No patients found.</p>
            )}
              
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </>
  );
};

