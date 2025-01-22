import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { FaUser, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";
import { MdHome, MdEvent, MdReport, MdPerson } from "react-icons/md";
import m from "../../../assets/EMedicals/doctor2.jpeg";
import { MdDashboard, MdPeople, MdBarChart, MdSettings } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const PatientDashboardHospital = ({ appointmentId, onDeleteSuccess }) => {
  const { id } = useParams();
  const [medicalResult, SetMedicalResult] = useState([])
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [userId, setUserId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [nurse, setNurse] = useState([]);
  const [patient, setPatient] = useState([]);
  const [report, setReport] = useState({})
  const [chartData, setChartData] = useState(null);
  const [myAppointment, setMyAppointment] = useState([]);
  const [myAppointmentId, setMyAppointmentId] = useState([])
  
  const [appointmentData, setAppointmentData] = useState({
    adminId: "",
    appointmentDate: "",
    appointmentTime: "",
    reasonForAppointment: "",
    sickness: "",
    responseType:"",
    patientDetails: {
      weight: "",
      specializationNeeded: "",
      location: "",
      state: "",
      LGA: "",
    },
   
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    specialization: "",
    state: "",
    doctorTime: "",
    LGA: "",
    location: "",
    profilePicture: "",
  });
//fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_HO}/dashboardhospital`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(data);
        setDoctorId(data._id);
        setUserId(data._id);
        toast.success("you are successfully logged in");
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

//edit function
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
    } catch (err) {
      toast.error("failed to update profile");
      console.log(err);
      setError("Failed to update profile.");
    }
  };
//handling the picture
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
      phone: "",
      role,
      specialization: "",
      state: "",
      LGA: "",
      location: "",
      doctorTime: "",
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
//fetching use role
  const fetchUsersByRole = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_HO}/getUsersGroup`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { role },
        }
      );
      return response.data;
    } catch (error) {
      // toast.error(`Failed to fetch ${role}s`);
      // console.error(error);
      return [];
    }
  };
//fetch users
  const fetchAllUsers = async () => {
    const doctorsData = await fetchUsersByRole("doctor");
    const nursesData = await fetchUsersByRole("nurse");
    const patientsData = await fetchUsersByRole("patient");

    setDoctor(doctorsData);
    console.log(doctorsData);
    setNurse(nursesData);
    console.log(nursesData);
    setPatient(patientsData);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/logindoctoradmin");
  };

  const handleShowpopupClose = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  const navigate = useNavigate();
//handle input for appointment
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("patientDetails")) {
      const key = name.split(".")[1];
      setAppointmentData((prev) => ({
        ...prev,
        patientDetails: { ...prev.patientDetails, [key]: value },
      }));
    } else {
      setAppointmentData((prev) => ({ ...prev, [name]: value }));
    }
  };
//book my appointment
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...appointmentData,
        adminId: userData.adminId?._id,
      };
      console.log("the admin id!!!", adminId);

      const response = await axios.post(
        `${import.meta.env.VITE_API_HO}/book`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment booked successfully");

      navigate("/patientdashboardhospital");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

//sending a report 

const handleSendReport = async(e) => {
  e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...report,
        adminId: userData.adminId?._id
      }

      const response = await axios.post( `${import.meta.env.VITE_API_HO}/sendreport`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
      toast.success("report sent successfully");

      navigate("/patientdashboardhospital");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  
}
  //delete appointment and getMyAppointment

  useEffect(() => {
    const fetchMyAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HO}/get-appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("you can view your appointment");
        const appointments = response.data.appointment;
        if (appointments && appointments.length > 0) {
         setMyAppointment(appointments);
         const appointmentIds = appointments.map((appointment) => appointment._id);
         console.log('Appointment IDs:', appointmentIds)
        
         setMyAppointmentId(appointments[0]?._id);
        console.log(response.data.appointment);
     
        }

        
     
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyAppointment();
  }, []);


  //fetch result from the hospital

  useEffect(() => {
    const fetchResult = async() => {
      try {
        const token = localStorage.getItem('token')
        if(!token){
          toast.error("token not found")
        }
        const response = await axios.get(`${import.meta.env.VITE_API_HO}/getresult`, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        SetMedicalResult(response.data)

        console.log(response.data)
        console.log(response.data)
      } catch (error) {
        toast.error("error fetching result")
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchResult()
  }, [id])




  const handleDeleteAppointment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (
        !window.confirm("are you sure you want to delete this appointment?")
      ) {
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_API_HO}/deleteAppointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("appointment successfully cancelled");
      onDeleteSuccess(appointmentId);
    } catch (error) {
      console.log(error);
      toast.error("an error deleting the appointment");
    }
  };


  const handleDeleteSuccess = (deleteId) => {
    setMyAppointment((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== deleteId)
    );
  };

  useEffect(() => {
    if (myAppointment.length > 0) {
      const sicknessCounts = {};
      myAppointment.forEach((appointment) => {
        const sickness = appointment.sickness;
        sicknessCounts[sickness] = (sicknessCounts[sickness] || 0) + 1;
      });

      const labels = Object.keys(sicknessCounts);
      const data = Object.values(sicknessCounts);
      const colors = labels.map(
        (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 60%)`
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Sickness Distribution",
            data,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [myAppointment]);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  const Sidebar = ({ isSidebarOpen, setSidebarOpen, setSelectedSection }) => {
    return (
      <div
        className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-4 absolute md:relative transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
        >
          ✕
        </button>

        {/* Sidebar Title */}
        <h1 className="text-2xl font-semibold mb-6">Menu</h1>

        {/* Menu Items */}
        <ul className="space-y-3">
          {[
            { name: "Home", key: "home", icon: <MdHome size={20} /> },
            {
              name: "Book Appointment",
              key: "yourPatients",
              icon: <MdPeople size={20} />,
            },
            {
              name: "Appointments",
              key: "appointments",
              icon: <MdEvent size={20} />,
            },
            {
              name: "medical Result",
              key: "medicalResult",
              icon: <MdPeople size={20} />,
            },
            { name: "Reports", key: "reports", icon: <MdReport size={20} /> },
            { name: "Profile", key: "profiles", icon: <MdPerson size={20} /> },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 hover:bg-blue-700 px-2 py-2 rounded-lg transition duration-200 cursor-pointer"
              onClick={() => setSelectedSection(item.key)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "home":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Home</h3>
            <p>Welcome to the Home section.</p>
            <div style={{ maxWidth: "300px", margin: "0 auto" }}>
              <h2 style={{ textAlign: "center" }}>Sickness Distribution</h2>
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      case "yourPatients":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Book an Appointment
            </h3>
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="adminId" className="font-semibold">
                  Hospital Admin ID
                </label>
                <input
                  type="text"
                  id="adminId"
                  name="adminId"
                  value={userData.adminId?._id || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                  readOnly // Make the input field readonly
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="appointmentDate" className="font-semibold">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={appointmentData.appointmentDate}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="appointmentTime" className="font-semibold">
                  Appointment Time
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  value={appointmentData.appointmentTime}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Sickness" className="font-semibold">
                  Sickness
                </label>
                <input
                  type="text"
                  id="sickness"
                  name="sickness"
                  value={appointmentData.sickness}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="reasonForAppointment" className="font-semibold">
                  previous actions or drugs taken to cure the illness
                </label>
                <textarea
                  id="reasonForAppointment"
                  name="reasonForAppointment"
                  value={appointmentData.reasonForAppointment}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <h3 className="text-xl font-semibold mt-6">Patient Details</h3>
              <div className="space-y-2">
                <label
                  htmlFor="patientDetails.weight"
                  className="font-semibold"
                >
                  Weight
                </label>
                <input
                  type="text"
                  name="patientDetails.weight"
                  value={appointmentData.patientDetails.weight}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="patientDetails.specializationNeeded"
                  className="font-semibold"
                >
                  Specialization Needed
                </label>
                <input
                  type="text"
                  name="patientDetails.specializationNeeded"
                  value={appointmentData.patientDetails.specializationNeeded}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="patientDetails.location"
                  className="font-semibold"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="patientDetails.location"
                  value={appointmentData.patientDetails.location}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="patientDetails.state" className="font-semibold">
                  State
                </label>
                <input
                  type="text"
                  name="patientDetails.state"
                  value={appointmentData.patientDetails.state}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="patientDetails.LGA" className="font-semibold">
                  LGA
                </label>
                <input
                  type="text"
                  name="patientDetails.LGA"
                  value={appointmentData.patientDetails.LGA}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="space-y-2">
  <label htmlFor="responseType" className="font-semibold">
    Will you like your message to be sent through an email or WhatsApp message?
  </label>
  <select
    id="responseType"
    name="responseType"
    value={appointmentData.responseType}
    onChange={handleAppointmentChange}
    className="border p-2 w-full"
    required
  >
    <option value="" disabled>
      Select an option
    </option>
    <option value="both email and whatsapp">Yes, both email and WhatsApp</option>
    <option value="none">No, none of the two</option>
    <option value="whatsapp">Only WhatsApp</option>
    <option value="email">Only email</option>
  </select>
</div>


              <button
                type="submit"
                className="bg-blue-600 text-white p-3 w-full rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>
                    <path
                      d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                ) : (
                  "Submit Appointment"
                )}
              </button>
            </form>
          </div>
        );
      case "appointments":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Appointments
            </h3>
            <p>Manage your appointments here.</p>
            {myAppointment.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Hospital Name</th>
                    <th className="border px-4 py-2">Hospital Email</th>
                    <th className="border px-4 py-2">Sickness</th>
                    <th className="border px-4 py-2">Appointment Date</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions or drugs taken</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myAppointment.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="border px-4 py-2">
                        {appointment.adminId?.name}
                      </td>
                      <td className="border px-4 py-2">
                        {appointment.adminId?.email}
                      </td>

                      <td className="border px-4 py-2">
                        {appointment.sickness}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">{appointment.status}</td>
                      <td className="border px-4 py-2">{appointment.reason}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() =>
                            handleDeleteAppointment(
                              appointment._id,
                              handleDeleteSuccess
                            )
                          }
                          className="bg-red-500 text-white px-2 py-1 rounded "
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        );

      case "medicalResult":
        return(
          <div>
            see your medical result
            {medicalResult.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    
                  <th className="border px-4 py-2">Sickness</th>
                    <th className="border px-4 py-2">Result</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Observation</th>
                    <th className="border px-4 py-2">Recommendation</th>

                  </tr>
                </thead>
                <tbody className="text-green-900">
                  {medicalResult.map((medical) => (
                    <tr key={medical._id}>
                      {/* <td className="border px-4 py-2">
                        {medical.adminId?.name}
                      </td> */}
                      <td className="border px-4 py-2">
                        {medical.sickness}
                      </td>

                      <td className="border px-4 py-2">
                        {medical.result}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(
                          medical.createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">{medical.observation}</td>
                      <td className="border px-4 py-2">{medical.recommendation}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No medical result  found.</p>
            )}
          </div>
        )
      case "reports":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Reports
            </h3>
              <h4>send a report to the hospital admin</h4>
              <form onSubmit={handleSendReport} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="adminId" className="font-semibold">
                  Hospital Admin ID
                </label>
                <input
                  type="text"
                  id="adminId"
                  name="adminId"
                  value={userData.adminId?._id || ""}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                  readOnly // Make the input field readonly
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="complaints" className="font-semibold">
                  Your complaint
                </label>
                <input
                  type="text"
                  id="complaints"
                  name="complaints"
                  value={report.complaints}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="doctorName" className="font-semibold">
                  Doctor or Nurse name had an encounter with
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={report.doctorName}
                  onChange={handleAppointmentChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="observation" className="font-semibold">
                  observation
                </label>
                <input
                  type="text"
                  id="observation"
                  name="observation"
                  value={report.observation}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

           



              <button
                type="submit"
                className="bg-blue-600 text-white p-3 w-full rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>
                    <path
                      d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                ) : (
                  "Submit Appointment"
                )}
              </button>
            </form>
          </div>
        );
      case "nurses":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Nurses</h3>
            <p>Details about nurses will appear here.</p>
          </div>
        );
      case "profiles":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Your profile
            </h3>

            {/* <a
              href="/consultadoctor"
              className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>patients can consult you?</span>
            </a> */}
            <p>Manage your settings here.</p>

            <h4 className="">
              {" "}
              Your email: <span className="font-bold"> {userData.email}</span>
            </h4>
            <h4 className="">
              {" "}
              Your fullname: <span className="font-bold"> {userData.name}</span>
            </h4>

            <h4 className="">
              {" "}
              Your phone number:{" "}
              <span className="font-bold"> {userData.phone}</span>
            </h4>
            <h4 className="">
              {" "}
              Your state of Origin:{" "}
              <span className="font-bold"> {userData.state}</span>
            </h4>
            <h4 className="">
              {" "}
              Your LGA: <span className="font-bold"> {userData.LGA}</span>
            </h4>
            <h4 className="">
              {" "}
              Your Home Address:{" "}
              <span className="font-bold"> {userData.location}</span>
            </h4>

            <h4 className="">
              {" "}
              Hospital Name:{" "}
              <span className="font-bold"> {userData.adminId?.name}</span>
            </h4>
            <h4 className="">
              {" "}
              Hospital Email:{" "}
              <span className="font-bold"> {userData.adminId?.email}</span>
            </h4>
            <img
              src={userData.profilePicture || m}
              alt="User"
              className="rounded-full w-32 h-32 object-cover"
            />

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Update Your Profile
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(userData).map(
                      (key) => key !== "profilePicture"
                    )}

                    {/* New input fields */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {/* <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Specialization
                      </label>
                      <select
                        name="specialization"
                        value={userData.specialization}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>
                          Select Specialization
                        </option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Gastroenterology">
                          Gastroenterology
                        </option>
                        <option value="General Practice">
                          General Practice
                        </option>
                        <option value="Neurology">Neurology</option>
                        <option value="Obstetrics and Gynecology">
                          Obstetrics and Gynecology
                        </option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Psychiatry">Psychiatry</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Urology">Urology</option>
                      </select>
                    </div> */}

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what time will you be Available(e.g 4:00pm - 8:00pm)
                        everyday/ specify the day
                      </label>
                      <input
                        type="time"
                        name="doctorTime"
                        value={userData.doctorTime}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div> */}

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        profile Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture1")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleShowpopupClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowPopup(true)}
              className="mt-5 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Edit Profile
            </button>
            {error && <div className="text-red-500 mt-5">{error}</div>}
            {successMessage && (
              <div className="text-green-500 mt-5">{successMessage}</div>
            )}
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Overview
            </h3>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div>
                <p className="text-gray-500 text-sm mb-4">
                  Pie Chart Placeholder
                </p>
                <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                  <h2 style={{ textAlign: "center" }}>Sickness Distribution</h2>
                  <Pie
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-h-screen">
        <div className="bg-gray-50 min-h-screen  md:p-8">
          <h2 className=" text-blue-900 font-bold w-21">
            {userData.email}'s Dashboard
          </h2>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
            Patient Dashboard for {userData.name} @ {userData.adminId?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
            {/* Stats Card 1 */}
            <div className="bg-blue-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaUser className="text-4xl text-blue-600" />
              <div className="text-right">
                <h3 className="text-2xl font-bold">{patient.length}</h3>
                <p className="text-gray-500">Registered Patients</p>
              </div>
            </div>
            {/* Stats Card 2 */}
            <div className="bg-green-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaCalendarAlt className="text-4xl text-green-600" />
              <div className="text-right">
                <h3 className="text-2xl font-bold">{doctor.length}</h3>
                <p className="text-gray-500">Doctors</p>
              </div>
            </div>
            {/* Stats Card 3 */}
            <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center justify-between">
              <FaHeartbeat className="text-4xl text-red-600" />
              <div className="text-right">
                <h3 className="text-2xl font-bold">{nurse.length}</h3>
                <p className="text-gray-500">Nurses</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden bg-blue-600 text-white p-3 rounded-full m-2 fixed z-50 "
            >
              ☰
            </button>

            {/* Sidebar Component */}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setSelectedSection={setSelectedSection}
            />
            {/* Middle Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 col-span-2 w-200 ">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboardHospital;
