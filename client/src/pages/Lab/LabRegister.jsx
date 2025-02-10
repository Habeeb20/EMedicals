import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import im from "../../assets/EMedicals/floatingLogo.png"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const LabRegister = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        password:'',
        email:'',
        role: '',
    
        state:'',
        LGA: '',
      

    })
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
}

const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_L}/register`,formData, {
            headers:{'Content-Type' : 'application/json'}
        });

        if(response.data) {
            navigate('/lmakepayment');
            toast.success("successfully registered")
        } 
    } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message || "a network error occured");
        toast.error(error?.response?.data?.message || "a network error occured")
    } finally{
        setIsLoading(false)
    }
}
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50">
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-center mb-0">
        <img src={im} alt="logo" className="rounded-full" />
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Lab Admin Sign up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
               Lab Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Zenith Lab"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
               state
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="state"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="your state"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                LGA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="LGA"
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="your local government area"
              />
            </div>

            
         

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="role"
                onChange={handleInputChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a Role</option>
                <option value="admin">Admin</option>
                {/* <option value="doctor">Lab technician</option> */}
              
              </select>
            </div>

         
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password 
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
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

         

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
            <p className="mt-4 text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <a href="/lablogin" className="text-blue-500 font-semibold">
                Login.
              </a>
            </p>
          </form>
        </div>


        </div>
    </div>
  )
}

export default LabRegister
