import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBell, FiUser, FiHome, FiPlusSquare, FiClipboard, FiBarChart } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TeleMedicineNavbar from "../../components/TeleMedicineNavbar";
const TeleDashboard= () => {
    const today = new Date();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate();
    const [path, setPath] = useState('')
    const [newDoctor, setNewDoctor] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false)
    const [userId, setUserId] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [startCallPopup, setStartCallPopup] = useState(false)
    const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    const fetchProfile = async() => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            if(!token){
                throw new Error("token not found")
            }

            const response = await axios.get(`${import.meta.env.VITE_API_T}/dashboard`, {
                headers: {
                    Authorization:`Bearer ${token}`,

                },
                withCredentials:true,
            })
            setUser(response.data);
            setUserId(response.data._id)
            setPath(response.data.path)
            console.log(response.data)
            console.log(response.data.path)
        } catch (error) {
            console.error(err); 
            if (err.response?.status === 401) {
                setError('Unauthorized access, please login again');
                localStorage.removeItem('token');
                navigate('/telelogin');
              } else {
                setError('Failed to fetch profile');
              }
        }finally {
            setLoading(false);
          }
    };   fetchProfile();
  }, [path])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((preveData) => ({...preveData, [name]: value}))
  }




  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) return; 
  
      try {
        const response = await axios.get(
          path === "Healthcare Provider"
            ? `${import.meta.env.VITE_API_T}/getteledoctorforadmin`
            : `${import.meta.env.VITE_API_T}/allteledoctor`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctors(response.data);

      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };
  
    fetchDoctors(); 
  }, [path]); 
  

  const addDoctor = async () => {
    try {
      const token = localStorage.getItem('token');
      

      const response = await axios.post(`${import.meta.env.VITE_API_T}/addteledoctorforAdmin`,
        { name: newDoctor.name, email: newDoctor.email, specialization: newDoctor.specialization },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPath(response.data.path)
      console.log(response.data.path)
      toast.success("Doctor added successfully");
      
    } catch (err) {
      console.log(err)
      toast.error("Failed to add doctor");
    }
  };




  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('')

    try {
        const token = localStorage.getItem('token');
        await axios.put(`${import.meta.env.VITE_API_T}/${userId}`, user,
            {
                headers: {Authorization: `Bearer ${token}`}
            }


         )
         toast.success("profile successfully updated")
         setSuccessMessage("profile updated successfully")
         setShowPopup(false)
    } catch (error) {
        toast.error("failed to updated profile")
        console.log(error)
        setError("failed to update profile")
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
      setUser((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };


  return (
    <>
    <TeleMedicineNavbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-green-400 text-white font-sans h-[1000px] overflow-y-scroll">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">EMedicals</div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer text-2xl"
          >
            <FiBell />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
            onClick={toggleDropdown}
          >
            <FiUser className="text-2xl" />
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2 overflow-visible"
              >
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  consultations
                </a>
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  prescriptions
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6"
      >
        <h1 className="text-4xl font-semibold mb-2"><img 
        src={user?.picture1 || "https://placholder.com"}
        className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"

        /> 
        Hi {user?.firstName} {user?.lastName}👋</h1>
        <p className="text-lg">How are you feeling today?</p>

        <div className="flex justify-between items-center mt-6 bg-white rounded-lg p-4 text-black">
          <div>
            <p className="text-sm">Steps today</p>
            <h2 className="text-3xl font-bold">0</h2>
          </div>
          <p>{formattedDate}</p>
        </div>

        {/* To-do Section */}
        <div className="bg-white rounded-lg p-4 mt-6 text-black">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">To-do</h3>
            <p className="text-sm">1 of 3</p>
          </div>

          {path === "Healthcare Provider" ? (
        <div>
        <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Doctor</h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={newDoctor.name}
        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={newDoctor.email}
        onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Specialization"
        value={newDoctor.specialization}
        onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <button
        onClick={addDoctor}
        className="w-full bg-green-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Add Doctor
      </button>
    </div>
  </div>
</div>

          <li  onClick={() => setShowPopup(true)} className="flex items-center justify-between ">
            
            <span className="bg-green-800 px-3 rounded-full text-center text-white" >Edit Hospital Profile</span>

            
          {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your hospital Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(user).map((key) =>
             
                key !== "picture1"
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
               
                <input
                  type="text"
                  name="location"
                  placeholder="Hospital Address"
                  value={user.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              <div className="flex flex-col">
            
                <input
                  type="text"
                  name="state"
                  value={user.state}
                  placeholder="state"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
              
                <input
                  type="text"
                  name="LGA"
                  value={user.LGA}
                  placeholder="LGA"
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
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Update hospital Profile
              </button>
            </form>
          </div>
        </div>
      )}
              
              <FiClipboard />
            </li>

          <h2>Doctors</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            {doc.name} - {doc.email} - {doc.specialization} (Hospital: {user?.firstName && user?.lastName || "Unknown"})
          </li>
        ))}
      </ul>
        </div>
        
      ) : (
        <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-between">
              <span className="line-through">Verify your email</span>
              <FiClipboard />
            </li>
            <li  onClick={() => setShowPopup(true)} className="flex items-center justify-between">
            
            <span >Add Medical Profile</span>

            
          {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your medical Profile</h2>
      
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(user).map((key) =>
             
                key !== "picture1"
              )}
              <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>
              {/* New input fields */}
              <div className="flex flex-col">
               
                <input
                  type="text"
                  name="height"
                  placeholder="height cm"
                  value={user.height}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              <div className="flex flex-col">
            
                <input
                  type="text"
                  name="weight"
                  value={user.weight}
                  placeholder="weight kg"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
              
                <input
                  type="text"
                  name="genotype"
                  value={user.genotype}
                  placeholder="genotype"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
 


              <div className="flex flex-col">
               
                <input
                  type="text"
                  name="bloodGroup"
                  value={user.bloodGroup}
                  placeholder="bloodGroup"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
                  
              <div className="flex flex-col">
           
                <input
                  type="text"
                  name="BMI"
                  value={user.BMI}
                  placeholder="BMI"
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
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Update medical Profile
              </button>
            </form>
          </div>
        </div>
      )}
              
              <FiClipboard />
            </li>
            <li className="flex items-center justify-between">
              <span>Add Health Conditions</span>
              <FiClipboard />
            </li>
          </ul>
      )}

      </div>
  
        {path !== "Healthcare Provider" && (
       

     
<div className="flex flex-col items-center mt-6 space-y-4">
  <button className="bg-blue-600 text-white rounded-full px-6 py-3 w-full shadow-lg hover:bg-blue-700">
    Start symptom assessment
  </button>
  <button onClick={() => setStartCallPopup(true)}
   className="bg-red-500 text-white rounded-full px-6 py-3 w-full shadow-lg hover:bg-red-600">
    Consult a doctor
  </button>

  {startCallPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[400px] overflow-y-auto relative">
      <button
        onClick={() => setStartCallPopup(false)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>
      <div className="space-y-4">
        <Link
          to="/instant-consultation"
          className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H7.5a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 12h7.5m-7.5 3h7.5m-4.5-6h4.5"
            />
          </svg>
          <h5 className="text-lg font-semibold">Start Instant Consultation</h5>
        </Link>
        <Link
          to="/telehospitals"
          className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3.75a2.25 2.25 0 012.25-2.25h3.5A2.25 2.25 0 0116 3.75V7m-8 0h8m-8 0v12.75c0 1.24 1.01 2.25 2.25 2.25h3.5c1.24 0 2.25-1.01 2.25-2.25V7m-8 4.5h8m-8 4.5h8"
            />
          </svg>
          <h5 className="text-lg font-semibold">Book Hospital Appointment</h5>
        </Link>
      </div>
    </div>
  </div>
)}

</div>

        )}
      
      </motion.div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 w-full bg-white text-black flex justify-around py-4 shadow-lg">
        <a href="/home" className="flex flex-col items-center text-blue-600">
          <FiHome />
          <span className="text-xs">Home</span>
        </a>
        <a href="/consultations" className="flex flex-col items-center">
          <FiPlusSquare />
          <span className="text-xs">Consultations</span>
        </a>
        <a href="/prescriptions" className="flex flex-col items-center">
          <FiClipboard />
          <span className="text-xs">Prescriptions</span>
        </a>
        <a href="/tests" className="flex flex-col items-center">
          <FiBarChart />
          <span className="text-xs">Tests</span>
        </a>
      </div>
    </div>

    </>
  
  );
};

export default TeleDashboard;
