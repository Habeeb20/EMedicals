import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import im from "../../assets/EMedicals/floatingLogo.png"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone:'', password: '', state:'', LGA: '', location: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          const form = new FormData();
          Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
          });
          const response = await axios.post(`${import.meta.env.VITE_API_MP1}/signup`, form, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.data) {
            localStorage.setItem("user", JSON.stringify(formData.email))
            navigate('/phmakepayment');
            toast.success('Successfully registered');
          }
        } catch (err) {
            console.error('Axios Error:', err);
        
            const errorMessage = err.response?.data?.message || 'A network error occurred';
            setError(errorMessage);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false)
        }
    };
  return (
    <div>
     <div className="flex flex-col items-center mt-40 justify-center h-screen ">
      <div className="w-full max-w-xs mx-auto">
     

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>

          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Name of your pharmacy
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="phone"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="08133445566"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
               state
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="state"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g Lagos state"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              LGA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="LGA"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password (min. 8 characters)
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
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                             >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                             </button>
              </div>
              <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">
                Your  office Address
              </label>
              <input
                type="text"
                name="location"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="block w-full text-sm text-gray-500"
              />
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r bg-purple-700 text-white font-bold rounded-lg shadow-lg hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
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
              Already have an account?{" "}
              <a href="/medicalpharmacylogin" className="text-purple-500 font-semibold">
                login.
              </a>
            </p>
          </form>
        </div>
     
      </div>
    </div>
      
    </div>
  )
}

export default Signup
