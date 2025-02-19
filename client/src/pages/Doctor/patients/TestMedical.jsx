import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Navbar';
import { useParams } from 'react-router-dom';
const TestMedical = () => {
    const {patientId} =useParams()
    const [doctorId, setDoctorId] = useState('')
    const [sickness, setSickness] = useState('')
    const [started, setStarted] = useState('')
    const [drugsTaken,setDrugTaken] = useState('')
    const [prescribedDrugs, setPrescribedDrugs] = useState('')
    const [cause, setCause] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
          throw new Error("token not found")
        }
        if (token) {
          setDoctorId(token);  
        }
      }, []);
    

      const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        const medicalTest = {
            doctorId,
            patientId,
            sickness,
            started,
            drugsTaken,
            prescribedDrugs,
            cause,
            date,
        };
        try {
            const token = localStorage.getItem("token");
            console.log("patient Id being sent:", patientId)

            await axios.post(`${import.meta.env.VITE_API_P}/createmedicaltest/${patientId}`, medicalTest, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
              
            )

            setLoading(true)
            toast.success('medical test is being sent successfully')
        } catch (error) {
            console.error(error);
      setLoading(false);
      toast.error('Failed to send medical test to patient. Please try again.');
        }
      }

  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">send a medical test result to your patient</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
          
            <div>
              <label htmlFor="sickness" className="block text-sm font-medium text-gray-700">
                Sickness
              </label>
              <input
                type="text"
                id="sickness"
                value={sickness}
                onChange={(e) => setSickness(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="started" className="block text-sm font-medium text-gray-700">
                Started Date
              </label>
              <input
                type="date"
                id="started"
                value={started}
                onChange={(e) => setStarted(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Drugs Taken Input */}
            <div>
              <label htmlFor="drugsTaken" className="block text-sm font-medium text-gray-700">
                Drugs Taken
              </label>
              <input
                type="text"
                id="drugsTaken"
                value={drugsTaken}
                onChange={(e) => setDrugTaken(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="drugsTaken" className="block text-sm font-medium text-gray-700">
                prescribedDrugs
              </label>
              <input
                type="text"
                id="prescribedDrugs"
                value={prescribedDrugs}
                onChange={(e) => setPrescribedDrugs(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="drugsTaken" className="block text-sm font-medium text-gray-700">
                cause of illness or sickness
              </label>
              <input
                type="text"
                id="cause"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Preferred Date Input */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
                Preferred Appointment Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none`}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
   
      
    </div>
  )
}

export default TestMedical
