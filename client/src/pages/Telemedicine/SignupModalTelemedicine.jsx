import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignupModalTelemedicine = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    path: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    NameOfBusiness: "",
    password: "",
  });
  const [error, setError] = useState(null);
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

    // Email validation before submitting
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_T}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response?.status === 200) {
        toast.success("Registration successful");
        navigate("/telemedicinelogin");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Error during registration:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred during registration"
      );
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg h-[600px] overflow-y-scroll">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">Step {step} of 2 <Link to="/logintelemedicine"  className="px-20 font-bold text-blue-600">Login</Link></p>
            <div className="h-2 w-full bg-gray-200 rounded-full ">
              <div
                className={`h-2 bg-blue-500 rounded-full ${
                  step === 1 ? "w-1/2" : "w-full"
                }`}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          {step === 1 ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Let’s get you started.</h2>
              <p className="text-sm text-gray-600 mb-6">
                Choose your path and we’ll guide you to the right solution.
              </p>
              <div className="space-y-4">
                {[
                  "Individual or Business",
                  "Healthcare Provider",
                  "Insurer / HMO",
                  "Healthcare Professional",
                  "Developer / Startup",
                ].map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 border rounded-lg hover:shadow-md cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="path"
                      value={option}
                      onChange={handleInputChange}
                      required
                      className="form-radio text-blue-500 h-5 w-5 mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-4">Full Name *</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your privacy is our priority. We will only use your contact
                information to assist you and improve your experience with us.
                Please note, this is not a sign-up.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                    required
                    className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleInputChange}
                    required
                    className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter a valid email"
                  name="email"
                  onChange={handleInputChange}
                  required
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  onChange={handleInputChange}
                  required
                  placeholder="Enter valid phone number"
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Name of the business/institution you’re affiliated with"
                  name="NameOfBusiness"
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
                    onClick={handlePrevious}
                    type="button"
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Previous
                  </button>
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
                      "Register"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModalTelemedicine;
