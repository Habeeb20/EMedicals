import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
const DoctorDetails = () => {
    const {id } = useParams()
    const [doctor,setDoctor] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProfile = async() => {
            if(!id){
                throw new Error("id not found")
                setLoading(true)
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_D}/doctordetails/${id}`)
                setDoctor(response.data)
                console.log(response)
            } catch (error) {
                console.log(error)
                setError(error)

            }finally{
                setLoading(false)
            }

        }
        fetchProfile()
      
    },[id])
    if(!doctor){
        return(
          <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="text-lg font-semibold mt-4">Loading...</p>
        </div>
        )
      }


  return (
    <div>
    <Navbar />
    {error &&  <p className='text-red-500 text-center'>{error}</p>}
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-red-600 font-semibold text-xl mb-6">Doctor</h1>
      
      {/* Filters and Search */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="border rounded-md px-2 py-1">
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span>Status</span>
            <select className="border rounded-md px-2 py-1">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          placeholder={doctor.fullname}
          className="border rounded-md px-4 py-2 flex-grow mx-4 outline-none"
        />
        <button className="bg-red-500 text-white rounded-lg px-6 py-2">All</button>
      </div>

      {/* Patient Profile and Growth Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        
        {/* Patient Info */}
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
              <img
                src={doctor.profilePicture}
                alt="Patient Avatar"
                className="w-24 h-24 rounded-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{doctor.fullname}</h2>
            <p className="text-gray-500 mt-1">{doctor.fullname} <span className="mx-1">|</span> <span role="img" aria-label="Location">📍</span>{doctor.LGA}, {doctor.state}</p>
            <div className="mt-4 flex space-x-8 text-gray-600">
              <div>
                <p className="text-xs font-semibold text-gray-500">Gender</p>
                <p className="text-lg font-semibold">{doctor.gender}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">{doctor.email}</p>
                <p className="text-lg font-semibold">{doctor.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">number</p>
                <p className="text-lg font-semibold">{doctor.uniqueNumber}</p>
              </div>
            </div>
            <div>
                <p className="text-xs mt-10 font-semibold text-gray-500">office Address</p>
                <p className="text-lg font-semibold">{doctor.officeAddress}</p>
              </div>
              <div>
                <p className="text-xs mt-10 font-semibold text-gray-500">Current work place:</p>
                <p className="text-lg font-semibold">{doctor.currentWorkplace}</p>
              </div>
          </div>
        </div>

        {/* Company Growth */}
        <div className="flex flex-col items-center justify-center flex-grow bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <h3 className="text-gray-600 font-semibold mb-4">field of specialization: {doctor.specialization}</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Circular Progress Bar */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-red-500 to-blue-500">
              <div className="absolute w-full h-full rounded-full bg-white top-2 left-2" />
            </div>
            {/* Inner Circle with Growth Percentage */}
            <div className="absolute w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-2xl font-bold text-blue-700">80%</span>
              <span className="text-xs text-gray-500">Growth</span>
            </div>
          </div>
          <select className="border mt-4 rounded-md px-2 py-1 text-center">
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
          </select>
          <p className="text-gray-800 text-sm mt-2">Date of Birth:{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default DoctorDetails
