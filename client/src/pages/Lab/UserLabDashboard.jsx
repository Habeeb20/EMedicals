
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHospital, FaPrescriptionBottle, FaVials, FaBookDead, FaUserMd } from 'react-icons/fa'; 
import im from '../../assets/EMedicals/young-woman-doctor-white-coat-with-stethoscope-pointing-with-index-finger-side-with-serious-face-standing-orange-wall-removebg-preview 1.png';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import HideGmailPart from '../HideGmailPart';
import im2 from "../../assets/EMedicals/building.png";
import im3 from "../../assets/EMedicals/pexels-cedric-fauntleroy-4270371.png";
import QuickActions from '../User/QuickActions';

import ImageCarousel from '../User/ImageCarousel';
import WellnessAdvert from '../User/WellnessAdvert';
import AllHospital from '../Hospital/AllHospital';



const UserLabDashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [bgImage, setBgImage] = useState(im2); 
    const [labs, setLabs] = useState([])
    const [filteredLabs, setFilteredLabs] = useState([])
    const navigate = useNavigate();

 
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
              throw new Error("No token found");
            }
    
            const response = await axios.get(`${import.meta.env.VITE_API}/getprofile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });
            setUser(response.data.user);
          } catch (err) {
            console.error(err); 
            if (err.response?.status === 401) {
              setError('Unauthorized access, please login again');
              localStorage.removeItem('token');
              navigate('/login');
            } else {
              setError('Failed to fetch profile');
            }
          } finally {
            setLoading(false);
          }
        };
        fetchProfile();
      }, [navigate]);

      useEffect(() => {
        const fetchAllLabs = async () => {
          try {
            const token = localStorage.getItem("token")
            if(!token){
              throw new Error("token not found")
            }
            
            const response = await axios.get(`${import.meta.env.VITE_API_L}/all`)
            if(!response){
              console.log("details not found")
              toast.error("patient not not found")
            }
            console.log("labs!!!", response.data)
            setLabs(response.data)
            setFilteredLabs(response.data)
          } catch (error) {
            console.log(error)
            toast.error(error)
          }
        }
        fetchAllLabs ()
      }, [])
    
      const  handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        const filtered = labs.filter((lab) =>
            lab.location.toLowerCase().includes(term.toLowerCase()) 
        );
        setFilteredLabs(filtered);
      }
    
    
     const  handleLocationSearch = () => {
        const filtered = labs.filter((lab) => {
            return lab.location && lab.location.includes(locationInput);
    
        } );
    
        setFilteredLabs(filtered);
      }

      
  useEffect(() => {

    const intervalId = setInterval(() => {
      setBgImage((prevImage) => (prevImage === im2 ? im3 : im2));
    }, 3000);
    return () => clearInterval(intervalId);
}, []);

if (loading) return <p className="text-center text-indigo-900">Loading profile...</p>;
if (error) return <p className="text-center text-red-500">{error}</p>;

    
return (
  <div>
    <Navbar />

    {/* Page Wrapper */}
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Grid Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLabs.length > 0 ? (
          filteredLabs.map((medical) => {
            return (
              <div
                key={medical._id}
                className="bg-gradient-to-r from-green-50 to-green-200 shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {/* Profile Section */}
                <div className="flex items-center space-x-4">
                  <img
                    src={medical?.picture1 || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="w-16 h-16 rounded-full border-4 border-green-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-green-900">{medical?.name}</h3>
                  </div>
                </div>

                {/* Lab Details */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">Name: </span>
                    {medical.name}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="border-t mt-6 pt-4 space-y-3">
                  <p className="text-lg font-semibold text-green-900">Lab Information</p>
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">Email: </span>
                    {medical.email}
                  </p>
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">State: </span>
                    {medical.state}
                  </p>
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">LGA: </span>
                    {medical.LGA}
                  </p>
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">Location: </span>
                    {medical.location}
                  </p>
                  <p className="text-sm text-green-800">
                    <span className="font-medium text-green-900">Phone: </span>
                    {medical.phone}
                  </p>
                  {labs && (
                    <Link to={`/singlelabdetails/${medical._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-medium mt-4 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                        View Details
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center col-span-full">No lab found.</p>
        )}
      </div>
    </div>
  </div>
);
}

export default UserLabDashboard
