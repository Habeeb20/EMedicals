import React, { useState } from 'react';
import im from '../../../assets/EMedicals/floatingLogo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignupHospitalAdmin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: '',
    specialization: '',
 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const response = await axios.post(`${import.meta.env.VITE_API_HO}/register`, form, {
        headers: {
          'Content-Type': 'application/json',
      
        },
      });

      if (response.data) {
        navigate('/loginhospitaladmin');
        toast.success('Successfully registered');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'A network error occurred';
      console.log(err)
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const doctorSpecializations = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Surgery',
    'Urology',
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Admin Sign up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                Hospital Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="fullname"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="John Doe"
              />
            </div>

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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="role"
                onChange={handleInputChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            {formData.role === 'doctor' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
                  Specialization
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="specialization"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Specialization</option>
                  {doctorSpecializations.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="123piano"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
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
              Already have an account?{' '}
              <a href="/loginhospitaladmin" className="text-blue-500 font-semibold">
                Login.
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupHospitalAdmin;
