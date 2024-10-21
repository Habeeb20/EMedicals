

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CemeteryLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_c}/clogin`, formData);
      setLoading(false);
      toast.success('Login successful!');

      // Store token in localStorage or context
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Error occurred during login.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />

          <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-lg" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CemeteryLogin;
