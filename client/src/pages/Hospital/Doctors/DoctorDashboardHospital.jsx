import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { FaUser, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";
import { MdHome, MdEvent, MdReport, MdPerson } from "react-icons/md";
import m from "../../../assets/EMedicals/doctor2.jpeg"
import { MdDashboard, MdPeople, MdBarChart, MdSettings } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);





const DoctorDashboardHospital = () => {
  const {id} = useParams()
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [doctorId, setDoctorId] = useState('')
  const [userId, setUserId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [nurse, setNurse] = useState([]);
  const [patient, setPatient] = useState([]);
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    specialization: "",
    state: "",
    doctorTime:'',
    LGA: "",
    location: "",
    profilePicture: "",
  });


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
        setDoctorId(data._id)
        setUserId(data._id)
        toast.success("you are successfully logged in")
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
        `${import.meta.env.VITE_API_HO}/editdashhospital/${userId}`,
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
      const response = await axios.post('https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload', 
        formData, 
        {
        params: {
          upload_preset: 'essential',
        },
      }
    );
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };


  const handleModalOpen = (role) => {
    setFormType(role);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
        phone:'',
        role,
        specialization: '',
        state: '',
        LGA: '',
        location: '',
        doctorTime:''
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const fetchUsersByRole = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_HO}/getusersByrole`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { role },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(`Failed to fetch ${role}s`);
      console.error(error);
      return [];
    }
  };

  const fetchAllUsers = async () => {
    const doctorsData = await fetchUsersByRole("doctor");
    const nursesData = await fetchUsersByRole("nurse");
    const patientsData = await fetchUsersByRole("patient");

    setDoctor(doctorsData);
    console.log(doctorsData);
    setNurse(nursesData);
    console.log(nursesData);
    setPatient(patientsData);
  };


  useEffect(() => {
    fetchAllUsers();
  }, []);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
  
    localStorage.removeItem('token');


    navigate('/logindoctoradmin');
  }


  const handleShowpopupClose = () => {
    setShowPopup(false)
  }


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_HO}/appointments/doctor/${id}`, {
          headers:{Authorization: `Bearer ${token}`}
        })

        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        setLoading(false); 
      }
    }

    fetchAppointments();
  }, [])

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_API_HO}/appointments/doctor/${doctorId}/${appointmentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };


