import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiMenu, FiX } from "react-icons/fi";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { FaFolder, FaFileAlt, FaCog, FaHeart, FaPlus, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../../components/Navbar";
ChartJS.register(ArcElement, Tooltip, Legend);


// const Sidebar = ({ isOpen, toggleSidebar, setActiveSection  }) => {
//     const [myprofile, setMyProfile] = useState([])
//     const [error, setError] = useState('')
//     useEffect(() => {
//         const fetchMyProfile = async() => {
//             try {
//                 const token = localStorage.getItem("token")
//                 const response = await axios.get(`${import.meta.env.VITE_API_SA}/superadmindashboard`, {
//                     headers: {Authorization: `Bearer ${token}`}
//                 })
//                 setMyProfile(response.data.user)
          
//                 toast.success("successfully fetched")
//             } catch (error) {
//                 console.log(error)
//                 setError(error?.response?.data?.response)
//                 toast.error("an error occurred")
//             }
          
            
//         }
//         fetchMyProfile()
//     }, [])
//   return (
//     <div className={`bg-gray-800 text-white fixed lg:relative w-64 p-5 h-full flex flex-col min-h-screen transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
//       <button className="lg:hidden text-white" onClick={toggleSidebar}><FaTimes /></button>
//       <div className="flex items-center space-x-2 mt-4">
//       <h2 className="text-xl font-bold">Emedical</h2>
//         <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
//         <span className="font-bold">{myprofile.email}</span>
//       </div>
//       <nav>
//         {["Dashboard", "Death Rate", "Death Record", "Your Death Record"].map(
//           (item, index) => (
//             <button
//               key={index}
//               className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800"
//               onClick={() => setActiveSection(item)}
//             >
//               {item}
//             </button>
//           )
//         )}
//       </nav>
//     </div>
//   );
// };


const Sidebar = ({ isOpen, toggleSidebar, setActiveSection }) => {
    const [myprofile, setMyProfile] = useState([])
        const [error, setError] = useState('')
        useEffect(() => {
            const fetchMyProfile = async() => {
                try {
                    const token = localStorage.getItem("token")
                    const response = await axios.get(`${import.meta.env.VITE_API_SA}/superadmindashboard`, {
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    setMyProfile(response.data.user)
              
                    toast.success("successfully fetched")
                } catch (error) {
                    console.log(error)
                    setError(error?.response?.data?.response)
                    toast.error("an error occurred")
                }
              
                
            }
            fetchMyProfile()
        }, [])
    return (
      <div
        className={`fixed inset-y-0 left-0 bg-gray-500 text-white w-64 p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:static lg:w-52`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Emedical</h2>
          
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>
        <nav>
          {[ "Dashboard", "Appointments", "Hospitals", "Doctors", "pharmacy", "labs", ].map(
            (item, index) => (
              <button
                key={index}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => setActiveSection(item)}
              >
                {item}
              </button>
            )
          )}
        </nav>
      </div>
    );
  };
  
const Content = () => {
    const [users, setUsers] = useState([])
  const [error, setError] = useState('')
    const [cemetary, setCementary] = useState([])
    const [underTaker, setUnderTaker] = useState([])
    const [mortuary, setMortuary] = useState([])
    const [doctor, setDoctor] = useState([])
    const [pharmacy, setPharmacy] = useState([])
    const [hospital, setHospital] = useState([])
    const [wellness, setWellness] = useState([])
    const [lab, setLab] = useState([])
    const [chartData, setChartData] = useState(null);
    //get users
    useEffect(() => {
        const fetchMyProfile = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API}/getallusers`, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setUsers(response.data)
          
            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.response)
               
            }
          
            
        }
        fetchMyProfile()
    }, [])

    //get cementery
    useEffect(() => {
        const fetchMyProfile = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API_SA}/allcementery`, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setCementary(response.data)
          
            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.response)
              
            }
          
            
        }
        fetchMyProfile()
    }, [])

//get undertaker
    useEffect(() => {
        const fetchMyProfile = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API_SA}/allundertaker`, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setUnderTaker(response.data)
          

            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.response)
            
            }
          
            
        }
        fetchMyProfile()
    }, [])


// get mortuary
useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allmortuary`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setMortuary(response.data)
      
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)
          
        }
      
        
    }
    fetchMyProfile()
}, [])


