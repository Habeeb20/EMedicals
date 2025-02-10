import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const LoginTeleMedicine = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [path, setPath] = useState('')
  const [error, setError] = useState([]);
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

      const response = await axios.post(
        `${import.meta.env.VITE_API_T}/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email);
        console.log(response.data.path)
        setPath(response.data.path)
        toast.success("login successful");
        navigate("/teledashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "an error occured");

      console.log(err);
      toast.error("login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg h-[500px] overflow-y-scroll">
        <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Login to your telemedicine account
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4"></div>
        <input
          type="email"
          placeholder="Enter a valid email"
          name="email"
          onChange={handleInputChange}
          required
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          name="password"
          onChange={handleInputChange}
          required
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-900 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin mx-auto"
                size={24}
              />
            ) : (
              "Login"
            )}
          </motion.button>
        </div>
        <p className="mt-4 text-center text-gray-500 text-sm">
            
              <a href="/teleforgotpassword" className="text-blue-500 font-semibold">
              forgotpassword?{" "}
              </a>
            </p>
        <p className="mt-4 text-center text-gray-500 text-sm">
              Dont have an account?{" "}
              <a href="/SignupModalTelemedicine" className="text-blue-500 font-semibold">
                sign up.
              </a>
            </p>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default LoginTeleMedicine;
