import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HideGmailPart from '../HideGmailPart';
import toast from 'react-hot-toast';
import s from "../../assets/EMedicals/s1.jpeg"
import s1 from "../../assets/EMedicals/sa.png"
import s2 from "../../assets/EMedicals/ss3.jpg"
import s3 from "../../assets/EMedicals/ss4.jpg"
import s4 from "../../assets/EMedicals/ss5.jpg"
const LabDashboard= () => {
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =useState('')
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [userData, setUserData] = useState({
    name:'',
    password:'',
    email:'',
    role: '',
    phone:'',
    state:'',
    LGA: '',
    location:'',
    picture1:'',

})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
  
        if (!token) {
          toast.error("You are not authenticated to see your profile");
          setError("You are not authenticated to see your profile");
          navigate("/lablogin");
          return; 
        }
  
     
   
        const {data} = await axios.get(`${import.meta.env.VITE_API_L}/getuserprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUserData(data);
        setUserId(data._id)
        console.log(data)

        console.log("User Data:", data);
      } catch (error) {
        console.error("Error:", error);
          const errorMessage = error?.response?.data?.message || "Something went wrong.";
          setError(errorMessage);
          toast.error(errorMessage);

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
        `${import.meta.env.VITE_API_L}/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("profile successfully updated")
      setSuccessMessage('Profile updated successfully, please refresh your page!');
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



  
  
  if (loading) return <p className="text-center text-indigo-900">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  return (
    <>
    <Navbar />
       <div className="bg-green-900 text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={userData?.picture1 || "https://placeholder.com" }
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-lg font-bold">Hi {userData.name}! </p>
            <p>Welcome! {userData.email}</p>
          </div>
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
                  phone number(preferably whatsapp number)
                </label>
                <input
                  type="number"
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
        className="mt-5 mx-4 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Edit Profile
      </button>
      {error && <div className="text-red-500 mt-5">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-5">{successMessage}</div>
      )}
        
        </div>
        <button className="text-white">&#8942;</button>
      </div>

      {/* Appointments Carousel */}
      <div className="flex space-x-4 mt-4 overflow-x-auto">
        {['Typhoid and Malaria', 'Checkup', 'Flu Shot'].map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 text-black rounded-lg p-3 w-44 flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
            <p className="text-sm font-medium">{item}</p>
            <button className="mt-2 text-green-700 font-semibold">View Appointment</button>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Search Patients"
          className="flex-grow p-2 rounded-l-md bg-gray-100 text-black"
        />
        <button className="bg-gray-200 text-green-700 px-4 rounded-r-md">
          &#128269;
        </button>
      </div>

      {/* Tabs and Filter */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-white text-green-900 font-semibold rounded-md">
            Patients
          </button>
          <button className="px-4 py-2 text-white font-semibold rounded-md">
            Appointments
          </button>
        </div>
        <div className="relative">
          <button className="bg-gray-200 text-green-900 px-4 py-2 rounded-md">
            Today &#9662;
          </button>
          <div className="absolute top-full mt-1 bg-white text-black rounded-md shadow-lg">
            {['Yesterday', 'This week', 'This month'].map((filter, idx) => (
              <button
                key={idx}
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Patients */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-white">New Patients</h2>
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-100 text-black p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src="/path/to/avatar.jpg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-lg">Kunal Mehra</p>
                  <p className="text-sm">HIV - Pending</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">$230</p>
                <button className="text-green-700 font-semibold">Add payment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
 
  );
};

export default LabDashboard;
