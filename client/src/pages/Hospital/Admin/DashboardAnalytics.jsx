import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import { Pie } from "react-chartjs-2";
import { FaUser, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";
import { MdDashboard, MdPeople, MdBarChart, MdSettings } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardAnalytics = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [nurseCount, setNurseCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appointments, setAppointments] = useState([]);

  const [nurse, setNurse] = useState([]);
  const [patient, setPatient] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    specialization: "",
    state: "",
    LGA: "",
    location: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_HO}/dashboardhospital`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(data);
        setUserId(data._id);
        setUser(data);

        toast.success("you welcome");
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch user data");
        setError("failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_HO}/editdashhospital/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("profile successfully updated");
      setSuccessMessage("Profile updated successfully!");
      setShowPopup(false);
    } catch (error) {
      toast.error("failed to update profile");
      console.log(err);
      setError("Failed to update profile.");
    }
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload",
        formData,
        {
          params: {
            upload_preset: "essential",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url,
      }));
    } catch (err) {
      console.error("Error uploading file to Cloudinary", err);
    }
  };

  const handleModalOpen = (role) => {
    setFormType(role);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      //   phone:'',
      //   role,
      //   specialization: '',
      //   category: '',
      //   state: '',
      //   LGA: '',
      //   location: '',
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForUserDetails = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_HO}/addusers`,
        formData,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(`Successfully added !`);
      toast.success("successfully added ");
      setFormData({ name: "", email: "", password: "", role: "" });
    } catch (error) {
      toast.error(error?.message || "an error occured");
      setError(error?.message || "an error occured");
      console.log(error);
    }
  };

  const fetchUsersByRole = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_HO}/getusersByrole`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { role },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(`Failed to fetch ${role}s`);
      console.error(error);
      return [];
    }
  };

  const fetchAllUsers = async () => {
    const doctorsData = await fetchUsersByRole("doctor");
    const nursesData = await fetchUsersByRole("nurse");
    const patientsData = await fetchUsersByRole("patient");

    setDoctor(doctorsData);
    console.log(doctorsData);
    setNurse(nursesData);
    console.log(nursesData);
    setPatient(patientsData);
    setDoctorCount(doctorsData.length);
    setNurseCount(nursesData.length);
    setPatientCount(patientsData.length);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

   // Calculate total and percentages
   const totalUsers = doctorCount + nurseCount + patientCount;
   const doctorPercentage = ((doctorCount / totalUsers) * 100).toFixed(2);
   const nursePercentage = ((nurseCount / totalUsers) * 100).toFixed(2);
   const patientPercentage = ((patientCount / totalUsers) * 100).toFixed(2);
 


   const data = {
    labels: [
      `Doctors (${doctorPercentage}%)`,
      `Nurses (${nursePercentage}%)`,
      `Patients (${patientPercentage}%)`,
    ],
    datasets: [
      {
        label: "User Distribution",
        data: [doctorCount, nurseCount, patientCount],
        backgroundColor: ["#1E90FF", "#FF4500", "#FFD700"], // Blue, Red, Yellow
        borderColor: ["#1E90FF", "#FF4500", "#FFD700"],
        borderWidth: 1,
      },
    ],
  };




  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const count = dataset.data[index];
            return `${dataset.labels[index]}: ${count}`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
  
    localStorage.removeItem('token');


    navigate('/loginhospitaladmin');
  }



    useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_HO}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);


  return (
    <div className="flex h-screen">
      {/*side bar*/}
      <div
        className={`bg-blue-600 w-25 col-span-2 text-white w-64 space-y-6 py-7 px-4 absolute md:relative transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
        >
          ✕
        </button>
        <h1 className="text-2xl font-semibold mb-6">Menu</h1>
        <div className="space-y-3">
          <a
            href="/dashboardhospital"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdDashboard size={20} />
            <span>Dashboard for {user.name}</span>
          </a>
          <a
            href="/alldoctorsforadmin"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdPeople size={20} />
            <span>Doctors</span>
          </a>

          <a
            href="/allnursesforadmin"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdPeople size={20} />
            <span>Nurses</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdPeople size={20} />
            <span>Patients</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdBarChart size={20} />
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200"
          >
            <MdSettings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1  col-span-10 bg-white shadow-lg overflow-auto md:ml-0 ml-0">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Admin Dashboard
        </h1>
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-md">
       
          <button
            className="md:hidden text-blue-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </button>
          <div className="text-lg font-semibold text-gray-700">
            Welcome, {user.name}
          </div>
          <button  onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200">
            Logout
          </button>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handleModalOpen("doctor")}
            >
              Add Doctor
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => handleModalOpen("nurse")}
            >
              Add Nurse
            </button>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded"
              onClick={() => handleModalOpen("patient")}
            >
              Add Patient
            </button>

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Update Your Profile
                  </h2>
                  <form onSubmit={handleEditButton} className="space-y-6">
                    {Object.keys(userData).map(
                      (key) => key != "profilePicture"
                    )}

                    {/* New input fields */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name of your Hospital
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        phone number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        category(private,state or federal)
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={userData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        LGA
                      </label>
                      <input
                        type="text"
                        name="LGA"
                        value={userData.LGA}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture1")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture2")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture3")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture4")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        profile Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picturePicture")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    {}
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            <button
              className="bg-orange-500 text-white py-2 px-4 rounded"
              onClick={() => setShowPopup(true)}
            >
              Edit profile
            </button>
            {error && <div className="text-red-500 mt-5">{error}</div>}
            {successMessage && (
              <div className="text-green-500 mt-5">{successMessage}</div>
            )}
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">
                    Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
                  </h2>
                  <form onSubmit={handleSubmitForUserDetails}>
                    <div className="mb-4">
                      <label className="block mb-1">full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="patient">Patient</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleModalClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stats Card 1 */}
            <div className="bg-blue-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaUser className="text-4xl text-blue-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{patients.length}</h3> */}
                <p className="text-gray-500">Registered Patients</p>
                <p className="text-blue-500 font-bold">{patient.length}</p>
              </div>
            </div>
            {/* Stats Card 2 */}
            <div className="bg-green-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaCalendarAlt className="text-4xl text-green-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{appointments.length}</h3> */}
                <p className="text-gray-500">Appointments</p>
              </div>
            </div>
            {/* Stats Card 3 */}
            <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaHeartbeat className="text-4xl text-red-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{doctors.length}</h3> */}
                <p className="text-gray-500">Doctors</p>
                <p className="text-blue-500 font-bold">{doctor.length}</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
              <FaHeartbeat className="text-4xl text-red-600" />
              <div className="text-right">
                {/* <h3 className="text-2xl font-bold">{nurses.length}</h3> */}
                <p className="text-gray-500">Nurses</p>
                <p className="text-blue-500 font-bold">{nurse.length}</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-100  flex justify-center items-center">
          <div className="">
      <h1 className="text-3xl font-bold mb-4">Appointments</h1>
     <table className="min-w-full table-auto border-collapse">
     <thead>
          <tr>
             <th className="border px-4 py-2">Patient Name</th>
             <th className="border px-4 py-2">Appointment Date</th>
             <th className="border px-4 py-2">Appointment Time</th>
             <th className="border px-4 py-2">Sickness</th>
             <th className="border px-4 py-2">Location</th>
             <th className="border px-4 py-2">Action</th>
           </tr>
         </thead>
         <tbody>
           {appointments.map((appointment, index) => (
             <tr key={index}>
               <td className="border px-4 py-2">{appointment.patientId.name}</td>
               <td className="border px-4 py-2">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
               <td className="border px-4 py-2">{appointment.appointmentTime}</td>
               <td className="border px-4 py-2">{appointment.sickness}</td>
               <td className="border px-4 py-2">{appointment.patientDetails.location}</td>
               <td className="border px-4 py-2">
                 <button
                   className="bg-green-500 text-white p-2 rounded-md"
                   onClick={() => alert(`Appointment details for ${appointment.patientId.name}`)}
                 >
                   View
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
</table>
</div>
    </div>


      
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
