import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Navbar from '../../components/Navbar'
const HRMSSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const response = await axios.post(`${import.meta.env.VITE_API_HRMS}/signup`, form, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        navigate('/hrmsmakepayment');
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
    <>
      <Navbar />
      <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-gray-100 w-64 p-4 hidden md:block opacity-70">
        <div className="text-purple-600 font-bold text-2xl mb-6">HRMS</div>
        <nav>
          <ul className="space-y-4">
            <li className="text-purple-600 font-medium">Dashboard</li>
            <li>All Employees</li>
            <li>All Departments</li>
            <li>Attendance</li>
            <li>Payroll</li>
            <li>Jobs</li>
            <li>Conditions</li>
            <li>Leaves</li>
            <li>Holidays</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 opacity-70">
          <div>
            <h1 className="text-xl font-bold">Hello Robert 👋</h1>
            <p className="text-gray-500">Good Morning</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2 w-64 shadow-sm"
            />
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 opacity-70">
          {[
            { title: "Total Employees", count: 560, update: "July 14, 2023" },
            { title: "Total Applicants", count: 1050, update: "July 14, 2023" },
            { title: "Today Attendance", count: 470, update: "July 14, 2023" },
            { title: "Total Projects", count: 250, update: "July 14, 2023" },
          ].map((stat, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <h2 className="text-gray-500 text-sm">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-gray-400 text-xs">Updated: {stat.update}</p>
            </div>
          ))}
        </section>

        {/* Attendance Overview */}
        <section>
          <div className="flex justify-between items-center mb-4 opacity-20">
            <h2 className="text-lg font-bold">Attendance Overview</h2>
            <select className="border px-2 py-1 rounded">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border">
            <p>Attendance Chart Placeholder</p>
          </div>
        </section>
      </main>

      {/* Login Section (Mobile only) */}
      <div className="bg-gray-50 p-6 w-full md:w-1/3 md:block hidden">
        <div className="text-purple-600 font-bold text-2xl mb-4">HRMS</div>
        <h2 className="text-lg font-bold mb-2">Welcome 👋</h2>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-gray-500 mb-4">Please Register here</p>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <input
              type="text"
              placeholder="Company name"
              className="border rounded w-full px-4 py-2"
              name="name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded w-full px-4 py-2"
              name="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="border rounded w-full px-4 py-2"
              name="password"
              onChange={handleInputChange}
              required
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
              <a href="/hrmslogin" className="text-purple-500 font-semibold">
                login.
              </a>
            </p>
        </form>
      </div>
    </div>
    </>
  
  );
};

export default HRMSSignup;