import React, {useState, useEffect} from "react";
import { MdEmail, MdLock, MdPhone } from "react-icons/md";
import im from "../../assets/EMedicals/floatingLogo.png"
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SuperAdminSignup = () => {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })
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
        e.preventDefault()

   

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_SA}/superadminsignup`, formData, {
            headers:  {'Content-Type': 'application/json'}
          });
         
       
      
          if (response.data) {
            navigate('/superadminlogin');
            // toast.success("Successfully registered");
          }
        } catch (err) {
          console.error('Axios Error:', err);
      
          const errorMessage = err.response?.data?.message || 'A network error occurred';
          setError(errorMessage);
        //   toast.error("an error occurred");

        
        } finally {
          setIsLoading(false);
        }
      };
    


  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#a0bad9] to-[#000d4d]">
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl">
      <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-[#00184d]">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
    
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email Input */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input

                type="email"
                name="email"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="name@domain.com"
              className="w-full px-10 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <MdLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input

                  name="password"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="123piano"
              className="w-full px-10 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            />
               <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825a10.05 10.05 0 005.996-5.945m-7.982 3.854A4.978 4.978 0 0112 15.002v-3m0-3.973c-.7 0-1.378.118-2.01.33m0 0A9.982 9.982 0 003 12.032m0 0l.01.003M12 3.002c-2.337 0-4.505.893-6.01 2.345m0 0L12 12l.003.002" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0019.875 12m-7.875 3m4.883-3a9.98 9.98 0 003-7.952m-7.998 7.952m-4.883 3A9.98 9.98 0 013.002 12" />
                    </svg>
                  )}
                </button>
          </div>


          {/* <div className="relative">
            <MdLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
          type="file"
                name="profilePicture"
                onChange={handleFileChange}
                required
                disabled={isLoading}
              className="w-full px-10 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            />
          </div>
 */}

          {/* Submit Button */}
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
          {/* Back to Login */}
          <div className="mt-4 text-center text-gray-500">
            <p>
              Already have an account?{" "}
              <a href="/superadminlogin" className="text-[#00154d] font-semibold hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminSignup;