//get Doctor
 useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/alldoctor`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setDoctor(response.data)

        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)

        }
      
        
    }
    fetchMyProfile()
 }, [])



 //get pharmacy
 useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allpharmacy`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setPharmacy(response.data)
      
         
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)
           
        }
      
        
    }
    fetchMyProfile()
 }, [])

 //get hospital 

  useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allhospital`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setHospital(response.data)
      
         
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)
           
        }
      
        
    }
    fetchMyProfile()
 }, [])

 //get Labs

 useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/labs`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setLab(response.data)
      
         
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)
           
        }
      
        
    }
    fetchMyProfile()
 }, [])


  //get allwellness

  useEffect(() => {
    const fetchMyProfile = async() => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allwellness`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setWellness(response.data)
      
         
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.response)
           
        }
      
        
    }
    fetchMyProfile()
 }, [])



 useEffect(() => {
    // Define URLs and their respective labels
    const urls = [
      { url: `${import.meta.env.VITE_API}/getallusers`, label: "Users" },
      { url: `${import.meta.env.VITE_API_SA}/allcementery`, label: "Cemeteries" },
      { url: `${import.meta.env.VITE_API_SA}/allundertaker`, label: "Undertakers" },
      { url: `${import.meta.env.VITE_API_SA}/allmortuary`, label: "Mortuaries" },
      { url: `${import.meta.env.VITE_API_SA}/alldoctor`, label: "Doctors" },
      { url: `${import.meta.env.VITE_API_SA}/allpharmacy`, label: "Pharmacies" },
      { url: `${import.meta.env.VITE_API_SA}/allhospital`, label: "Hospitals" },
      { url: `${import.meta.env.VITE_API_SA}/labs`, label: "Labs" },
      { url: `${import.meta.env.VITE_API_SA}/allwellness`, label: "Wellness Centers" },
    ];
  
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(({ url }) => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
  
        let categories = [];
        let values = [];
  
        // Process API responses correctly
        data.forEach((responseData, index) => {
          const label = urls[index].label; // Get label from the defined list
          const count = responseData.length || 0; // Get count of items in response
  
          categories.push(label);
          values.push(count);
        });
  
        // Set the chart data
        setChartData({
          labels: categories,
          datasets: [
            {
              label: "Counts by Category",
              data: values,
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#FF5733", "#4CAF50",
                "#FFC107", "#FF9800", "#9C27B0", "#00BCD4"
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  


  return (
    <>
   
   <div className="flex-1 p-6 bg-gray-100 min-h-screen">
     
        <div>
          <h1 className="text-2xl font-bold">Manage your Users</h1>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-200 p-5 rounded-lg shadow-lg">Hospital Accounts <h3>{hospital.length}</h3></div>
            <div className="bg-purple-200 p-5 rounded-lg shadow-lg">Pharmacy Accounts <h3>{pharmacy.length}</h3></div>
            <div className="bg-yellow-200 p-5 rounded-lg shadow-lg">Doctor Accounts <h3>{doctor.length}</h3></div>
            <div className="bg-blue-200 p-5 rounded-lg shadow-lg">Mortuary Accounts <h3>{mortuary.length}</h3></div>
            <div className="bg-gray-200 p-5 rounded-lg shadow-lg">Cemetary Accounts <h3>{cemetary.length}</h3></div>
            <div className="bg-red-200 p-5 rounded-lg shadow-lg">Undertaker Accounts <h3>{underTaker.length}</h3></div>
            <div className="bg-orange-200 p-5 rounded-lg shadow-lg">Lab Accounts <h3>{lab.length}</h3></div>
            <div className="bg-violet-200 p-5 rounded-lg shadow-lg">Wellness center Accounts <h3>{wellness.length}</h3></div>
            <div className="bg-pink-200 p-5 rounded-lg shadow-lg">User Accounts <h3>{users.length}</h3></div>
          </div>
          <div className="mt-2 bg-white p-5 rounded-lg shadow-lg">
          
      {chartData ? (
        <div className="w-64 h-64 mx-auto">
        <Pie data={chartData} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
          </div>
        </div>

    </div>
    </>
 
  );
};

const Hospital = () => {
    const [allPatients, setAllPatient] = useState([])
    const [patientshospitals, setPatientHospitals] = useState([])
    const [doctorsHospitals,setDoctorsHospitals] = useState([])
    const [nursesHospitals,setNurseHospitals] = useState([])
    const [error, setError] = useState("")

    //fetch all patient
    useEffect(() => {
        const fetchAllData = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API_SA}/allpatient`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAllPatient(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message)
            }
        }
        fetchAllData()
    }, [])


     //fetch all doctors from hospitals
     useEffect(() => {
        const fetchAllData = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API_SA}/alldoctorsforhospitals`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setDoctorsHospitals(response.data)
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message)
            }
        }
        fetchAllData()
    }, [])

    
     //fetch all nurses from hospitals
     useEffect(() => {
        const fetchAllData = async() => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_API_SA}/allnursesforhospitals`, {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setNurseHospitals(response.data)
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message)
            }
        }
        fetchAllData()
    }, [])

         //fetch all patients from hospitals
         useEffect(() => {
            const fetchAllData = async() => {
                try {
                    const token = localStorage.getItem("token")
                    const response = await axios.get(`${import.meta.env.VITE_API_SA}/allpatientsforhospitals`, {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    setPatientHospitals(response.data)
                } catch (error) {
                    console.log(error)
                    setError(error.response?.data?.message)
                }
            }
            fetchAllData()
        }, [])
return (
<div className="flex-1 p-6 bg-gray-100 min-h-screen">
  <div>
    <h1 className="text-2xl font-bold mb-4">Manage your Users</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-green-200 p-5 rounded-lg shadow-lg">
        Patients <h3 className="text-xl font-semibold">{allPatients.length}</h3>
      </div>
      <div className="bg-purple-200 p-5 rounded-lg shadow-lg">
        Doctors from hospitals <h3 className="text-xl font-semibold">{doctorsHospitals.length}</h3>
      </div>
      <div className="bg-yellow-200 p-5 rounded-lg shadow-lg">
        Nurses from hospitals <h3 className="text-xl font-semibold">{nursesHospitals.length}</h3>
      </div>
      <div className="bg-blue-200 p-5 rounded-lg shadow-lg">
        Patients from hospitals <h3 className="text-xl font-semibold">{patientshospitals.length}</h3>
      </div>
    </div>
     


    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
    <h3 className="text-center text-2xl">Patients from other hospitals</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-sm">Full Name</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Hospital</th>
            <th className="p-3 text-sm">Date Added</th>
            <th className="p-3 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientshospitals && patientshospitals.length > 0 ? (
            patientshospitals.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm">{name.name}</td>
                <td className="p-3 text-sm">{name.email}</td>
                <td className="p-3 text-sm">{name.adminId?.name}</td>
                <td className="p-3 text-sm">{new Date(name.createdAt).toLocaleString()}</td>
                <td className="p-3 text-sm text-red-600">
                  <button
                    onClick={() => handleDelete(name._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

   

 
    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
    <h3 className="text-center text-2xl">Doctor from other hospitals</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-sm">Full Name</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Hospital</th>
            <th className="p-3 text-sm">Date Added</th>
            <th className="p-3 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          { doctorsHospitals && doctorsHospitals.length > 0 ? (
             doctorsHospitals.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm">{name.name}</td>
                <td className="p-3 text-sm">{name.email}</td>
                <td className="p-3 text-sm">{name.adminId?.name}</td>
                <td className="p-3 text-sm">{new Date(name.createdAt).toLocaleString()}</td>
                <td className="p-3 text-sm text-red-600">
                  <button
                    onClick={() => handleDelete(name._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
    <h3 className="text-center text-2xl">Nurses from other hospitals</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-sm">Full Name</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Hospital</th>
            <th className="p-3 text-sm">Date Added</th>
            <th className="p-3 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nursesHospitals && nursesHospitals.length > 0 ? (
            nursesHospitals.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm">{name.name}</td>
                <td className="p-3 text-sm">{name.email}</td>
                <td className="p-3 text-sm">{name.adminId?.name}</td>
                <td className="p-3 text-sm">{new Date(name.createdAt).toLocaleString()}</td>
                <td className="p-3 text-sm text-red-600">
                  <button
                    onClick={() => handleDelete(name._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  </div>
</div>

)
  
}

const Doctor = () => {

}

const Pharmacy = () => {

}

const Appointment = () => {
    const[appointhospital, setAppointHospital] = useState([])
    const[appointdoctor, setAppointdoctor] = useState([])
    const [error, setError] = useState([])
    useEffect(() => {
        const fetchMyData = async() => {
           try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allappointmentfordoctor`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointdoctor(response.data)
           } catch (error) {
            console.log(error)
            setError(error.response?.data?.message)
           }
        }
        fetchMyData()
    }, [])

    useEffect(() => {
        const fetchMyData = async() => {
           try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_SA}/allappointmentforhospitals`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointHospital(response.data)
           } catch (error) {
            console.log(error)
            setError(error.response?.data?.message)
           }
        }
        fetchMyData()
    }, [])


    return (
        <>
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
  <div>
    <h1 className="text-2xl font-bold mb-4">Manage your Users</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-green-200 p-5 rounded-lg shadow-lg">
        Appointment for Doctors <h3 className="text-xl font-semibold">{appointdoctor.length}</h3>
      </div>
      <div className="bg-purple-200 p-5 rounded-lg shadow-lg">
        Appointment for hospitals <h3 className="text-xl font-semibold">{appointhospital.length}</h3>
      </div>
     
    </div>
     


    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
    <h3 className="text-center text-2xl">Appointment for  hospitals</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-sm">Full Name</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Hospital</th>
            <th className="p-3 text-sm">reasonForAppointment</th>
            <th className="p-3 text-sm">Sickness</th>
            <th className="p-3 text-sm">Date</th>
          </tr>
        </thead>
        <tbody>
          {appointhospital && appointhospital .length > 0 ? (
            appointhospital.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm">{name.patientId?.name}</td>
                <td className="p-3 text-sm">{name.patientId?.email}</td>
                <td className="p-3 text-sm">{name.adminId?.name}</td>
                <td className="p-3 text-sm">{name.reasonForAppointment}</td>
                <td className="p-3 text-sm">{name.sickness}</td>
                <td className="p-3 text-sm">{new Date(name.createdAt).toLocaleString()}</td>
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

   

 
    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
    <h3 className="text-center text-2xl">Appointment for Doctors</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-sm">Full Name</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Doctor name</th>
            <th className="p-3 text-sm">sickness</th>
            <th className="p-3 text-sm">appointmentDate</th>
          </tr>
        </thead>
        <tbody>
          { appointdoctor && appointdoctor.length > 0 ? (
             appointdoctor.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm">{name.patientId?.fullname}</td>
                <td className="p-3 text-sm">{name.patientId?.email}</td>
                <td className="p-3 text-sm">{name.doctorId?.fullname || name.doctorId?.email}</td>
                <td className="p-3 text-sm">{name.sickness}</td>
                <td className="p-3 text-sm">{new Date(name.appointmentDate).toLocaleString()}</td>
                {/* <td className="p-3 text-sm text-red-600">
                  <button
                    onClick={() => handleDelete(name._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    
  </div>
</div>

        </>
    )
}
export default function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
//   const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isSidebarOpen);
  return (
    <>
    <Navbar />
    <div className="flex bg-white min-h-screen text-black">
    <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setActiveSection={setActiveSection}
        />
 <div className="flex-1 p-6 lg:ml-2">
          <button className="lg:hidden mb-4" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
      <h1 className="text-2xl font-bold mb-6">{activeSection}</h1>
          {activeSection === "Your Death Record" && <Doctor />}
          {activeSection === "Dashboard" && <Content />}
          {activeSection === "Appointments" && <Appointment />}
          {activeSection === "Hospitals" && <Hospital />}
          {activeSection === "Death Record" && <Pharmacy />}
    </div>
    </div>
    </>
 
  );
}
