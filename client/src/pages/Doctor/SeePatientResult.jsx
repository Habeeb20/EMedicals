import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const SeePatientResult = () => {

  const [medicalresult, setMedicalResult]  = useState([])
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState('');
 
 
  const navigate = useNavigate();

  useEffect(() => {
  const fetchMedicalResult = async () => {
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      if(!token){
        throw new Error("token not found")
      }
 
      setLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_API_P}/getmedicaltestfordoctor`, {
        headers: {
          Authorization:`Bearer ${token}`
        },
        withCredentials: true
      });
      console.log(response.data);
      setMedicalResult(response.data);
      toast.success("successfully fetched")
    } catch (error) {
      console.error(error)
      setError(error)
    }
    finally{
      setLoading(false)
    }
  }
   fetchMedicalResult()
  }, [navigate]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        console.log(token)
        if(!token){
          throw new Error("token not found")
        }
   
        setLoading(true);
  
        const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
          headers: {
            Authorization:`Bearer ${token}`
          },
          withCredentials: true
        });
        console.log(response.data);
        setDoctor(response.data.doctor);
        toast.success("successfully fetched")
      } catch (error) {
        console.error(error)
        setError(error)
      }
      finally{
        setLoading(false)
      }
    }
     fetchProfile()
    }, [navigate]);






    useEffect(() => {
        const fetchPatients = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("token not found");

                   // Get unique patient IDs, filtering out null or undefined values
        const patientIds = [...new Set(medicalresult.map(med => med.patientId).filter(id => id !== null && id !== undefined))];

        // Log patient IDs for debugging
        console.log("Fetching patient details for IDs:", patientIds);

            const patientRequests = patientIds.map(id => 
              axios.get(`${import.meta.env.VITE_API_P}/getpatient/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              })
            );
    
            const responses = await Promise.all(patientRequests);
            const patientsData = responses.reduce((acc, response) => {
              acc[response.data._id] = response.data; 
              return acc;
            }, {});
    
            setPatients(patientsData);
          } catch (error) {
            console.error(error);
            toast.error("Failed to fetch patient details");
          }
        };
    
        if (medicalresult.length > 0) {
          fetchPatients();
        }
      }, [medicalresult]);
    















useEffect(() => {
    const fetchAllPatient = async () => {
      try {
        const token = localStorage.getItem("token")
        if(!token){
          throw new Error("token not found")
        }
        
        const response = await axios.get(`${import.meta.env.VITE_API_P}/getallpatient`)
        if(!response){
          console.log("details not found")
          toast.error("patient not not found")
        }
        console.log(response)
        setPatients(response.data)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
    fetchAllPatient ()
  }, [])


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (

   <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside  className="hidden md:block w-1/4 bg-white shadow-lg p-6">
      
        <div className=" mb-4 flex justify-between items-center w-16 h-16 rounded-full object-cover">
          <img src={doctor.profilePicture} alt="Logo" className="h-12 w-auto" />
         
        </div>
        <nav className="flex flex-col space-y-4">
          <a href="/doctordashboard" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Overview</span>
          </a>
          
          <a href="/doctorappointment" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Appointments</span>
          </a>
          <a href="/alllabs" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Labs</span>
          </a>
          <a href="/seepatientresult" className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>see your patients' results</span>
          </a>
          <a href="/doctorprofile" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Patients</span>
          </a>
          <a href="/chatlogin" className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Chats</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2">10</span>
          </a>
          {doctor && (
            <>
            <img
                  src={doctor.profilePicture}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-7"
                />
                <p className="font-semibold">Your name: {doctor.fullname}</p>
                <p className="font-semibold">Your Email: {doctor.email}</p>
                <p className="font-semibold">
                  Your Phone number: {doctor.phoneNumber}
                </p>

            </>
         
          )}
      
          <a href="#" className="text-red-500 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg">
            <span>Logout</span>
          </a>
        </nav>
        <div className="mt-auto hidden lg:block">
          <p className="text-xs text-gray-500">Address:</p>
          <p className="text-sm text-gray-700">{doctor.state}</p>
          <p className="text-sm text-gray-700">{doctor.officeAddress}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-6">
          <div className="text-2xl font-semibold">Patients</div>
          <div className="flex space-x-2 mt-4 lg:mt-0 items-center w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search pathology results"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-auto"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full lg:w-auto">
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4 lg:mb-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-blue-700">202</h3>
            <p className="text-sm text-gray-500">Total Patient</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-green-500">202</h3>
            <p className="text-sm text-gray-500">In Patient</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
            <h3 className="text-xl text-red-500">202</h3>
            <p className="text-sm text-gray-500">Out Patient</p>
          </div>
        </div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {medicalresult.length > 0 ? (
            medicalresult.map((medical) => {
              const patient = patients[medical.patientId]; // Get patient details by ID
              return (
                <div key={medical._id} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
  <div className="flex items-center space-x-4">
    <img
      src={patient?.profilePicture || "/path/to/defaultImage.jpg"} // Use a default image if profile picture is not available
      alt="profile"
      className="w-16 h-16 rounded-full border-2 border-green-500"
    />
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{patient?.fname}</h3>
      <p className="text-sm text-gray-500">{patient?.email}</p>
    </div>
  </div>

  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Name:</span>john paul</p>

  </div>

  <div className="border-t mt-4 pt-4 space-y-2">
    <p className="text-lg font-semibold text-gray-800">Medical Information</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Sickness:</span> {medical.sickness}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Cause:</span> {medical.cause}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Date Started:</span> {new Date(medical.started).toLocaleDateString()}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Allergies:</span> {medical.allergics}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Drugs Taken:</span> {medical.drugsTaken}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Prescribed Drugs:</span> {medical.prescribedDrugs}</p>
    <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Consultation Date:</span> {new Date(medical.date).toLocaleDateString()}</p>
  </div>
</div>

              );
            })
          ) : (
            <p>No patient records found.</p>
          )}
          
      
        </div>

        {/* Pagination */}
        <div className="mt-4 lg:mt-6 flex justify-center lg:justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg">1</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">2</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">3</button>
        </div>
      </div>
      <ToastContainer />
    </div>
   </>
  );
};

export default SeePatientResult;
