import React, { useState } from 'react';
import axios from 'axios';
import im from "../../../assets/EMedicals/floatingLogo.png";
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';


const statesWithLGAs = {
  Lagos: ['Ikeja', 'Epe', 'Ikorodu', 'Surulere', 'Badagry'],
  Osun: ['Ife', 'Ede', 'Ilesa', 'Osogbo', 'Ikirun'],

};

const PatientSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    profilePicture: '',
    phoneNumber: '',
    state: '',
    homeAddress: '',
    LGA: '',
    allergics: '',
    createdAt: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [LGAs, setLGAs] = useState([]); // Store LGAs based on state selection

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'state') {
      const selectedState = e.target.value;
      setLGAs(statesWithLGAs[selectedState] || []); // Update LGAs based on the selected state
      setFormData({ ...formData, state: selectedState, LGA: '' }); // Reset LGA when state changes
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post(`${import.meta.env.VITE_API_P}/patientregister`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        navigate('/patientlogin');
        toast.success('Successfully registered');
      }
    } catch (error) {
      console.error('Axios Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-6 py-8 md:py-10">
        <div className="flex justify-center mb-4">
          <img src={im} alt="logo" className="rounded-full w-24 h-24 object-cover" />
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign up as a Patient</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="fullname"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="John Paul"
            />
          </div>
  
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="name@domain.com"
            />
          </div>
  
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="phoneNumber"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="08176287534"
            />
          </div>
  
          {/* Home Address */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="homeAddress">
              Home Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="homeAddress"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="No 7, Olufade Crescent, Ikeja, Lagos"
            />
          </div>
  
          {/* Allergics */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergics">
              Allergics
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="allergics"
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="Onions, Fish, etc."
            />
          </div>
  
          {/* State */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              State
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            >
              <option value="">Select State</option>
              {Object.keys(statesWithLGAs).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
  
          {/* LGA */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LGA">
              LGA
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="LGA"
              value={formData.LGA}
              onChange={handleInputChange}
              required
              disabled={isLoading || !formData.state}
            >
              <option value="">Select LGA</option>
              {LGAs.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
  
          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              required
              disabled={isLoading}
              className="block w-full text-sm text-gray-500"
            />
          </div>
  
          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                type="password"
                placeholder="123piano"
              />
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Register'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  </>
  
 
  );
};

export default PatientSignup;
