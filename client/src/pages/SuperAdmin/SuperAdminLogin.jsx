import { useState } from "react";
import im from "../../assets/EMedicals/floatingLogo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

const SuperAdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
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
        `${import.meta.env.VITE_API_SA}/superadminlogin`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email);
        toast.success("Login successful!");
        navigate("/superadmindashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      console.log(err);
      toast.error("login failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#a0c1d9] to-[#00114d]">
      <div className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl">
      <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-[#00124d]">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email Input */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
          id="email"
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
            id="password"
                  name="password"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                  placeholder="123piano"
              className="w-full px-10 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            />
            
            <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825a10.05 10.05 0 005.996-5.945m-7.982 3.854A4.978 4.978 0 0112 15.002v-3m0-3.973c-.7 0-1.378.118-2.01.33m0 0A9.982 9.982 0 003 12.032m0 0l.01.003M12 3.002c-2.337 0-4.505.893-6.01 2.345m0 0L12 12l.003.002"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0019.875 12m-7.875 3m4.883-3a9.98 9.98 0 003-7.952m-7.998 7.952m-4.883 3A9.98 9.98 0 013.002 12"
                      ></path>
                    </svg>
                  )}
                </button>
          </div>

          <div className="flex items-center justify-center">
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r bg-blue-700  text-white 
            font-bold rounded-lg shadow-lg hover:bg-blue-900
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
             focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    className=" animate-spin mx-auto"
                    size={24}
                  />
                ) : (
                  "Login"
                )}
              </motion.button>
            </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

     
          {/* Social Login */}
          <div className="mt-4 text-center">
            <p className="text-gray-500">Or login with</p>
            <div className="flex justify-center gap-5 mt-2">
              <FaFacebook className="text-blue-600 text-2xl cursor-pointer hover:scale-110 transition" />
              <FaGoogle className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition" />
              <FaApple className="text-black text-2xl cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Signup Link */}
          <div className="mt-4 text-center text-gray-500">
            <p>
              Don't have an account?{" "}
              <a href="/superadminsignup" className="text-[#00124d] font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