const Sidebar = ({ isSidebarOpen, setSidebarOpen, setSelectedSection }) => {
  return (
    <div
      className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-4 absolute md:relative transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      {/* Close Button */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>

      {/* Sidebar Title */}
      <h1 className="text-2xl font-semibold mb-6">Menu</h1>

      {/* Menu Items */}
      <ul className="space-y-3">
        {[
          { name: "Home", key: "home", icon: <MdHome size={20} /> },
          { name: "Your Patients", key: "yourPatients", icon: <MdPeople size={20} /> },
          { name: "Appointments", key: "appointments", icon: <MdEvent size={20} /> },
          { name: "Reports", key: "reports", icon: <MdReport size={20} /> },
          { name: "Profile", key: "profiles", icon: <MdPerson size={20} /> },
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200 cursor-pointer"
            onClick={() => setSelectedSection(item.key)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};




  const renderContent = () => {
    switch (selectedSection) {
      case "home":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Home</h3>
            <p>Welcome to the Home section.</p>
          </div>
        );
      case "yourPatients":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Your Patients
            </h3>
            <p>Details about your patients will appear here.</p>
          </div>
        );
      case "appointments":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Appointments
            </h3>
            <p>Manage your appointments here.</p>
            {appointments.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Sickness</th>
              <th className="border px-4 py-2">Appointment Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="border px-4 py-2">{appointment.patientName}</td>
                <td className="border px-4 py-2">{appointment.sickness}</td>
                <td className="border px-4 py-2">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{appointment.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      updateAppointmentStatus(appointment._id, "accepted")
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      updateAppointmentStatus(appointment._id, "rejected")
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      updateAppointmentStatus(appointment._id, "rescheduled")
                    }
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Reschedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
          </div>
        );
      case "reports":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Reports
            </h3>
            <p>Your reports will appear here.</p>
          </div>
        );
      case "nurses":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Nurses
            </h3>
            <p>Details about nurses will appear here.</p>
          </div>
        );
      case "profiles":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Your profile
            </h3>

            <a href="/consultadoctor" className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>patients can consult you?</span>
          </a>
            <p>Manage your settings here.</p>
          
          <h4 className="">  Your email: <span className="font-bold"> {userData.email}</span></h4>
          <h4 className="">  Your fullname: <span className="font-bold"> {userData.name}</span></h4>
          <h4 className="">  Your specialization: <span className="font-bold"> {userData.specialization}</span></h4>
          <h4 className="">  Your phone number: <span className="font-bold"> {userData.phone}</span></h4>
          <h4 className="">  Your state of Origin: <span className="font-bold"> {userData.state}</span></h4>
          <h4 className="">  Your LGA: <span className="font-bold"> {userData.LGA}</span></h4>
          <h4 className="">  Your Home Address: <span className="font-bold"> {userData.location}</span></h4>
          <h4 className="">  Your Available time: <span className="font-bold"> {userData.doctorTime}</span></h4>
          <h4 className="">  Hospital Name: <span className="font-bold"> {userData.adminId?.name}</span></h4>
          <h4 className="">  Hospital Email: <span className="font-bold"> {userData.adminId?.email}</span></h4>
          <img 
  src={userData?.profilePicture || m} 
  alt="User" 
  className="rounded-full w-32 h-32 object-cover"
/>

          {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "profilePicture"
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
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
    Specialization
  </label>
  <select
    name="specialization"
    value={userData.specialization}
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="" disabled>Select Specialization</option>
    <option value="Cardiology">Cardiology</option>
    <option value="Dermatology">Dermatology</option>
    <option value="Endocrinology">Endocrinology</option>
    <option value="Gastroenterology">Gastroenterology</option>
    <option value="General Practice">General Practice</option>
    <option value="Neurology">Neurology</option>
    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
    <option value="Oncology">Oncology</option>
    <option value="Orthopedics">Orthopedics</option>
    <option value="Pediatrics">Pediatrics</option>
    <option value="Psychiatry">Psychiatry</option>
    <option value="Radiology">Radiology</option>
    <option value="Surgery">Surgery</option>
    <option value="Urology">Urology</option>
  </select>
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
                 what time will you be Available(e.g 4:00pm - 8:00pm) everyday/ specify the day
                </label>
                <input
                  type="time"
                  name="doctorTime"
                  value={userData.doctorTime}
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
           
           
          
           

         <div className="flex justify-end gap-2">
         <button
                        type="button"
                        onClick={handleShowpopupClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Update Profile
              </button>
         </div>
           
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
        );
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Overview
            </h3>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div>
                <p className="text-gray-500 text-sm mb-4">
                  Pie Chart Placeholder
                </p>
                <div className="w-40 h-40 rounded-full border-4 border-green-500 mx-auto"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex-h-screen">
    <div className="bg-gray-50 min-h-screen  md:p-8">
      <h2 className=" text-blue-900 font-bold w-21">{userData.email}'s Dashboard</h2>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
        Dashboard for Doctor {userData.name}
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
            {/* Stats Card 1 */}
            <div className="bg-blue-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaUser className="text-4xl text-blue-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{patients.length}</h3> */}
                <p className="text-gray-500">Registered Patients</p>
                <p className="text-blue-500 font-bold">{patient.length}</p>
              </div>
            </div>
            {/* Stats Card 2 */}
            <div className="bg-green-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaCalendarAlt className="text-4xl text-green-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{appointments.length}</h3> */}
                <p className="text-gray-500">Appointments</p>
              </div>
            </div>
            {/* Stats Card 3 */}
            <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaHeartbeat className="text-4xl text-red-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{nurses.length}</h3> */}
                <p className="text-gray-500">Nurses</p>
                <p className="text-blue-500 font-bold">{nurse.length}</p>
              </div>
            </div>


          </div>
      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden bg-blue-600 text-white p-3 rounded-full m-2 fixed z-50 "
      >
        ☰
      </button>

      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSelectedSection={setSelectedSection}
      />
        {/* Middle Section */}
        <div className="bg-white shadow-lg rounded-lg p-4 col-span-2 w-200 ">
    
          {renderContent()}
        </div>
      </div>

      
    {/* Schedule Section */}
    {/* <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4 text-green-700">
      Daily Patient Management
    </h3>
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr className="bg-green-100">
          <th className="border border-gray-300 px-4 py-2">Day</th>
          <th className="border border-gray-300 px-4 py-2">Patient_Name</th>
          <th className="border border-gray-300 px-4 py-2">phone_Number</th>
          <th className="border border-gray-300 px-4 py-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {[
          { day: "Monday", Patient_Name: "12", Number: "8", Time: "4" },
          { day: "Tuesday", Patient_Name: "10", Number: "6", Time: "4" },
          { day: "Wednesday", Patient_Name: "14", Number: "10", Time: "4" },
          { day: "Thursday", Patient_Name: "9", Number: "5", Time: "4" },
          { day: "Friday", Patient_Name: "15", Number: "11", Time: "4" },
        ].map((row, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{row.day}</td>
            <td className="border border-gray-300 px-4 py-2 text-green-500">
              {row.admissions}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-red-500">
              {row.discharges}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-gray-500">
              {row.pending}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> */}
    </div>

    </div>
  

    </>
 
  );
};

export default DoctorDashboardHospital;









