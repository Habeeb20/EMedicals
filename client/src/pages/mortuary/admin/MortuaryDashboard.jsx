import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { BsGraphUp } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

Chart.register(...registerables);

const Sidebar = ({ isOpen, toggleSidebar, setActiveSection }) => {
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
        {["Dashboard", "Death Rate", "Death Record", "Your Death Record"].map(
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

const TradingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Market Trends",
        data: [],
        borderColor: "#ff9900",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newLabel = new Date().toLocaleTimeString();
        const newData = [...prevData.datasets[0].data, Math.random() * 100];
        const newLabels = [...prevData.labels, newLabel];
        if (newLabels.length > 20) {
          newLabels.shift();
          newData.shift();
        }
        return {
          labels: newLabels,
          datasets: [{ ...prevData.datasets[0], data: newData }],
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-5  rounded-lg shadow-lg  h-64">
      <Line data={chartData} />
    </div>
  );
};

const MyDashboard = () => {
  const [dataId, setDataId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [deathRecord, setDeathRecord] = useState([]);
  const [myRecord, setMyRecord] = useState([]);
  const navigate = useNavigate();
  const [previousLength, setPreviousLength] = useState(0);
 


  //charts state
const [gender, setGender] = useState([])
const [causeOfDeath, setCauseOfDeath] = useState([])
const [chartData, setChartData] = useState(null);
  const [genderData1, setGenderData1] = useState({ male: 0, female: 0 });
  const [sicknessData1, setSicknessData1] = useState({});
  const [genderData2, setGenderData2] = useState({ male: 0, female: 0 });
  const [sicknessData2, setSicknessData2] = useState({});


//   const fetchData = async (url, setterFunction, setterFunction2) => {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data) {
            
//             const genderCounts = { male: 0, female: 0 };
//             const sicknessCounts = {};

//             data.forEach(item => {
           
//                 if (item.gender === 'male') genderCounts.male++;
//                 if (item.gender === 'female') genderCounts.female++;

          
//                 if (item.causeOfDeath) {
//                     sicknessCounts[item.causeOfDeath] = (sicknessCounts[item.causeOfDeath] || 0) + 1;
//                 }
//             });

          
//             setGender(genderCounts);
//             setterSickness(sicknessCounts);
//         }
//     } catch (error) {
//         console.error("Error fetching data", error);
//     }
// };

// useEffect(() => {

//     fetchData(`${import.meta.env.VITE_API_HO}/getdeathrecord`, setGenderData1, setSicknessData1);
//     fetchData(`${import.meta.env.VITE_API_m}/getAllDeath`, setGenderData2, setSicknessData2);
// }, []);


const genderChartData = (data) => ({
    labels: ['Male', 'Female'],
    datasets: [
        {
            label: 'Gender Distribution',
            data: [data.male, data.female],
            backgroundColor: ['#FF5733', '#33FF57'], // Beautiful colors
            borderColor: ['#FF5733', '#33FF57'],
            borderWidth: 1,
        },
    ],
});


const sicknessChartData = (data) => ({
    labels: Object.keys(data),
    datasets: [
        {
            label: 'Sickness Types',
            data: Object.values(data),
            backgroundColor: ['#FF5733', '#33FF57', '#C70039', '#900C3F'], // Different colors
            borderColor: ['#FF5733', '#33FF57', '#C70039', '#900C3F'],
            borderWidth: 1,
        },
    ],
});

  //get your profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_m}/getprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.user);
        setDataId(response.data._id);
        console.log(response.data);
        console.log(response.data._id);
        toast.success("you are welcome");
      } catch (error) {
        console.log(error);
        toast.error("an error occurred");
        navigate("/mlogin");
      }
    };
    fetchData();
  }, []);

  //edit profile
  const editMyData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_m}/medit/${dataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("successfully edited");
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePercentageChange = (previous, current) => {
    if (previous === 0) return 0; 
    return ((current - previous) / previous) * 100;
};
  //fetch data for death record
  useEffect(() => {
    const fetchDeath = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_HO}/getdeathrecord`
        );
        setDeathRecord(response.data);
        toast.success("successfully fetched");
        console.log(response.data);


        const percentageChange = calculatePercentageChange(previousLength, deathRecord.length)
        setPreviousLength(deathRecord.length)

        const backgroundColors = [
            "#4F46E5", // Purple
            "#F59E0B", // Amber
            "#10B981", // Green
            "#EF4444", // Red
            "#3B82F6", // Blue
            "#8B5CF6", // Violet
          ];
          setChartData({
            labels:gender,
            datasets:[
                {
                    label: "cause of death",
                    data:causeOfDeath,
                    backgroundColor: gender?.map(
                        (_, idx) => backgroundColors[idx % backgroundColors.length] // Cycle through colors
                      ),
                      borderWidth: 1,
                }
            ]
          })

      } catch (error) {
        console.log(error);
      }
    };
    fetchDeath();
  }, []);
const calculateCounts = (field) => {
    const counts = {};
    deathRecord.forEach((death) => {
        counts[death[field]] = (counts[death[field]] || 0) + 1;
    })
    return counts
}

  const genderCounts = calculateCounts("gender");
  const causeOfDeathCounts = calculateCounts("causeOfDeath")

  const pieData = (counts, title) => ({
    labels: Object.keys(counts),
    datasets: [
      {
        label: title,
        data: Object.values(counts),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4CAF50", // Green
          "#FF9F40", // Orange
          "#9966FF", // Purple
        ],
        borderWidth: 1,
      },
    ],
  });


  const percentage2 = calculatePercentageChange(previousLength, deathRecord.length)
  //fetch my record

  useEffect(() => {
    const fetchMyRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_m}/getdeath`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMyRecord(response.data);
        console.log(response.data);
        toast.success("your death records is here");

        const percentageChange = calculatePercentageChange(previousLength, myRecord.length);
        setPreviousLength(myRecord.length);

      } catch (error) {
        console.log(error);
        toast.error("an error occurred");
        setError(error.response?.data?.message);
      }
    };
    fetchMyRecord();
  }, []);




