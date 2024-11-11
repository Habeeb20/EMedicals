import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart } from 'react-chartjs-2';
import Navbar from "../../components/Navbar";

const ProfilePharmacy = () => {
  const [profileData, setProfileData] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [getDrugs, setGetDrugs] = useState([])
  const [drugDetails, setDrugDetails] = useState({ name: '', description: '', image: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Token authentication
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('authToken')
        console.log(token)
        if(!token){
          throw new Error("no token found")
        }
        const response = await axios.get(`${import.meta.env.VITE_API_PH}/profile`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
        console.log(response)
        setProfileData(response.data.pharmacy);
      } catch (error) {
     
        console.log(error.response?.data || error.message);

        toast.error("Failed to load profile data.");
      }
    };
    fetchProfileData()
 
  },[navigate] );

 

  useEffect(() => {
    const fetchDrugsData = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get(`${import.meta.env.VITE_API_PH}/getdrugforapharmacist`, {
          headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
          },
          withCredentials:true
  
        });
        console.log(response)
        setGetDrugs(response.data.drugs);
      } catch (error) {
        console.log(error)
        toast.error("Failed to load drugs data.");
      }
    };
    fetchDrugsData()

  }, [navigate])



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setDrugDetails({ ...drugDetails, profilePicture: e.target.files[0] });
  };

  const handleDrugSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', drugDetails.name);
    formData.append('description', drugDetails.description);
    formData.append('profilePicture', drugDetails.profilePicture);
    formData.append('price', drugDetails.price);
    formData.append('stock', drugDetails.stock);
    formData.append('category', drugDetails.category);
  

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${import.meta.env.VITE_API_PH}/drug`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Drug added successfully!");
      fetchDrugsData();
    } catch (error) {
      console.log(error)
      toast.error("Failed to upload drug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">Pharmacist Profile</h1>
          <p className="text-gray-700 text-lg">Name: {profileData.name}</p>
          <p className="text-gray-700 text-lg">Email: {profileData.email}</p>
        </div>

        {/* Drug Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Manage Drugs</h2>
          <form onSubmit={handleDrugSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Drug Name</label>
              <input
                type="text"
                name="name"
                value={drugDetails.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={drugDetails.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Drug Price</label>
              <input
                type="number"
                name="price"
                value={drugDetails.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">category</label>
              <input
                type="text"
                name="category"
                value={drugDetails.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">quantity available</label>
              <input
                type="number"
                name="stock"
                value={drugDetails.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24" />
              ) : (
                'Add Drug'
              )}
            </button>
          </form>
        </div>

        {/* Drugs List */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Drugs Inventory</h2>
          <ul>
            {getDrugs.map((drug) => (
              <li key={drug.id} className="mb-4">
                <img src={drug.profilePicture} alt={drug.name} className="w-20 h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-lg text-gray-700">Name of drug:{drug.name}</p>
                <p className="text-gray-600">drug description: {drug.description}</p>
                <p className="text-gray-600">drug category: {drug.category}</p>
                <p className="text-gray-600">Number in stock:{drug.stock}</p>
                <p className="text-gray-600">price of drug: {drug.price}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Data Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Drug Data Chart</h2>
          <Chart
            type="bar"
            data={{
              labels: drugs.map(drug => drug.name),
              datasets: [
                {
                  label: 'Quantity',
                  data: drugs.map(drug => drug.quantity || 0),
                  backgroundColor: 'rgba(124, 58, 237, 0.6)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePharmacy;
