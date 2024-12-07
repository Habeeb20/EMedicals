import React, { useState } from "react";
import {
  Bar,
  Doughnut,
} from "react-chartjs-2"; // For the charts
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/outline";
import axios from 'axios';
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";


const PatientDashboardHospital = () => {
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Patients",
        data: [50, 75, 60, 90, 120],
        backgroundColor: "rgba(34, 197, 94, 0.7)", // Tailwind green
      },
    ],
  };

  const doughnutData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Patient Visit by Gender",
        data: [70, 30],
        backgroundColor: ["#3B82F6", "#F87171"], // Blue and red
      },
    ],
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_HO}/appointments/patient/${userId}`, {
          headers:{Authorization:`Bearer ${token}`}
        })
        setAppointments(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching patient appointments:", error);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
      

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_HO}/getpatientdashboard3`,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_HO}/editpatient/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("profile successfully updated")
      setSuccessMessage('Profile updated successfully!');
      setShowPopup(false);
 
    
    } catch (err) {
      toast.error("failed to update profile")
      console.log(err)
      setError('Failed to update profile.');
    }
  };

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
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };


  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
          <Navbar />
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Good Morning {userData.email}</h1>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Create Appointment
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                { title: "Appointments", value: 250, color: "bg-green-600" },
                { title: "New Patients", value: 140, color: "bg-blue-500" },
                { title: "Operations", value: 56, color: "bg-red-500" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg shadow ${stat.color} text-white`}
                >
                  <h3 className="text-lg">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="font-bold mb-4">Patient Visit by Gender</h2>
                <Doughnut data={doughnutData} />
              </div>
              <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="font-bold mb-4">Patient Visit Trends</h2>
                <Bar data={barData} />
              </div>
            </div>
          </>
        );
      case "Appointments":
        return ( <>
        <h2 className="text-2xl font-bold">Appointments Section</h2>
        {appointments.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Sickness</th>
              <th className="border px-4 py-2">Appointment Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="border px-4 py-2">{appointment.doctorName}</td>
                <td className="border px-4 py-2">{appointment.sickness}</td>
                <td className="border px-4 py-2">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
        </>);
      case "Patients":
        return <h2 className="text-2xl font-bold">Patients Section</h2>;
      case "Settings":
        return (<>
        <h2 className="text-2xl font-bold">Settings Section</h2>
        <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Your profile
            </h3>
            <p>Manage your settings here.</p>
          
          <h4 className="">  Your email: <span className="font-bold"> {userData.email}</span></h4>
          <h4 className="">  Your fullname: <span className="font-bold"> {userData.fullname}</span></h4>

          <h4 className="">  Your phone number: <span className="font-bold"> {userData.phone}</span></h4>
          <h4 className="">  Your state of Origin: <span className="font-bold"> {userData.state}</span></h4>
          <h4 className="">  Your LGA: <span className="font-bold"> {userData.LGA}</span></h4>
          <h4 className="">  Your Home Address: <span className="font-bold"> {userData.location}</span></h4>
          <h4 className="">  Your Available time: <span className="font-bold"> {userData.fullname}</span></h4>
          <img 
  src={userData.picture1} 
  alt="User" 
  className="rounded-full w-32 h-32 object-cover"
/>

          {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "picture1"
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 full Name
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
                 category(private or public)
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
                  profile Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture1")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
           
           
          
           

         
    
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
          <button
        onClick={() => setShowPopup(true)}
        className="mt-5 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        Edit Profile
      </button>
      {error && <div className="text-red-500 mt-5">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-5">{successMessage}</div>
      )}
          </div>

        </>);
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white border-r">
        <div className="p-4 text-2xl font-bold text-green-600">{userData.hospitalName}</div>
        <nav className="mt-6">
          <ul>
            <li
              onClick={() => setActiveSection("Dashboard")}
              className={`p-4 flex items-center cursor-pointer ${
                activeSection === "Dashboard" ? "text-green-600 bg-gray-100" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Dashboard
            </li>
            <li
              onClick={() => setActiveSection("Appointments")}
              className={`p-4 flex items-center cursor-pointer ${
                activeSection === "Appointments" ? "text-green-600 bg-gray-100" : ""
              }`}
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Appointments
            </li>
            <li
              onClick={() => setActiveSection("Patients")}
              className={`p-4 flex items-center cursor-pointer ${
                activeSection === "Patients" ? "text-green-600 bg-gray-100" : ""
              }`}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Patients
            </li>
            <li
              onClick={() => setActiveSection("Settings")}
              className={`p-4 flex items-center cursor-pointer ${
                activeSection === "Settings" ? "text-green-600 bg-gray-100" : ""
              }`}
            >
              <CogIcon className="w-5 h-5 mr-2" />
              Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default PatientDashboardHospital;
