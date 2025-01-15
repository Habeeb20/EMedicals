import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FiMenu } from 'react-icons/fi'
const DashboardHospital = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [userData, setUserData] = useState({
      name:'',
      password:'',
      email:'',
      role:'',
      profilePicture:'', 
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] =useState('')
  const [userId, setUserId] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState('')


  useEffect(() => {
    const fetchData = async() => {
        try {
            const token = localStorage.getItem('token');
            const {data} = await axios.get(`${import.meta.env.VITE_API_HO}/dashboardhospital`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            setUserData(data);
            setUserId(data._id);
            setUser(data);

            toast.success("you welcome")
        } catch (error) {
            console.log(error)
            toast.error("failed to fetch user data")
            setError("failed to fetch user data")
        } finally {
            setLoading(false)
        }
    }
    fetchData();
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData((prevData) => ({ ...prevData, }))
  }
  return (
    <div>
      
    </div>
  )
}

export default DashboardHospital
