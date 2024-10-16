

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import im from "../../assets/EMedicals/floatingLogo.png"
const UserResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API}/reset-password/${token}`, { newPassword });
      toast.success("Password reset successfully");
      navigate('/login');
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-full max-w-xs mx-auto ">
      <div className="flex justify-center mb-0">
        <img src={im} alt="logo" className="rounded-full" />
      </div>


      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <h5>enter your new password below</h5>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-800 birder-radius-20">
          Reset Password
        </button>
      </form>

    </div>
  </div>









  
  );
};

export default UserResetPassword;
