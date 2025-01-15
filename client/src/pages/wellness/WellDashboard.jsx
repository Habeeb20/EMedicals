import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import { MdDashboard, MdPeople, MdBarChart, MdSettings } from "react-icons/md";
import toast from "react-hot-toast"
const WellDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    repName:'',
    phone:'',
    state:'',
    LGA:'',
    location:'',
    category:'',
    masseuse: '',
    nannies:'',
    details:'',
    discountFor:'',
    availableTime:'',
    features:'',
    services:'',
    picture1: '',
    picture2:'',
    picture3: '',
    discount:'',
    discountPer:'',

  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] =useState('')
  const [userId, setUserId] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_W}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setUserData(data);
        setUserId(data._id);
        setUser(data);
    
        toast.success("you welcome")
      } catch (err) {
        console.log(err)
        toast.error("failed to fetch user data")
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        `${import.meta.env.VITE_API_W}/${userId}`,
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

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-4 absolute md:relative transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >

<button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
      >
        ✕
      </button>
        <h1 className="text-2xl font-semibold mb-6">Menu</h1>
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdDashboard size={20} />
            <span>Dashboard for {user.name}</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdPeople size={20} />
            <span>Users</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdBarChart size={20} />
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdSettings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white shadow-lg overflow-auto md:ml-0 ml-0">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-md">
          <button
            className="md:hidden text-blue-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </button>
          <div className="text-lg font-semibold text-gray-700">Welcome, {user.name}</div>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200">
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stats Card 1 */}
            <div className="bg-blue-100 rounded-lg shadow p-4 flex items-center justify-between">
              <div className="text-gray-700 font-medium">Your Account</div>
              <div className="text-2xl font-bold text-blue-700">1</div>
            </div>
            {/* Stats Card 2 */}
            <div className="bg-green-100 rounded-lg shadow p-4 flex items-center justify-between">
              <div className="text-gray-700 font-medium">Total Revenue</div>
              <div className="text-2xl font-bold text-green-700">$10,000</div>
            </div>
            {/* Stats Card 3 */}
            <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center justify-between">
              <div className="text-gray-700 font-medium">Pending Requests</div>
              <div className="text-2xl font-bold text-yellow-700">23</div>
            </div>
          </div>
          {/* Graph Placeholder */}
          <div className="bg-gray-100 rounded-lg shadow p-6 h-64 flex items-center justify-center text-gray-600 text-lg font-semibold">
            Graph Placeholder
          </div>
          <h4 className="">  Your email: <span className="font-bold"> {userData.email}</span></h4>
          <h4 className="">  Your fullname: <span className="font-bold"> {user.name}</span></h4>
          <h4 className="">  Your representative: <span className="font-bold"> {user.repName}</span></h4>
          <h4 className="">  Your phone number: <span className="font-bold"> {user.phone}</span></h4>
          <h4 className="">  Your state of Origin: <span className="font-bold"> {user.state}</span></h4>
          <h4 className="">  Your LGA: <span className="font-bold"> {user.LGA}</span></h4>
          <h4 className="">  Details: <span className="font-bold"> {user.details}</span></h4>
          <h4 className="">  Features: <span className="font-bold"> {user.features}</span></h4>
          <h4 className="">  Your services: <span className="font-bold"> {user.services}</span></h4>
          <h4 className="">  Your discount: <span className="font-bold"> {user.discount}</span></h4>
          <h4 className="">  Your discount percentage: <span className="font-bold"> {user.discountPer}</span></h4>
          <h4 className="">  Your discount for: <span className="font-bold"> {user.discountFor}</span></h4>
          <h4 className="">  Your Home Address: <span className="font-bold"> {user.location}</span></h4>
          <h4 className="">  Your Available time: <span className="font-bold"> {userData.availableTime}</span></h4>
          <img 
  src={user.picture1} 
  alt="User" 
  className="rounded-full w-32 h-32 object-cover"
/>
<img 
  src={user.picture2} 
  alt="User" 
  className="rounded-full w-32 h-32 object-cover"
/>

<img 
  src={user.picture3} 
  alt="User" 
  className="rounded-full w-32 h-32 object-cover"
/>


{showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "picture1" &&
                   key !== "picture2" &&
                      key !== "picture3"
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Company Name
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
                  phone number(preferably whatsapp number)
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
                  your representative name
                </label>
                <input
                  type="text"
                  name="repName"
                  value={userData.repName}
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
                is discount available  Discount?(yes/No)
                </label>
                <input
                  type="text"
                  name="discount"
                  value={userData.discount}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                what percentage is the dicount if it available
                </label>
                <input
                  type="number"
                  name="discountPer"
                  value={userData.discountPer}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                who can benefit from the discount if it available
                </label>
                <input
                  type="text"
                  name="discountFor"
                  value={userData.discountFor}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

         

            
 
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                Do you have a masseuse?(Yes or No)
                </label>
                <input
                  type="text"
                  name="masseuse"
                  value={userData.masseuse}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                Do you have a nanny that can render service to your customers in need?(Yes or No)
                </label>
                <input
                  type="text"
                  name="nannies"
                  value={userData.nannies}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

          
              
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                other details about your company
                </label>
                <input
                  type="text"
                  name="details"
                  value={userData.details}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

        
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                features
                </label>
                <input
                  type="text"
                  name="features"
                  value={userData.features}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                Your services
                </label>
                <input
                  type="text"
                  name="services"
                  value={userData.services}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 what time will you be Available(e.g 4:00pm - 8:00pm) everyday/ specify the day
                </label>
                <input
                  type="text"
                  name="availableTime"
                  value={userData.availableTime}
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

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  other Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture3")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  other Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture2")}
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
      </div>
    </div>
  );
};

export default WellDashboard;
