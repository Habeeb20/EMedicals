
import React, { useState } from 'react'
import im from "../../assets/EMedicals/floatingLogo.png"
import axios from 'axios'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const LoginDoctor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_D}/doctorlogin`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem("email", email)
      toast.success("successfully logged in")
      navigate('/doctorprofile');
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-center mb-0">
        <img src={im} alt="logo" className="rounded-full" />
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Doctor Login</h2>
          {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
      <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
        <input
          type="email"
          placeholder="Email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      </div>
    
<div  className="mb-6">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
        <input
          type="password"
          placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

</div>

        <button className="w-full bg-blue-500 text-white p-2" type="submit">Login</button>
        <p>Dnt have an account? 
        <Link to="/doctorsignup">
        signup
        </Link>
        </p>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginDoctor;
