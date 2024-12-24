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
  const {labId} = useState();
  const [showPopup, setShowPopup] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null);

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =useState('')
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cancelPopup, setCancelPopup] = useState(false)
  const [userId, setUserId] = useState('')
  const [filteredNames, setFilteredNames]  = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState({
  
    phone:'',
    location:'',
    picture1:'',
    testA:'',
    testAPrice:'',
    testB:'',
    testBPrice:'',
    testC:'',
    testCPrice:'',
    testD:'',
    testDPrice:'',
    testE:'',
    testEPrice:'',
    testF:'',
    testFPrice:'',
    testG:'',
    testGPrice:'',
    testH:'',
    testHPrice:'',
    testI:'',
    testIPrice:'',
    testJ:'',
    testJPrice:''
  })

  const [editTest, setEditTest] = useState(null);
  const [editId, setEditId] = useState('')
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchAppointments = async() => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(`${import.meta.env.VITE_API_L}/labappointmentofdoctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
        setFilteredNames(response.data);
        console.log(response.data) 
      } catch (err) {
        setError(err.message || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [labId]);


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
    e.preventDefault()
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


  const handleTestClick = (testKey) => {
    setSelectedTest(testKey);
  };

  const filteredData = selectedTest ? userData[selectedTest] : userData;


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term)

    const filtered = appointments.filter((appoint) => 
    appoint.patientName?.toLowerCase().includes(term?.toLowerCase()))
    setFilteredNames(filtered)
  }




  const handleEditSubmit = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_L}/editlabTest/${userId}`, formData,
     
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      toast.success("successfully done")
      console.log(userId)
    } catch (error) {
      console.error('Error updating test:', error.message);
      toast.error("an error occurred with the network while trying to update the data")
    }
  }
  
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
          {showPopup &&  (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-2 bg-red-500 text-black rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>
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
                  className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name of Test {index + 1}
              </label>
              <input
                type="text"
                name={`test${String.fromCharCode(65 + index)}`}
                value={userData[`test${String.fromCharCode(65 + index)}`]}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price of Test {index + 1}
              </label>
              <input
                type="text"
                name={`test${String.fromCharCode(65 + index)}Price`}
                value={userData[`test${String.fromCharCode(65 + index)}Price`]}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        ))}



          

         

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
        onClick={() => setShowPopup(true) && setCancelPopup(true) }
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
      {userData ? (
  <div className="flex space-x-4 mt-4 overflow-x-auto">
    {['testA', 'testB', 'testC'].map((testKey, index) => (
      <div
        key={index}
        className="bg-gray-200 text-black rounded-lg p-3 w-44 flex flex-col items-center"
      >
        <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
        <p className="text-sm font-medium">{userData[testKey]}</p>
        <button 
          key={testKey}
          onClick={() => handleTestClick(testKey)}
          className={`px-4 py-2 rounded ${
              selectedTest === testKey ? "bg-green-700 text-white" : "bg-gray-300 text-black"
            }`}
            >
               {testKey.toUpperCase()}
            </button>
      </div>
    ))}
    {/* <button
          onClick={() => setSelectedTest(null)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset Filter
        </button> */}
  </div>
) : (
  <p>Loading...</p>
)}


      {/* Search Bar */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Search Patient's name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow p-2 rounded-l-md bg-gray-100 text-black"
        />
        {/* <button className="bg-gray-200 text-green-700 px-4 rounded-r-md">
          &#128269;
        </button> */}
      </div>

      {/* Tabs and Filter */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-white text-green-900 font-semibold rounded-md">
          Appointments
          </button>
          {/* <button className="px-4 py-2 text-white font-semibold rounded-md">
          Patients
          </button> */}
        </div>
        <div className="relative">
          {/* <button className="bg-gray-200 text-green-900 px-4 py-2 rounded-md">
            Today &#9662;
          </button> */}
          {/* <div className="absolute top-full mt-1 bg-white text-black rounded-md shadow-lg">
            {['Yesterday', 'This week', 'This month'].map((filter, idx) => (
              <button
                key={idx}
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                {filter}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* New Patients */}
      <div className="mt-6">
  <h2 className="text-xl font-bold text-white">New Appointment</h2>
  <div className="space-y-4 mt-4">
    {filteredNames.length === 0  ? (
      <p>No appointments found for your lab yet.</p>
    ) : (
      filteredNames.map((appointment) => (
        <div key={appointment.id} className="flex items-center bg-white text-black">
          <img
            src={appointment.doctorId?.profilePicture}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="font-bold text-lg">Doctor {appointment.doctorId?.fullname || appointment.picture1}</p>
            <p className="text-sm">
             Doctor's email: <span className="text-green-600">{appointment.doctorId?.email} </span>
            </p>
            <p className="text-sm">
              Patient's Name: <span className="text-green-600">{appointment.patientName} </span>
            </p>
            <p className="text-sm">
              Test to be carried out: <span className="text-green-600">{appointment.testName}</span> 
            </p>
            <p className="text-sm">
              Patient's contact: <span className="text-green-600">{appointment.patientContact}</span> 
            </p>
            <p>{appointment.testResult}</p>
            <p className="text-sm">
              {new Date(appointment.createdAt).toLocaleDateString()} 
            </p>

            <button className="px-1 py-2 mr-5 bg-#007BFF text-#fff cursor-pointer" onClick={() => {
              setEditTest(appointment._id);
              // setFormData({
              //   testName: appointment.testName,
              //           patientName: appointment.patientName,
              //           patientContact: appointment.patientContact,
              //           testResult: appointment.testResult ,
              //           status:appointment.status,
              //           AmountPaid: appointment.AmountPaid,
              //           MedicalAdvice:appointment.MedicalAdvice, 
              //           drugPrescription: appointment.drugPrescription|| '',
              // })
            }}>
              Send result
            </button>

          </div>
          {editTest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">send the result</h2>
            <form onSubmit={handleEditSubmit} className="space-y-6">
            <button
        onClick={() => setEditTest(false)}
        className="absolute top-2 right-2 bg-red-500 text-black rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>
              {Object.keys(userData).map((key) =>
             
                key !== "picture1" &&
                   key !== "picture2" &&
                      key !== "picture3"
              )}
    
     
          
              <div className="flex flex-col">
            <label  className="block text-sm font-medium text-gray-600 mb-1">
              Test Result:
              <input
                type="text"
                name="testResult"
                value={formData.testResult}
                onChange={handleChange}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ margin: '10px 0', padding: '5px' }}
              />
            </label>
            </div>
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount Paid:
              <input
                type="text"
                name="AmountPaid"
                value={formData.AmountPaid}
                onChange={handleChange}
                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ margin: '10px 0', padding: '5px' }}
              />
            </label>
            </div>
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-1">

      
    Status:
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      style={{ margin: '10px 0', padding: '5px', width: '100%' }}
    >
      <option value="">Select Status</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
      <option value="In Progress">In Progress</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </label>
  </div>

  <div className="flex flex-col">
  <label className="block text-sm font-medium text-gray-600 mb-1">
              Medical Advice:
              <textarea
                name="MedicalAdvice"
                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.MedicalAdvice}
                onChange={handleChange}
                style={{ margin: '10px 0', padding: '5px' }}
              />
            </label>
            </div>

            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Drug Prescription:
              <textarea
                name="drugPrescription"
                value={formData.drugPrescription}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ margin: '10px 0', padding: '5px' }}
              />
            </label>
            </div>
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
        </div>

      )}

        </div>

        
      ))
    )}

        {/* Render Appointments */}
        {/* {filteredData ? (
        <div className="flex space-x-4 mt-4 overflow-x-auto">
          {['testA', 'testB', 'testC']
            .filter((key) => !selectedTest || key === selectedTest)
            .map((testKey, index) => (
              <div
                key={index}
                className="bg-gray-200 text-black rounded-lg p-3 w-44 flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
                <p className="text-sm font-medium">{userData[testKey]}</p>
                <button className="mt-2 text-green-700 font-semibold">View Appointment</button>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    {/* <div className="text-right">
      <p className="font-bold">$230</p>
      <button className="text-green-700 font-semibold">Add payment</button>
    </div> */}
  </div>
</div>

      </div>


    </>
 
  );
};

export default LabDashboard;
















































