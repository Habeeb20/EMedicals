



import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CemeterySignup = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',

    openingTime: '',
    closingTime: '',
    state: '',
    LGA: '',
    address: '',
    cemeterySpacePrice: '',
    casketName: '',
    casketPrice: '',
    serviceCategory: '',
    chapelName: '',
    chapelAddress: '',
    profilePicture: null,
    casketImage: null,
    flowerImage: null,
    flowerName: '',
    flowerPrice: '',
    verseImage: null,
    verseName: '',
    versePrice: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture' || e.target.name === 'casketImage' || e.target.name === 'flowerImage' || e.target.name === 'verseImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_c}/csignup`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      toast.success('Cemetery created successfully!');
      navigate('/cemeterylogin')
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error occurred during signup.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input-field" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="input-field" required />
        
          <input type="time" name="openingTime" onChange={handleChange} className="input-field" required />
          <input type="time" name="closingTime" onChange={handleChange} className="input-field" required />
          <input type="text" name="state" placeholder="State" onChange={handleChange} className="input-field" required />
          <input type="text" name="LGA" placeholder="LGA" onChange={handleChange} className="input-field" required />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input-field" required />
          <input type="number" name="cemeterySpacePrice" placeholder="Cemetery Space Price" onChange={handleChange} className="input-field" required />
          <input type="text" name="casketName" placeholder="Casket Name" onChange={handleChange} className="input-field" required />
          <input type="number" name="casketPrice" placeholder="Casket Price" onChange={handleChange} className="input-field" required />
          <input type="text" name="serviceCategory" placeholder="Service Category" onChange={handleChange} className="input-field" required />
          <input type="text" name="chapelName" placeholder="Chapel Name" onChange={handleChange} className="input-field" required />
          <input type="text" name="chapelAddress" placeholder="Chapel Address" onChange={handleChange} className="input-field" required />
          
          <label>Profile Picture:</label>
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} className="input-field" required />
          
          <label>Casket Image:</label>
          <input type="file" name="casketImage" accept="image/*" onChange={handleChange} className="input-field" required />
          
          <label>Flower Image:</label>
          <input type="file" name="flowerImage" accept="image/*" onChange={handleChange} className="input-field" required />
          <input type="text" name="flowerName" placeholder="Flower Name" onChange={handleChange} className="input-field" required />
          <input type="number" name="flowerPrice" placeholder="Flower Price" onChange={handleChange} className="input-field" required />
          
          <label>Verse Image:</label>
          <input type="file" name="verseImage" accept="image/*" onChange={handleChange} className="input-field" required />
          <input type="text" name="verseName" placeholder="Verse Name" onChange={handleChange} className="input-field" required />
          <input type="number" name="versePrice" placeholder="Verse Price" onChange={handleChange} className="input-field" required />

          <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-lg" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CemeterySignup;
