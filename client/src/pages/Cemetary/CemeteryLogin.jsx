
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CemeteryLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_c}/clogin`, formData);
      setLoading(false);
      toast.success('Login successful!', { position: 'top-right', autoClose: 3000 });
      localStorage.setItem('token', response.data.token);
      // Optionally redirect to a dashboard
      // window.location.href = '/dashboard';
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error occurred during login.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl transform transition-all hover:scale-105 duration-300 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Cemetery Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/cemeterysignup" className="text-indigo-500 font-medium hover:underline hover:text-indigo-600 transition-colors duration-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default CemeteryLogin;
