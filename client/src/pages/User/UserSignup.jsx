import React, { useState } from 'react';
import im from '../../assets/EMedicals/floatingLogo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import NavbarOthers from '../../components/NavbarOthers';
const UserSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
  
      const response = await axios.post(`${import.meta.env.VITE_API}/signup`, form);
   
  
      if (response.data) {
        navigate('/userlogin');
        toast.success('Successfully registered');
      }
    } catch (err) {
      console.error('Axios Error:', err);
  
      const errorMessage = err.response?.data?.message || 'A network error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
  
      // Log the full error for more details
      if (err.code === 'ERR_NETWORK') {
        console.error('Network Error:', err);
      } else if (err.response) {
        console.log('Response Data:', err.response.data);
        console.log('Response Status:', err.response.status);
      } else if (err.request) {
        console.log('Request:', err.request);
      } else {
        console.log('Error', err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <NavbarOthers />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="phone"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="08133445566"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password (min. 8 characters)
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="123piano"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
             {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
             
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                    Signing Up
                  </span>
                ) : (
                  'Sign Up'
                )}
              </motion.button>
            </div>
            <p className="mt-4 text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <a href="/userlogin" className="text-blue-500 font-semibold">
                login.
              </a>
            </p>
          </form>
        </div>
     
      </div>
    </div>
    </>
   
  );
};

export default UserSignup;
