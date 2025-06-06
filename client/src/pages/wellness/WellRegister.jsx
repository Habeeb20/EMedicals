import { useState } from "react";
import im from "../../assets/EMedicals/floatingLogo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const WellRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Set initial state to null
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
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_W}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response?.status === 200) {  
        toast.success("Registration successful!");
        navigate("/wellnesslogin");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Error during registration:", err);
      setError(err.response?.data?.message || "An error occurred during registration");
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-center mb-4">
          <img src={im} alt="logo" className="rounded-full" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Register as an Admin of a wellness center
          </h2>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name of your company
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Betty Beauty"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="name@domain.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                  placeholder="123piano"
                />

                  <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                           >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                           </button>
              </div>
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
                  <AiOutlineLoading3Quarters className="animate-spin mx-auto" size={24} />
                ) : (
                  "Register"
                )}
              </motion.button>
            </div>
          </form>
          <p className="mt-4 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <a href="/wellnesslogin" className="text-blue-500 font-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellRegister;
