import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../../components/Navbar";
import { useParams } from 'react-router-dom';  

const MedicalHitoryForm = () => {
    const [patientId, setPatientId] = useState('');
    const [chronicConditions, setChronicConditions] = useState('');
    const [surgeries, setSurgeries] = useState('');
    const [hospitalized, setHospitalized] = useState('');
    const [currentMedications, setCurrentMedications] = useState('');
    const [ bloodGroup, setBloodGroup] = useState('')
    const [genoType,setGenoType] = useState('')
    const [medicalConditions, setMedicalConditions] = useState('');
    const [smokingOrAlcohol, setSmokingOrAlcohol] = useState('')
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
            chronicConditions,
            surgeries,
            hospitalized,
            currentMedications,
            bloodGroup,
            genoType,
            medicalConditions,
            smokingOrAlcohol,


        };

        try{
            const token = localStorage.getItem("token");
             await axios.post(`${import.meta.env.VITE_API_P}/registermedicalhistory`, medicalHistoryData, {
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
          <h2 className="text-2xl font-bold text-center mb-6">Register your medical History</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

<div>
  <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700">
    Chronic Conditions
  </label>
  <select
    id="chronicConditions"
    value={chronicConditions}
    onChange={(e) => setChronicConditions(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Condition</option>
    <option value="Diabetes">Diabetes</option>
    <option value="Hypertension">Hypertension</option>
    <option value="Asthma">Asthma</option>
    <option value="Heart Disease">Heart Disease</option>
    <option value="Other">Other</option>
    <option value="None">None</option>
  </select>
</div>

<div>
  <label htmlFor="surgeries" className="block text-sm font-medium text-gray-700">
    Surgeries
  </label>
  <select
    id="surgeries"
    value={surgeries}
    onChange={(e) => setSurgeries(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Option</option>
    <option value="Never had surgery">Never had surgery</option>
    <option value="Had surgery">I have had surgery</option>
  </select>
</div>

<div>
  <label htmlFor="hospitalized" className="block text-sm font-medium text-gray-700">
    Hospitalized
  </label>
  <select
    id="hospitalized"
    value={hospitalized}
    onChange={(e) => setHospitalized(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

<div>
  <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700">
    Current Medications
  </label>
  <input
    type="text"
    id="currentMedications"
    value={currentMedications}
    onChange={(e) => setCurrentMedications(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  />
</div>

<div>
  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
    Blood Group
  </label>
  <select
    id="bloodGroup"
    value={bloodGroup}
    onChange={(e) => setBloodGroup(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Blood Group</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="AB">AB</option>
    <option value="O">O</option>
  </select>
</div>

<div>
  <label htmlFor="genoType" className="block text-sm font-medium text-gray-700">
    Genotype
  </label>
  <select
    id="genoType"
    value={genoType}
    onChange={(e) => setGenoType(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Genotype</option>
    <option value="AA">AA</option>
    <option value="AS">AS</option>
    <option value="SS">SS</option>
    <option value="AC">AC</option>
  </select>
</div>

<div>
  <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">
    Medical Condition
  </label>
  <select
    id="medicalConditions"
    value={medicalConditions}
    onChange={(e) => setMedicalConditions(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Condition</option>
    <option value="Healthy">Healthy</option>
    <option value="Fairly Healthy">Fairly Healthy</option>
    <option value="Not Healthy">Not Healthy</option>
  </select>
</div>

<div>
  <label htmlFor="smokingOrAlcohol" className="block text-sm font-medium text-gray-700">
    Smoking or Alcohol
  </label>
  <select
    id="smokingOrAlcohol"
    value={smokingOrAlcohol}
    onChange={(e) => setSmokingOrAlcohol(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  >
    <option value="">Select Option</option>
    <option value="Ever drink or smoke">Ever drink or smoke</option>
    <option value="Never drink or smoke">Never drink or smoke</option>
    <option value="Currently drinking but not smoking">Currently drinking but not smoking</option>
    <option value="Currently smoking but not drinking">Currently smoking but not drinking</option>
    <option value="Ever drink but not smoke">Ever drink but not smoke</option>
    <option value="Ever smoke but not drink">Ever smoke but not drink</option>
  </select>
</div>

{/* Submit Button */}
<div className="text-center mt-6">
  <button
    type="submit"
    className={`w-full px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none`}
    disabled={loading}
  >
    {loading ? 'Registering...' : 'Register Medical History'}
  </button>
</div>
</form>

          <ToastContainer />
        </div>
      </div>
      
    </div>
  )
}

export default MedicalHitoryForm
