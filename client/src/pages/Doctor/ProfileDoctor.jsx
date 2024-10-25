
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const ProfileDoctor = ({doctorId: propDoctorId}) => {
  const { doctorId: paramDoctorId } = useParams()
  const doctorId = propDoctorId || paramDoctorId;
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState('');
 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      if(!token){
        throw new Error("token not found")
      }
 
      setLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
        headers: {
          Authorization:`Bearer ${token}`
        },
        withCredentials: true
      });
      console.log(response.data);
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
  }, [navigate]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token not found');
        }

     
        const response = await axios.get(`${import.meta.env.VITE_API_A}/doctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

       
        if (response.data && response.data.appointments) {
          setAppointments(response.data.appointments);
          toast.success('Appointments fetched successfully!');
        } else {
          throw new Error('No appointments found');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch appointments');
        toast.error('Error fetching appointments');
      } finally {
        setLoading(false); // End loading
      }
    };

    
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]); 
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (

   <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-lg flex flex-col p-4">
      
        <div className=" mb-4 flex justify-between items-center w-16 h-16 rounded-full object-cover">
          <img src={doctor.profilePicture} alt="Logo" className="h-12 w-auto" />
         
        </div>
        <nav className="flex flex-col space-y-4">
          <a href="/doctordashboard" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
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
          {doctor && (
            <>
            <img
                  src={doctor.profilePicture}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-7"
                />
                <p className="font-semibold">Your name: {doctor.fullname}</p>
                <p className="font-semibold">Your Email: {doctor.email}</p>
                <p className="font-semibold">
                  Your Phone number: {doctor.phoneNumber}
                </p>

            </>
         
          )}
      
          <a href="#" className="text-red-500 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Logout</span>
          </a>
        </nav>
        <div className="mt-auto hidden lg:block">
          <p className="text-xs text-gray-500">Address:</p>
          <p className="text-sm text-gray-700">{doctor.state}</p>
          <p className="text-sm text-gray-700">{doctor.officeAddress}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-6">
          <div className="text-2xl font-semibold">Patients</div>
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

        {/* Stats */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4 lg:mb-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-blue-700">202</h3>
            <p className="text-sm text-gray-500">Total Patient</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-green-500">202</h3>
            <p className="text-sm text-gray-500">In Patient</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-red-500">202</h3>
            <p className="text-sm text-gray-500">Out Patient</p>
          </div>
        </div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
       {patients.length > 0 ? (
        patients.map((patient) => (
          <div key={patient._id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">

          <img
                  src={patient.profilePicture}
                  alt="profilepicture"
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-sm text-gray-500">{patient.age} years old</div>
              </div>
              <h3 className="text-lg font-semibold mt-2">{patient.fullname}</h3>
              <p className="text-sm text-gray-500">{patient.email}</p>
              <p className="text-sm text-gray-500"> {patient.phoneNumber}</p>
              <p className="text-sm text-gray-500"> {patient.state}</p>
              <p className="text-sm text-gray-500"> {patient.homeAddress}</p>
              <p className="text-sm text-gray-500"> {patient.allergics}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                View
              </button>
            </div>
        ))
       ): (
        <p>No patients found.</p>
       


              
       )}
          
      
        </div>

        {/* Pagination */}
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

export default ProfileDoctor;
