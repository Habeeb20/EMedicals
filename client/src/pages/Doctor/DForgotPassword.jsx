// components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import im from "../../assets/EMedicals/floatingLogo.png";
const DForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_D}/forgot-password`, {
        email,
      });
      toast.success("Password reset email sent");
      setSuccess("email has been sent sucessfully");
      navigate("/Dreset-password/:token");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      setError("failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto ">
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>

        {/* <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1"> */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              Forgot Password
            </h2>
            <h5>
              enter your email address and we will send you all the instructions
            </h5>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DForgotPassword;