const percentage = calculatePercentageChange(previousLength, myRecord.length);

  return (
    <>
      <div className="mr-44">
        <h1>
          Dashboard for{" "}
          <span className="font-bold text-green-600 text-2xl mb-15">
            {data.name}
          </span>
        </h1>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6  text-white">
          <div className="bg-[#1c0f0a] p-6 rounded-xl relative border border-[#ff7b3e] shadow-lg w-full min-h-[150px]">
            <h3 className="text-sm text-gray-400">
              Death recorded in hospital
            </h3>
            <p className="text-3xl font-bold">{deathRecord.length}</p>
            <p className="text-sm text-red-400">
              <span className="text-xs">{percentage2.toFixed(2)}%</span>
            </p>
            <div className="absolute top-4 right-4 text-[#ff7b3e]">⬤</div>
          </div>

          {/* Deposits Card */}
          <div className="bg-[#0f0f1c] p-6 rounded-xl relative border border-[#6b5aff] shadow-lg w-full min-h-[150px]">
            <h3 className="text-sm text-gray-400">
              Death recorded by your mortuary
            </h3>
            <p className="text-3xl font-bold">{myRecord.length}</p>
            <p className="text-sm text-green-400">
               <span className="text-xs">{percentage.toFixed(2)}%</span>
            </p>
            <div className="absolute top-4 right-4 text-[#6b5aff]">⬤</div>
          </div>

          {/* Accrued Yield Card */}
          <div className="bg-[#1a1a14] p-6 rounded-xl relative border border-[#ffbe32] shadow-lg w-full min-h-[150px]">
            <h3 className="text-sm text-gray-400">Accrued Yield</h3>
            <p className="text-3xl font-bold">$20,892</p>
            <p className="text-sm text-green-400">
              +$1340 <span className="text-xs">+1.2%</span>
            </p>
            <div className="absolute top-4 right-4 text-[#ffbe32]">⬤</div>
          </div>
        </div>
        
        {/*charts*/}

      

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Gender
              </h2>
              <Pie data={pieData(genderCounts, "Gender Count")} />
            </div>

            <div className=" shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Cause of death
              </h2>
              <Pie data={pieData(causeOfDeath, "Cause of Death")} />
            </div>

            {/* Departments Pie Chart */}
            {/* <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Departments
              </h2>
              <Pie data={pieData(departmentCounts, "Departments")} />
            </div> */}
          </div>

      </div>
    </>
  );
};

