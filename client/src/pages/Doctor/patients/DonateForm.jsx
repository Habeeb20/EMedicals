import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../../components/Navbar";
import { useParams } from 'react-router-dom';  

const DonateForm = () => {
    const [patientId, setPatientId] = useState('');
    const [kidney, setKidney] = useState('');
    const [liver, setLiver] = useState('');
    const [heart, setHeart] = useState('');
    const [lungs, setLungs] = useState('');
 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')


    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("token not found")
        }
        if(token) {
            setPatientId(token)
        }
    }, [])

    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoading(true)

        const medicalHistoryData = {
            patientId,
            kidney,
            liver,
            heart,
            lungs


        };

        try{
            const token = localStorage.getItem("token");
             await axios.post(`${import.meta.env.VITE_API_P}/registerpatientdonate`, medicalHistoryData, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
             })
             setLoading(false)
             toast.success('registered medical history successfully')
        }catch{
            console.error(error);
            setLoading(false);
            setError(error)
            toast.error('Failed to register your medical history. Please try again.');

    }
}
  return (

    
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {error && <p className='texxt-red-500 text-center'></p>}
          <h2 className="text-2xl font-bold text-center mb-6">Wish to Donate any part after Death?</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

<div>
  <label htmlFor="kidney" className="block text-sm font-medium text-gray-700">
    Kidney
  </label>
  <select
    id="kidney"
    value={kidney}
    onChange={(e) => setKidney(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select options</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
   
  </select>
</div>

<div>
  <label htmlFor="lungs" className="block text-sm font-medium text-gray-700">
    Lungs
  </label>
  <select
    id="lungs"
    value={lungs}
    onChange={(e) => setLungs(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Option</option>
    <option value="yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

<div>
  <label htmlFor="hospitalized" className="block text-sm font-medium text-gray-700">
    liver
  </label>
  <select
    id="liver"
    value={liver}
    onChange={(e) => setLiver(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>



<div>
  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
    Heart
  </label>
  <select
    id="heart"
    value={heart}
    onChange={(e) => setHeart(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select options</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
 
  </select>
</div>






{/* Submit Button */}
<div className="text-center mt-6">
  <button
    type="submit"
    className={`w-full px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none`}
    disabled={loading}
  >
    {loading ? 'Registering...' : 'Register Your donations'}
  </button>
</div>
</form>

          <ToastContainer />
        </div>
      </div>
      
    </div>
  )
}

export default DonateForm
