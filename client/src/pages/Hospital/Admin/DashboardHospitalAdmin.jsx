import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import toast from 'react-hot-toast';
import {useParams } from "react-router-dom"
ChartJS.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const {id} = useParams()
  const[loading, setLoading]= useState(false)
  const [userData, setUserData] = useState([])
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorActions, setDoctorActions] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState()
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone:'',
    role: '',
    specialization: '',
    category: '',
    state: '',
    LGA: '',
    location: '',
    picture1:'',
    picture2: '',
    picture3:'',
    picture4: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (token) {
      fetchPatients();
      fetchAppointments();
      fetchDoctorActions();
      fetchNurses();
      handleEditButton();
      fetchProfile()
    } else {
      toast.error('Unauthorized. Please log in.');
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
      

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_HO}/dashboardhospital`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(data);
        setUserId(data._id)
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);



  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HO}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching appointments');
    }
  };

  const fetchDoctorActions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HO}/getdoctordashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
      console.log("this is ur doctor details",response.data)
    } catch (error) {
      console.error(error);
      toast.error('Error fetching doctor actions');
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HO}/getnursedashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(response.data);
      // setUserId(response.data._id)
      console.log(response.data)
      console.log("this is ur nurse id!!",response.data._id)
    } catch (error) {
      console.error(error);
      toast.error('Error fetching appointments');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HO}/getpatientdashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(response.data);
     
    } catch (error) {
      console.error(error);
      toast.error('Error fetching patients');
    }
  };

 

  const handleModalOpen = (role) => {
    setFormType(role);
    setFormData({
      hospitalName:'',
      fullname: '',
      email: '',
      password: '',
      phone:'',
      role,
      specialization: '',
      category: '',
      state: '',
      LGA: '',
      location: '',
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HO}/registerhospitalstaff`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`${formType} added successfully!`);
      setIsModalOpen(false);
      console.log(response.data);
      // setUserId(response.data._id)
      // console.log("this is ur id",response.data._id)
    } catch (error) {
      console.error(error);

      toast.error(`Error adding ${formType}`);
    }
  };
  

  const handleEditButton = async (e) => {
    e.preventDefault();
    setLoading(true)
    setSuccessMessage('')

    try {
      const token = localStorage.getItem('token');
   
      const response = await axios.put(`${import.meta.env.VITE_API_HO}/h/${userId}`, formData, {
        headers:{Authorization: `Bearer ${token}`},

      })
      console.log(response.data)
      console.log("this is your id*****", userId)
      toast.success("details has been edited successfully")
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      toast.error("failed to update profile")
      console.log(error)
      setError('Failed to update profile.');
    }
  }

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload', formData, {
        params: {
          upload_preset: 'essential',
        },
      });
      setFormData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Admin Dashboard</h1>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen('doctor')}
        >
          Add Doctor
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen('nurse')}
        >
          Add Nurse
        </button>
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen('patient')}
        >
          Add Patient
        </button>
        {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleEditButton} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "picture1" &&
                key !== "picture2" &&
                key !== "picture3" &&
                key !== "picture4"  &&
                key != "profilePicture"
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Name of your Hospital
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={userData.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
               Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

         

            


          
              

        
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 category(private,state or  federal)
                </label>
                <input
                  type="text"
                  name="category"
                  value={userData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>




              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={userData.state}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

          

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  LGA
                </label>
                <input
                  type="text"
                  name="LGA"
                  value={userData.LGA}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


         

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture1")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture2")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture3")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture4")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  profile Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picturePicture")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
          

         
    {}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}

      
    
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded"
          onClick={() => setShowPopup(true)}
        >
          Edit profile
        </button>
        {error && <div className="text-red-500 mt-5">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-5">{successMessage}</div>
      )}

         
   
        
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div  className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
           
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              {formType === 'doctor' && (
                <div className="mb-4">
                  <label className="block mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block mb-1">Category(private or General</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
  <label className="block mb-1">Role</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleInputChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="" disabled>Select a role</option>
    <option value="doctor">Doctor</option>
    <option value="nurse">Nurse</option>
    <option value="patient">Patient</option>
  </select>
</div>

              <div className="mb-4">
                <label className="block mb-1">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">LGA</label>
                <input
                  type="text"
                  name="LGA"
                  value={formData.LGA}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Admin Dashboard</h1> */}

{/* Overview Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <FaUser className="text-4xl text-blue-600" />
    <div className="text-right">
      <h3 className="text-2xl font-bold">{patients.length}</h3>
      <p className="text-gray-500">Registered Patients</p>
    </div>
  </div>
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <FaCalendarAlt className="text-4xl text-green-600" />
    <div className="text-right">
      <h3 className="text-2xl font-bold">{appointments.length}</h3>
      <p className="text-gray-500">Appointments</p>
    </div>
  </div>
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <FaHeartbeat className="text-4xl text-red-600" />
    <div className="text-right">
      <h3 className="text-2xl font-bold">{doctors.length}</h3>
      <p className="text-gray-500">Doctors</p>
    </div>
  </div>

  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <FaHeartbeat className="text-4xl text-red-600" />
    <div className="text-right">
      <h3 className="text-2xl font-bold">{nurses.length}</h3>
      <p className="text-gray-500">Nurses</p>
    </div>
  </div>
</div>

{/* Appointments Chart */}
<div className="bg-white shadow rounded-lg p-6 mb-6">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Appointment Summary</h2>
  {/* <Bar data={appointmentsData} /> */}
</div>

{/* Patients Section */}
<section className="mb-6">
  <h2 className="text-xl font-semibold mb-4 text-green-600">Registered Patients</h2>
  <div className="bg-white shadow rounded-lg p-4">
  <ul className="list-disc pl-6 space-y-2">
  {/* Add a heading section */}
  <li className="font-bold">
    <div className="grid grid-cols-6 gap-4">
    <span>Picture</span>
      <span>Full Name</span>
      <span>Email</span>
      <span>Phone Number</span>
      <span>Location</span>
      <span>Date added</span>
    </div>
  </li>

  {/* Map through the nurses data */}
  {patients &&
    patients.map((patient) => (
      <li key={patient._id} className="grid grid-cols-6 gap-4 items-center">
      <img 
      src={patient.picture1} 
      alt="User" 
      className="rounded-full w-12 h-12 object-cover"
    />
        <span>{patient.fullname}</span>
        <span className="text-gray-500">{patient.email}</span>
        <span className="text-gray-500">{patient.phone}</span>
        <span className="text-gray-500">{patient.location || patient.state || patient.LGA}</span>
        <span className="text-gray-500">{new Date(patient.createdAt).toLocaleDateString()}</span>
        {/* <button
          onClick={() => setShowPopup(true)}
          className="mt-5 py-3 px-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Edit Profile
        </button> */}
      </li>
    ))}
</ul>
  </div>
</section>

{/* Nurses Section */}
<section className="mb-6">
{/* {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update this Profile</h2>
            <form onSubmit={handleEditButton} className='"space-y-6'>
            {Object.keys(formData).map((key) => key!== "profilePicture" )}
            <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
  <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleInputChange}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="">Select Role</option>
    <option value="doctor">Doctor</option>
    <option value="nurse">Nurse</option>
    <option value="patient">Patient</option>
  </select>
</div>


{formData.role === 'doctor' && (
  <div className="flex flex-col mt-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">Specialization</label>
    <select
      name="specialization"
      value={formData.specialization}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">Select Specialization</option>
      <option value="Cardiology">Cardiology</option>
      <option value="Neurology">Neurology</option>
      <option value="Pediatrics">Pediatrics</option>
      <option value="Orthopedics">Orthopedics</option>
      <option value="Radiology">Radiology</option>
      <option value="Anesthesiology">Anesthesiology</option>
      <option value="General Surgery">General Surgery</option>
      <option value="Gynecology">Gynecology</option>
      <option value="Psychiatry">Psychiatry</option>
      <option value="Dermatology">Dermatology</option>
     
    </select>
  </div>

)}

<div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 state
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 LGA
                </label>
                <input
                  type="text"
                  name="LGA"
                  value={formData.LGA}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Home Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  profile Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture7")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Update Profile
              </button>

            </form>
            </div>
            </div>

)} */}
  <h2 className="text-xl font-semibold mb-4 text-green-600">Registered Nurses</h2>
  <div className="bg-white shadow rounded-lg p-2">
  <ul className="list-disc pl-6 space-y-2">
  {/* Add a heading section */}
  <li className="font-bold">
    <div className="grid grid-cols-6 gap-4">
    <span>picture</span>
      <span>Full Name</span>
      <span>Email</span>
      <span>Phone Number</span>
      <span>Location</span>
      <span>Date added</span>
    </div>
  </li>

  {/* Map through the nurses data */}
  {nurses &&
    nurses.map((nurse) => (
      <li key={nurse._id} className="grid grid-cols-6 gap-4 items-center">
      <img 
      src={nurse.picture1} 
      alt="User" 
      className="rounded-full w-12 h-12 object-cover"
    />
        <span>{nurse.fullname}</span>
        <span className="text-gray-500">{nurse.email}</span>
        <span className="text-gray-500">{nurse.phone}</span>
        <span className="text-gray-500">{nurse.location || nurse.state || nurse.LGA}</span>
        <span className="text-gray-500">{new Date(nurse.createdAt).toLocaleDateString()}</span>

        {/* <button
          onClick={() => setShowPopup(true)}
          className="mt-5 py-3 px-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Edit Profile
        </button> */}
      </li>
    ))}
</ul>

  </div>
</section>

{/* Appointments Section */}
<section className="mb-6">
  <h2 className="text-xl font-semibold mb-4 text-green-600">Appointments</h2>
  <div className="bg-white shadow rounded-lg p-4">
    <ul className="list-disc pl-6 space-y-2">
      {/* {appointments.map((appt) => (
        <li key={appt._id}>
          {appt.patientId.fullname} - <span className="text-gray-500">{appt.status}</span> (
          Doctor: {appt.doctorId?.fullname || 'N/A'})
        </li>
      ))} */}
    </ul>
  </div>
</section>

{/* Doctor Actions Section */}
<section>
  <h2 className="text-xl font-semibold mb-4 text-green-600">Doctors</h2>
  <div className="bg-white shadow rounded-lg p-4">
  <ul className="list-disc pl-6 space-y-2">
  {/* Add a heading section */}
  <li className="font-bold">
    <div className="grid grid-cols-6 gap-4">
    <span>picture</span>
      <span>Full Name</span>
      <span>Email</span>
      <span>Phone Number</span>
      <span>Location</span>
      <span>Date Added</span>
    </div>
  </li>

  {/* Map through the nurses data */}
  {doctors && Array.isArray(doctors) &&
    doctors?.map((doctor) => (
      <li key={doctor._id} className="grid grid-cols-6 gap-4 items-center">
       <img 
      src={doctor.picture1} 
      alt="User" 
      className="rounded-full w-12 h-12 object-cover"
    />
        <span>{doctor.fullname}</span>
        <span className="text-gray-500">{doctor.email}</span>
        <span className="text-gray-500">{doctor.phone}</span>
        <span className="text-gray-500">{doctor.location || doctor.state || doctor.LGA}</span>
        <span className="text-gray-500">{new Date(doctor.createdAt).toLocaleTimeString()}</span>

        {/* <button
          onClick={() => setShowPopup(true)}
          className="mt-5 py-3 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Edit Profile
        </button> */}
      </li>
    ))}
</ul>
  </div>
</section>
    {error && <div className="text-red-500 mt-5">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-5">{successMessage}</div>
      )}
    </div>
  );
};

export default AdminDashboard;























