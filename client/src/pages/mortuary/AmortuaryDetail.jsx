import React from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';
const  AmortuaryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [leader, setLeader] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('GENERAL');


    useEffect(() => {
        if (!id) {
          setError("user id is not found");
        }
    
        axios.get(`${import.meta.env.VITE_API_m}/mortuarydetails/${id}`)
          .then((response) => {
            setLeader(response.data.user);
            setError(null);
          })
          .catch((error) => {
            setError('Failed to load profile. Please try again later.');
          });
      }, [id]);

      if (error) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Reload
            </button>
          </div>
        );
      }
    
    
  if (!leader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-semibold mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-50">
      {/* Funeral Home Card */}
      <div className="bg-white p-4 rounded-lg shadow-md flex space-x-4">
        <img
                   src={leader.profilePicture || 'https://via.placeholder.com/150'}
          alt="God Is Able Funeral Home"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-lg">{leader.name}</h2>
          <div className="flex items-center space-x-1 text-green-600">
            <FaStar />
            <span>4.7</span>
          </div>
          <p className="text-gray-400 text-sm">800m away</p>
        </div>
      </div>

      {/* Opening and Closing Times */}
      <div className="flex justify-between mt-4">
        <div className="bg-gray-200 text-gray-600 p-2 rounded-lg text-sm">
          <p>Opening time</p>
          <p>1:00am</p>
        </div>
        <div className="bg-gray-200 text-gray-600 p-2 rounded-lg text-sm">
          <p>Closing time</p>
          <p>1:00am</p>
        </div>
      </div>

      {/* Services */}
      <div className="flex flex-wrap space-x-2 mt-4">
        {[
          "Cemetery",
          "Burial Service",
          "Cremation",
          "Casket",
          "Pregnancy",
        ].map((service, index) => (
          <span
            key={index}
            className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm my-1"
          >
            {service}
          </span>
        ))}
      </div>

      {/* About Section */}
      <div className="mt-4">
        <h3 className="font-bold text-lg">About</h3>
        <p className="text-gray-600 text-sm mt-2">
        {leader.bio}
        </p>
        <button className="text-green-600 font-semibold mt-2">Read more</button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 mt-4">
        {["Cemetery", "Mortuary", "Clinic"].map((category, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-sm"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Calendar */}
      <div className="flex space-x-2 mt-4 overflow-x-auto">
        {[
          { day: "Mon", date: "21" },
          { day: "Tue", date: "22" },
          { day: "Wed", date: "23", active: true },
          { day: "Thu", date: "24" },
          { day: "Fri", date: "25" },
          { day: "Sat", date: "26" },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-2 text-center rounded-lg ${
              item.active
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <p>{item.day}</p>
            <p>{item.date}</p>
          </div>
        ))}
      </div>

      {/* Booking Times */}
      <div className="flex flex-wrap space-x-2 mt-4">
        {["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"].map(
          (time, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm mt-2"
            >
              {time}
            </span>
          )
        )}
      </div>

      {/* Get Started Button */}
      <button className="w-full bg-green-600 text-white py-3 mt-6 rounded-lg text-center font-semibold">
        Get Started
      </button>
    </div>
  );
};

export default AmortuaryDetail;