const YourDeathRecord = () => {
  const [recordDeath, setRecordDeath] = useState({
    fullName: "",
    causeOfDeath: "",
    dateOfDeath: "",
    gender: "",
  });
  const [myRecord, setMyRecord] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleIsModalOpen = () => {
    setRecordDeath({
      fullName: "",
      causeOfDeath: "",
      dateOfDeath: "",
    });
    setIsModal(true);
  };

  const handleIsModalClose = () => {
    setIsModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordDeath({ ...recordDeath, [name]: value });
  };
  ///post data
  const HandleSubmitDeathRecord = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_m}/postdeath`,
        recordDeath,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("you have successfully added the data");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.response);
      toast.error("an error occurred");
    }
  };

  //fetch my record

  useEffect(() => {
    const fetchMyRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_m}/getdeath`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMyRecord(response.data);
        console.log(response.data);
        toast.success("your death records is here");
      } catch (error) {
        console.log(error);
        toast.error("an error occurred");
        setError(error.response?.data?.message);
      }
    };
    fetchMyRecord();
  }, []);

  //handle delete

  const handleDelete = async (deathId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_m}/deletedeath/${deathId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyRecord(myRecord.filter((death) => death._id !== deathId));
      toast.success("successfully deleted");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting payroll:", error);
      toast.error("an error occured while trying to delete the data");
    }
  };

  return (
    <>
      <div className=" text-white py-2 px-4 rounded-full">
        <button
          className="bg-green-400 text-white py-2 px-2 rounded-full align-middle"
          onClick={handleIsModalOpen}
        >
          Add a death record
        </button>

        {/* modal*/}
        {isModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl text-black font-bold mb-4">
                Add Deceased details
              </h2>
              <form onSubmit={HandleSubmitDeathRecord}>
                <div className="mb-4">
                  <label className="block mb-1 text-black">full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={recordDeath.fullName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-black">
                    Cause of Death
                  </label>
                  <input
                    type="text"
                    name="causeOfDeath"
                    value={recordDeath.causeOfDeath}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-black">
                    gender
                  </label>
                  <select
                   
                    name="gender"
                    value={recordDeath.gender}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    required
                  >
                  <option value="">select a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-black">Date Of Death</label>
                  <input
                    type="date"
                    name="dateOfDeath"
                    value={recordDeath.dateOfDeath}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleIsModalClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-400 text-black py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="text-white text-center">Your Death Record</div>
        <div className="mt-4 bg-gray-300 text-black shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-sm text-gray-600">Full Name</th>
                <th className="p-2 text-sm text-gray-600">Cause of Death</th>
                <th className="p-2 text-sm text-gray-600">Date of Death</th>
                <th className="p-2 text-sm text-gray-600">Gender</th>
                <th className="p-2 text-sm text-gray-600">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {myRecord && myRecord.length > 0 ? (
                myRecord.map((death, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-sm">{death.fullName}</td>
                    <td className="p-2 text-sm">{death.causeOfDeath}</td>

                    <td className="p-2 text-sm">
                      {moment(death.dateOfDeath).format(
                        "MMMM Do, YYYY hh:mm A"
                      )}
                    </td>
                    <td className="p-2 text-sm">{death.gender}</td>
                    <td className="p-2 text-sm">
                      {new Date(death.createdAt).toLocaleTimeString()}
                    </td>

                    <td className="p-2 text-sm text-red-600">
                      <button onClick={() => handleDelete(death._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h3>No death record from your mortuary</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const DeathRecords = () => {
  const [deathRecord, setDeathRecord] = useState([]);
  const [myRecord, setMyRecord] = useState([]);
  useEffect(() => {
    const fetchDeath = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_HO}/getdeathrecord`
        );
        setDeathRecord(response.data);
        toast.success("successfully fetched");
        console.log(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error);
        setError(error.response?.data?.message);
      }
    };
    fetchDeath();
  }, []);

  return (
    <>
      <div>
        <div className="text-white">Death record from other hospitals</div>
        <div className="mt-4 bg-gray-300 text-black shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-sm text-gray-600">Full Name</th>
                <th className="p-2 text-sm text-gray-600">Cause of Death</th>
                <th className="p-2 text-sm text-gray-600">Gender</th>
                <th className="p-2 text-sm text-gray-600">Date of Death</th>
                <th className="p-2 text-sm text-gray-600">Hospital</th>
              </tr>
            </thead>
            <tbody>
              {deathRecord && deathRecord.length > 0 ? (
                deathRecord.map((death, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-sm">{death.fullName}</td>
                    <td className="p-2 text-sm">{death.causeOfDeath}</td>
                    <td className="p-2 text-sm">{death.gender}</td>

                    <td className="p-2 text-sm">
                      {moment(death.dateOfDeath).format(
                        "MMMM Do, YYYY hh:mm A"
                      )}
                    </td>
                    <td className="p-2 text-sm">{death.hospitalId?.name}</td>
                  </tr>
                ))
              ) : (
                <h3>No death record</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
const MortuaryDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-900 min-h-screen text-white">
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
          {activeSection === "Your Death Record" && <YourDeathRecord />}
          {activeSection === "Dashboard" && <MyDashboard />}
          {activeSection === "Death Rate" && <TradingChart />}
          {activeSection === "Death Record" && <DeathRecords />}
        </div>
      </div>
    </>
  );
};

export default MortuaryDashboard;
