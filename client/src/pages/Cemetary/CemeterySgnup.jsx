
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CemeterySignup = () => {
  const navigate = useNavigate();
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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (['profilePicture', 'casketImage', 'flowerImage', 'verseImage'].includes(e.target.name)) {
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
      toast.success('Cemetery created successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/cemeterylogin');
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error occurred during signup.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12">
      <ToastContainer />
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-2xl rounded-xl transform transition-all hover:scale-105 duration-300 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Cemetery Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Account Details</h3>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Cemetery Name"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Cemetery name"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Email address"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 pr-12"
                required
                aria-label="Password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-500 transition-colors duration-200"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && togglePasswordVisibility()}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Phone number"
              />
            </div>
          </div>

          {/* Cemetery Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Cemetery Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="time"
                name="openingTime"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Opening time"
              />
              <input
                type="time"
                name="closingTime"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Closing time"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="State"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="LGA"
                placeholder="Local Government Area"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Local Government Area"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Address"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="cemeterySpacePrice"
                placeholder="Cemetery Space Price"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Cemetery space price"
              />
            </div>
          </div>

          {/* Casket Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Casket Details</h3>
            <div className="relative">
              <input
                type="text"
                name="casketName"
                placeholder="Casket Name"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Casket name"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="casketPrice"
                placeholder="Casket Price"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Casket price"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                name="casketImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                required
                aria-label="Casket image upload"
              />
            </div>
          </div>

          {/* Service and Chapel Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Service and Chapel Details</h3>
            <div className="relative">
              <input
                type="text"
                name="serviceCategory"
                placeholder="Service Category"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Service category"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="chapelName"
                placeholder="Chapel Name"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Chapel name"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="chapelAddress"
                placeholder="Chapel Address"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Chapel address"
              />
            </div>
          </div>

          {/* Flower Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Flower Details</h3>
            <div className="relative">
              <input
                type="text"
                name="flowerName"
                placeholder="Flower Name"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Flower name"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="flowerPrice"
                placeholder="Flower Price"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Flower price"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                name="flowerImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                required
                aria-label="Flower image upload"
              />
            </div>
          </div>

          {/* Verse Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Verse Details</h3>
            <div className="relative">
              <input
                type="text"
                name="verseName"
                placeholder="Verse Name"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Verse name"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="versePrice"
                placeholder="Verse Price"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                required
                aria-label="Verse price"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                name="verseImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                required
                aria-label="Verse image upload"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Profile Picture</h3>
            <div className="relative">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                required
                aria-label="Profile picture upload"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h-8z"
                  ></path>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/cemeterylogin"
            className="text-indigo-500 font-medium hover:underline hover:text-indigo-600 transition-colors duration-200"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default CemeterySignup;
