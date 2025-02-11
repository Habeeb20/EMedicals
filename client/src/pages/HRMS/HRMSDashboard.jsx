import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [formType, setFormType] = useState("");
  const [employeeData, setEmployeeData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    jobRole: "",
    qualification: "",
    designation: "",
    department: "",
    jobType: "",
    salary: "",
    AcctNo: "",
    Bank: "",
    AcctName: "",
    location: "",
    state: "",
    LGA: "",
    DOB: "",
    complaints: "",
    reasons: "",
    onTraining: "",
    typeOfTraining: "",
  });

  const handleModalOpen = () => {
    setEmployeeData({
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      jobRole: "",
      qualification: "",
      designation: "",
      department: "",
      jobType: "",
      salary: "",
      AcctNo: "",
      Bank: "",
      AcctName: "",
      location: "",
      state: "",
      LGA: "",
      DOB: "",
      complaints: "",
      reasons: "",
      onTraining: "",
      typeOfTraining: "",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        toast.success("welcome");
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error("an error occurred");
      }
    };
    fetchData();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //add employee
  const HandleAddEmployee = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_HRMS}/createmployee`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("a staff is added");
      console.log(response.data);
    } catch (error) {
      setError("an error occurred");
      toast.error("an error occurred during adding of your staff");
      console.log(error);
    }
  };

  //get my staff
  useEffect(() => {
    const handleGetMystaffs = async () => {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(response.data);
        console.log(response.data);
        const { department, jobRole } = response.data;
        toast.success("successfully fetched");

        const uniqueJobRoles = [
          ...new Set(response.data.map((emp) => emp.jobRole)),
        ];
        setJobRoles(uniqueJobRoles);
        const unqiueDepartments = [
          ...new Set(response.data.map((dep) => dep.department)),
        ];
        setDepartments(unqiueDepartments);

        const backgroundColors = [
          "#4F46E5", // Purple
          "#F59E0B", // Amber
          "#10B981", // Green
          "#EF4444", // Red
          "#3B82F6", // Blue
          "#8B5CF6", // Violet
        ];

        setChartData({
          labels: department,
          datasets: [
            {
              label: "Job Roles",
              data: jobRole,
              backgroundColor: department?.map(
                (_, idx) => backgroundColors[idx % backgroundColors.length] // Cycle through colors
              ),
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error(" couldnt get your staffs due to an error occured");
      }
    };
    handleGetMystaffs();
  }, []);

  //update with picture
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const calculateCounts = (field) => {
    const counts = {};
    employee.forEach((emp) => {
      counts[emp[field]] = (counts[emp[field]] || 0) + 1;
    });
    return counts;
  };

  const jobRoleCounts = calculateCounts("jobRole");
  const jobTypeCounts = calculateCounts("jobType");
  const departmentCounts = calculateCounts("department");

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

  // Render loading or error states
  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 bg-white text-black p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 ">
          <div>
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="text-xl font-bold">Hello {data.name} 👋</h1>
            <p className="text-black">How are you doing today</p>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => handleModalOpen("doctor")}
            >
              Add a staff
            </button>

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Update Your Profile
                  </h2>
                  <form className="space-y-6">
                    {Object.keys(data).map((key) => key != "profilePicture")}

                    {/* New input fields */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name of your Company
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={data.name}
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
                        value={data.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="bg-purple-500 text-white py-2 px-4 mr-56  rounded"
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
                    Add an Employee
                    {formType.charAt(0).toUpperCase() + formType.slice(1)}
                  </h2>
                  <form onSubmit={HandleAddEmployee}>
                    <div className="mb-4">
                      <label className="block mb-1">first Name</label>
                      <input
                        type="text"
                        name="firstname"
                        value={employeeData.firstname}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        value={employeeData.lastname}
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
                        value={employeeData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={employeeData.phone}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Job Role</label>
                      <input
                        type="text"
                        name="jobRole"
                        value={employeeData.jobRole}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        value={employeeData.qualification}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={employeeData.designation}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={employeeData.department}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Bank</label>
                      <input
                        type="text"
                        name="Bank"
                        value={employeeData.Bank}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Account Name</label>
                      <input
                        type="text"
                        name="AcctName"
                        value={employeeData.AcctName}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Account Number</label>
                      <input
                        type="text"
                        name="AcctNo"
                        value={employeeData.AcctNo}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Complaints</label>
                      <select
                        name="complaints"
                        value={employeeData.complaints}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select a complaint
                        </option>
                        <option value="No complaint">No complaint</option>
                        <option value="sacked">sacked</option>
                        <option value="service no longer required">
                          service no longer required
                        </option>
                        <option value="suspended">suspended</option>
                        <option value="dismissed">dismissed</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Reasons</label>
                      <input
                        type="text"
                        name="reasons"
                        value={employeeData.reasons}
                        onChange={handleInputChange}
                        placeholder="write none if there is none"
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">On any Training?</label>
                      <select
                        name="onTraining"
                        value={employeeData.onTraining}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="yes">yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">
                        what type of training if there is and if the employee is
                        not on any training, write none
                      </label>
                      <input
                        type="text"
                        name="typeOfTraining"
                        value={employeeData.typeOfTraining}
                        onChange={handleInputChange}
                        placeholder="write none if there is none"
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Address</label>
                      <input
                        type="text"
                        name="location"
                        value={employeeData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">State of origin</label>
                      <input
                        type="text"
                        name="state"
                        value={employeeData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">
                        Local government area{" "}
                      </label>
                      <input
                        type="text"
                        name="LGA"
                        value={employeeData.LGA}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Date of Birth</label>
                      <input
                        type="text"
                        name="DOB"
                        value={employeeData.DOB}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Job Type</label>
                      <select
                        name="jobType"
                        value={employeeData.jobType}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select a job type
                        </option>
                        <option value="office parmanent">
                          office parmanent
                        </option>
                        <option value="remote">remote</option>
                        <option value="hybrid">hybrid</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1">Salary</label>
                      <input
                        type="text"
                        name="salary"
                        value={employeeData.salary}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded px-3 py-2"
                      />
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

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h2 className="text-black text-sm">Number of Employee</h2>
            <p className="text-2xl font-bold">{employee.length}</p>
            <p className="text-black text-xs">Updated:</p>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h2 className="text-black text-sm">Number of Job roles</h2>
            <p className="text-2xl font-bold">{jobRoles.length}</p>
            <p className="text-black text-xs">Updated:</p>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h2 className="text-black text-sm">Number of departments</h2>
            <p className="text-2xl font-bold">{departments.length}</p>
            <p className="text-black text-xs">Updated:</p>
          </div>

          {/* <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h2 className="text-black text-sm"></h2>
            <p className="text-2xl font-bold">{employee.length}</p>
            <p className="text-black text-xs">Updated:</p>
          </div> */}
        </section>

        {/* Attendance Overview */}
        <section>
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-bold">Attendance Overview</h2>
            <select className="border px-2 py-1 rounded">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Job Roles
              </h2>
              <Pie data={pieData(jobRoleCounts, "Job Roles")} />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Job Types
              </h2>
              <Pie data={pieData(jobTypeCounts, "Job Types")} />
            </div>

            {/* Departments Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-center mb-4">
                Departments
              </h2>
              <Pie data={pieData(departmentCounts, "Departments")} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const AllEmployees = () => {
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const handleGetMystaffs = async () => {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(response.data);
        console.log(response.data);
        toast.success("successfully fetched");

        // const uniqueJobRoles = [
        //   ...new Set(response.data.map((emp) => emp.jobRole)),
        // ];
        // setJobRoles(uniqueJobRoles);
        // const unqiueDepartments = [
        //   ...new Set(response.data.map((dep) => dep.department)),
        // ];
        // setDepartments(unqiueDepartments);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error(" couldnt get your staffs due to an error occured");
      }
    };
    handleGetMystaffs();
  }, []);

  return (
    <>
      <div className="text-black">Employees</div>
      <div className="mt-4 bg-white text-black shadow-md rounded-md">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-sm text-gray-600">Employee ID</th>
              <th className="p-4 text-sm text-gray-600">Employee Name</th>
              <th className="p-4 text-sm text-gray-600">Department</th>
              <th className="p-4 text-sm text-gray-600">Job Role</th>
              <th className="p-4 text-sm text-gray-600">Job Type</th>
              <th className="p-4 text-sm text-gray-600">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employee && employee.length > 0 ? (
              employee.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{emp.uniqueNumber}</td>
                  <td className="p-4 text-sm flex items-center space-x-2">
                    <img
                      src={
                        emp.picture || `https://i.pravatar.cc/30?img=${index}`
                      }
                      alt="Employee"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>
                      {emp.firstname} {emp.lastname}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {emp.firstname}
                    {emp.lastname}
                  </td>
                  <td className="p-4 text-sm">{emp.jobRole}</td>
                  <td className="p-4 text-sm">{emp.jobType}</td>
                  <td className="p-4 text-sm">{emp.salary}</td>

                  <td className="p-4 text-sm flex space-x-2">
                    <Link
                      to={`hrms/details/${emp._id}`}
                      state={{ email: emp.email }}
                    >
                      <button className="text-blue-500">
                        <span className="material-icons">View more</span>
                      </button>
                    </Link>

                    {/* <button className="text-purple-500">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="text-red-500">
                      <span className="material-icons">delete</span>
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-sm">
                  You don't have any employees registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 out of 60 records
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">
              4
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Payroll = () => {
  const [pay, setPay] = useState({
    employeeId: "",
    month: "",
    year: "",
    tax: "",
    HMO: "",
    penalty: "",
    IOU: "",
    status: "",
  });
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [myPayroll, setMyPayroll] = useState([]);
  const [error, setError] = useState("");
  const [payrollId, setPayrollId] = useState("");
  const [payrollData, setPayrollData] = useState([]);

  const [status, setStatus] = useState('');
  const [tax, setTax] = useState('');
  const [hmo, setHMO] = useState('');
  const [iou, setIOU] = useState('');
  const [penalty, setPenalty] = useState('');
  const [month, setMonth] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editPayroll, setEditPayroll] = useState("");
  const [editPayroll1, setEditPayroll1] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [showPopup, setShowPopup] = useState(false)
  const [errors, setErrors] = useState({
    tax: "",
    HMO: "",
    penalty: "",
    IOU: "",
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validate the field only on blur
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid number",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error if valid
      }));
    }
  };
  //getEmployees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        setError("an error occurred");
      }
    };
    fetchEmployees();
  }, []);

  //getMyPayroll
  useEffect(() => {
    const getMyPayroll = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getpayrolls`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        if (response.data.length > 0) {
          const payrollIds = response.data.map(item => item._id); 
          setPayrollId(payrollIds); 
          console.log("Payroll IDs:", payrollIds); 
          setMyPayroll(response.data);
          console.log(response.data);
        } else {
          console.error("No data found:", response.data);
        }
        
     
      } catch (error) {
        setError(error.response?.data?.message);
        console.log(error);
        toast.error("an error occurred");
      }
    };
    getMyPayroll();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPay((prev) => ({ ...prev, [name]: value }));
  };


  //edit button 

  const handleEditClick = (payroll) => {
    setEditPayroll1(payroll); 
    setStatus(payroll.status); 
    setTax(payroll.tax); // Pre-fill tax field
    setHMO(payroll.hmo); // Pre-fill HMO field
    setIOU(payroll.iou); // Pre-fill IOU field
    setPenalty(payroll.penalty); // Pre-fill penalty field
    setMonth(payroll.month); 
    setShowPopup(true); 
  };


  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setEditPayroll((prev) => ({ ...prev, [name]: value }));
  };
  //editMypayroll
  const handleEditPayroll = async(e) => {
    e.preventDefault()
    setError("")


    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`${import.meta.env.VITE_API_HRMS}/updatepayroll/${editPayroll1._id}`, 
        editPayroll, {
          headers:{
            Authorization: `Bearer ${token}`}
        }
      )
      toast.success("successfully edited payroll")

      setMyPayroll((prevData) =>
        prevData.map((payroll) =>
          payroll._id === editPayroll._id
            ? { ...payroll, status: response.data.status, tax: response.data.tax, hmo: response.data.hmo, iou: response.data.iou, penalty: response.data.penalty, month: response.data.month }
            : payroll
        )
      );
      setShowPopup(false)
    } catch (error) {
      console.log(eror)
      setError(error.response?.data?.message)
    }
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_HRMS}/makepayroll`,
        pay,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setError("");
      toast.success("payroll successfully added");
    } catch (error) {
      toast.error("an error occurred");
      setError(error.response?.data?.message);
    }
  };

  const handleModalOpen = () => {
    setPay({
      employeeId: "",
      month: "",
      year: "",
      tax: "",
      HMO: "",
      IOU: "",
      penalty: "",
      status: "",
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleShowPopupClose = () => {
    setShowPopup(false)
  }

  //delete button
  const handleDelete = async(payrollId)=> {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_HRMS}/deletepayroll/${payrollId}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setMyPayroll(myPayroll.filter(payroll => payroll._id !== payrollId))
      toast.success("successfully deleted")
      console.log(response.data.message)
    } catch (error) {
      console.error('Error deleting payroll:', error);
      toast.error("an error occured while trying to delete the data")
    }
  }

  return (
    <div>
      payroll
      <div className="flex text-black justify-center gap-4 mb-6">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen()}
        >
          Add a payroll
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Add a payroll for your A staff
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Select Employee</label>
                  <select
                    name="employeeId"
                    value={pay.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Choose an employee</option>
                    {Array.isArray(employees) &&
                      employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstname} {employee.lastname}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Month:</label>
                  <input
                    type="month"
                    name="month"
                    value={pay.month}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={pay.year}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Tax</label>
                  <input
                    type="text"
                    name="tax"
                    value={pay.tax}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.tax ? "border-red-500" : ""
                    }`}
                    required
                    placeholder="write 0 if there no tax"
                  />
                  {errors.tax && (
                    <p className="text-red-500 text-sm">{errors.tax}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1">HMO</label>
                  <input
                    type="text"
                    name="HMO"
                    value={pay.HMO}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.HMO ? "border-red-500" : ""
                    }`}
                    required
                    placeholder="write 0 if there no tax"
                  />
                  {errors.HMO && (
                    <p className="text-red-500 text-sm">{errors.HMO}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1">penalty</label>
                  <input
                    type="text"
                    name="penalty"
                    value={pay.penalty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.penalty ? "border-red-500" : ""
                    }`}
                    required
                    placeholder="write 0 if there no tax"
                  />
                  {errors.penalty && (
                    <p className="text-red-500 text-sm">{errors.penalty}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1">IOU</label>
                  <input
                    type="text"
                    name="IOU"
                    value={pay.IOU}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.IOU ? "border-red-500" : ""
                    }`}
                    required
                    placeholder="write 0 if there no tax"
                  />
                  {errors.IOU && (
                    <p className="text-red-500 text-sm">{errors.IOU}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Status</label>
                  <select
                    name="status"
                    value={pay.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 bg-white text-black shadow-md rounded-md">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            {error && <p className="text-red-500">{error}</p>}
            <tr className="border-b">
              <th className="p-2 text-sm text-gray-600">Name</th>
              <th className="p-2 text-sm text-gray-600">Salary</th>
              <th className="p-2 text-sm text-gray-600">Tax</th>
              <th className="p-2 text-sm text-gray-600">HMO</th>
             
              <th className="p-2 text-sm text-gray-600">IOU</th>
              <th className="p-2 text-sm text-gray-600">Penalty</th>
              <th className="p-2 text-sm text-gray-600">Date</th>
              <th className="p-2 text-sm text-gray-600">Month</th>
              {/* <th className="p-2 text-sm text-gray-600">Year</th> */}
              <th className="p-2 text-sm text-blue-700">Net Salary</th>
              <th className="p-4 text-sm text-gray-600">Status</th>

                 <th className="p-4 text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(myPayroll) && myPayroll.length > 0 ? (
              myPayroll.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm flex items-center space-x-1">
                    <img
                      src={
                        emp.picture || `https://i.pravatar.cc/30?img=${index}`
                      }
                      alt="Employee"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>
                      {emp.employeeId?.firstname} {emp.employeeId?.lastname}
                    </span>
                  </td>
                  {/* <td className="p-4 text-sm">{emp.employeeId?.firstname} {emp.employeeId?.lastname}</td> */}
                  <td className="p-2 text-sm">{emp.employeeId?.salary}</td>
                  <td className="p-2 text-sm">{emp.tax}</td>
                  <td className="p-2 text-sm">{emp.HMO}</td>
                  <td className="p-2 text-sm">{emp.IOU}</td>
                  <td className="p-2 text-sm">{emp.penalty}</td>
                  <td className="p-2 text-sm">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-sm">{emp.month}</td>
                  {/* <td className="p-2 text-sm">{emp.year}</td> */}
                  <td className="p-2 text-sm text-blue-700">
  {(() => {
 
    const salary = Number(emp.employeeId?.salary.replace(/,/g, "").trim()) || 0;
    const tax = Number(emp.tax) || 0;
    const HMO = Number(emp.HMO) || 0;
    const penalty = Number(emp.penalty) || 0;
    const IOU = Number(emp.IOU) || 0;



    // Perform calculation
    const netSalary = salary - tax - HMO - penalty - IOU;



    return netSalary;
  })()}
</td>



                  <td className="p-2 text-sm">
                    <button className="text-gray-500">
                      {emp.status === "Unpaid" ? (
                        <span className="text-red-500">Unpaid</span>
                      ) : (
                        <span className="text-green-500">Paid</span>
                      )}
                    </button>
                  </td>
                  <td className="p-2 text-sm">
                  <button onClick={() => handleEditClick(emp)}>Edit</button>
                  {/* <button onClick={() => setShowPopup(true)}>
                  edit
                  </button> */}
                  </td>

                  <td className="p-2 text-sm text-red-600">
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
                    {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    edit pay roll for {emp.employeeId?.firstname} {emp.employeeId.lastname}
                  </h2>
                  <form onSubmit={handleEditPayroll} className="space-y-6">
                    {Object.keys(editPayroll).map(
                      (key) => key !== "profilePicture"
                    )}

                    {/* New input fields */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tax
                      </label>
                      <input
                        type="text"
                        name="tax"
                        value={editPayroll.tax}
                        onChange={handleChange2}
                        onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.tax ? "border-red-500" : ""
                    }`}
                      />
                        {errors.tax && (
                    <p className="text-red-500 text-sm">{errors.tax}</p>
                  )}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                    HMO
                      </label>
                      <input
                        type="text"
                        name="HMO"
                        value={editPayroll.HMO}
                        onChange={handleChange2}
                         onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.HMO ? "border-red-500" : ""
                    }`}
                      />
                         {errors.HMO && (
                    <p className="text-red-500 text-sm">{errors.HMO}</p>
                  )}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                   IOU
                      </label>
                      <input
                        type="text"
                        name="IOU"
                        value={editPayroll.IOU}
                        onChange={handleChange2}
                        onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.IOU ? "border-red-500" : ""
                    }`}
                      />
                         {errors.IOU && (
                    <p className="text-red-500 text-sm">{errors.IOU}</p>
                  )}
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                   penalty
                      </label>
                      <input
                        type="text"
                        name="penalty"
                        value={editPayroll.penalty}
                        onChange={handleChange2}
                         onBlur={handleBlur}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.penalty ? "border-red-500" : ""
                    }`}
                      />
                        {errors.penalty && (
                    <p className="text-red-500 text-sm">{errors.penalty}</p>
                  )}
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                     month
                      </label>
                      <input
                        type="month"
                        name="month"
                        value={editPayroll.month}
                        onChange={handleChange2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                  

               

           

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        status
                      </label>
                      <select
                     
                        name="status"
                        value={editPayroll.status}
                        onChange={handleChange2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                         <option value="">Select status</option>
                         <option value="paid">paid</option>
                         <option value="Unpaid">Unpaid</option>
                      
                      </select>
                    </div>
                  
                     
                   

              



      

             
                

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleShowPopupClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        edit payroll
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No payroll for now
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Holiday = () => {
  const [holiday, setHoliday] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [myHolidays, setMyHolidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };

  //add holiday
  const handleAddHoliday = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_HRMS}/holidays`,
        holiday,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("successfully added an holiday");
    } catch (error) {
      console.log(error);
      toast.error("an error occurred");
    }
  };

  //fetch MY holidays

  useEffect(() => {
    const fetchMyHolidays = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getholidays`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        toast.success("your holidays are here");
        setMyHolidays(response.data);
      } catch (error) {
        console.log(error);
        toast.error("an error occurred");
        setError(error.response?.data?.message);
      }
    };
    fetchMyHolidays();
  }, []);

  const handleModalOpen = () => {
    setHoliday({
      title: "",
      description: "",
      date: "",
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      Holidays
      <div className="flex text-black justify-center gap-4 mb-6">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen("doctor")}
        >
          Add an holiday
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add an Holiday</h2>
              <form onSubmit={handleAddHoliday}>
                <div className="mb-4">
                  <label className="block mb-1">title of holiday</label>
                  <input
                    type="text"
                    name="title"
                    value={holiday.title}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">holiday description</label>
                  <input
                    type="text"
                    name="description"
                    value={holiday.description}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={holiday.date}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 bg-white text-black shadow-md rounded-md">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-sm text-gray-600">Title</th>
              <th className="p-4 text-sm text-gray-600">Description</th>
              <th className="p-4 text-sm text-gray-600">Date</th>
              <th className="p-4 text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(myHolidays) && myHolidays.length > 0 ? (
              myHolidays.map((holi, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{holi.title}</td>
                  <td className="p-4 text-sm">{holi.description}</td>
                  <td className="p-4 text-sm">
                    {new Date(holi.date).toLocaleDateString()}
                  </td>
                  <td>
                    <button className="text-gray-500">
                      <span className="text-red-500">Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No holidays yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Attendance = () => {
  const [attendance, setAttendance] = useState({
    email: "",
  });

  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [myAttendance, setMyAttendance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleModalOpen = () => {
    setAttendance({
      email: "",
    });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //submit attendance

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_HRMS}/attendance`,
        attendance,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("successfully added");
    } catch (error) {
      setError(error.response?.data?.message);
      toast.error("an error occurred with the network");
      console.log(error);
    }
  };

  //get employees for email details

  useEffect(() => {
    const fetchMyEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.response?.data?.message);
        toast.error("an error occurred with your network");
        console.log(error);
      }
    };
    fetchMyEmployees();
  }, []);

  //fetch my attendance

  useEffect(() => {
    const fetchMyAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getattendance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyAttendance(response.data);
        toast.success("your attendance");
        console.log(response.data);
      } catch (error) {
        setError(error.response?.data?.message);
        console.log(error);
        toast.error("an error occurred dunring fetching of your attendance");
      }
    };
    fetchMyAttendance();
  }, []);


  ///count my attendance
  const attendanceCount = useMemo(() => {
    const countMap = new Map()

    myAttendance.forEach((emp) => {
      if(!emp.employeeName || !emp.date) return;

      const uniqueKey = `${emp.employeeName}-${new Date(emp.date).toDateString()}`;


      if (!countMap.has(uniqueKey)) {
        countMap.set(uniqueKey, emp.employeeName);
      }

    })

    const finalCount = {};
    for (let name of countMap.values()) {
      finalCount[name] = (finalCount[name] || 0) + 1;
    }

    return finalCount;
  }, [myAttendance]);



  return (
    <div>
      attendance
      <div className="flex text-black justify-center gap-4 mb-6">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded"
          onClick={() => handleModalOpen("doctor")}
        >
          Add attendance
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add attendance</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-black">
                  <label className="block mb-1">Select your email</label>
                  <select
                    name="email"
                    value={attendance.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2 text-black"
                  >
                    <option value="">choose your email</option>
                    {Array.isArray(employees) &&
                      employees.map((emp) => (
                        <option key={emp._id} value={emp.email}>
                          {emp.email}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 bg-white text-black shadow-md rounded-md">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            {error && <p className="text-red-500">{error}</p>}
            <tr className="border-b">
              <th className="p-4 text-sm text-gray-600">Name</th>
              <th className="p-4 text-sm text-gray-600">Job Role</th>
              <th className="p-4 text-sm text-gray-600">Job Type</th>
              <th className="p-4 text-sm text-gray-600">Check-In Time</th>
              <th className="p-4 text-sm text-gray-600">Date</th>
              <th className="p-4 text-sm text-gray-600">Payroll</th>
              <th className="p-4 text-left">Days Present</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(myAttendance) && myAttendance.length > 0 ? (
              myAttendance.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm flex items-center space-x-1">
                    <img
                      src={
                        emp.picture || `https://i.pravatar.cc/30?img=${index}`
                      }
                      alt="Employee"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{emp.employeeName}</span>
                  </td>
                  {/* <td className="p-4 text-sm">{emp.employeeId?.firstname} {emp.employeeId?.lastname}</td> */}
                  <td className="p-4 text-sm">{emp.employeeId?.jobRole}</td>
                  <td className="p-4 text-sm">{emp.employeeId?.jobType}</td>
                  <td className="p-4 text-sm text-blue-800">{emp.time}</td>
                  <td className="p-4 text-sm text-blue-800">{new Date(emp.date).toLocaleDateString()}</td>


                  <td className="p-4 text-sm">
                    <button className="text-gray-500">
                      {emp.status === "Unpaid" ? (
                        <span className="text-red-500">Unpaid</span>
                      ) : (
                        <span className="text-green-500">Paid</span>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-sm font-bold">
                {attendanceCount[emp.employeeName] || 0}
              </td>
                </tr>
              ))
            ) : (
              <h3>No Attendance yet</h3>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Departments = () => {
  const [employee, setEmployee] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [groupedByDepartment, setGroupedByDepartment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  //get my staff
  useEffect(() => {
    const handleGetMystaffs = async () => {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(response.data);
        console.log(response.data);
        toast.success("successfully fetched");

        const uniqueJobRoles = [
          ...new Set(response.data.map((emp) => emp.jobRole)),
        ];
        setJobRoles(uniqueJobRoles);
        const unqiueDepartments = [
          ...new Set(response.data.map((dep) => dep.department)),
        ];
        setDepartments(unqiueDepartments);

        const grouped = response.data.reduce((acc, employee) => {
          const { department } = employee;
          if (!acc[department]) {
            acc[department] = [];
          }
          acc[department].push(employee);
          return acc;
        }, {});
        setGroupedByDepartment(grouped);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error(" couldnt get your staffs due to an error occured");
      }
    };
    handleGetMystaffs();
  }, []);

  return (
    <>
      <div className="text-black">
        <h3>Departments ({departments.length})</h3>
        <ul className="flex space-x-4 text-green-600">
          {departments.map((department, index) => (
            <li key={index}>{department}</li>
          ))}
        </ul>

        <div className="bg-gray-100 min-h-screen p-4 md:p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              All Departments
            </h1>
            <p className="text-gray-500">All Departments Information</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(groupedByDepartment).map(([dept, members]) => (
              <div
                key={dept}
                className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  {dept} ({members.length} Members)
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {dept.name}
                  </h2>
                  <button className="text-blue-500 hover:underline">
                    View All
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {dept.members} Members
                </p>
                <ul>
                  {Array.isArray(members) &&
                    members?.map((emp, index) => (
                      <li
                        key={emp.id}
                        className="flex items-center space-x-3 py-2 border-b last:border-b-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100">
                          <img
                            src={
                              emp.picture ||
                              `https://i.pravatar.cc/30?img=${index}`
                            }
                            alt="Employee"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>

                        <div>
                          <p className="text-gray-800 font-medium text-sm">
                            {emp.firstname} {emp.lastname}
                          </p>
                          <p className="text-gray-500 text-xs">{emp.jobRole}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Leave = () => {
  return <div>leave</div>;
};

const Jobs = () => {
  const [employee, setEmployee] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [groupedByDepartment, setGroupedByDepartment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  //get my staff
  useEffect(() => {
    const handleGetMystaffs = async () => {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_HRMS}/getmystaffs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(response.data);
        console.log(response.data);
        toast.success("successfully fetched");

        const grouped = response.data.reduce((acc, employee) => {
          const { jobType } = employee;
          if (!acc[jobType]) {
            acc[jobType] = [];
          }
          acc[jobType].push(employee);
          return acc;
        }, {});
        setGroupedByDepartment(grouped);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error("couldnt get your staffs due to an error occured");
      }
    };
    handleGetMystaffs();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Job Types</h1>
          <p className="text-gray-500">All Job Types Information</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedByDepartment).map(([dept, members]) => (
            <div
              key={dept}
              className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
                {dept} ({members.length} Members)
              </h2>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {dept.name}
                </h2>
                <button className="text-blue-500 hover:underline">
                  View All
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {dept.members} Members
              </p>
              <ul>
                {Array.isArray(members) &&
                  members?.map((emp, index) => (
                    <li
                      key={emp.id}
                      className="flex items-center space-x-3 py-2 border-b last:border-b-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100">
                        <img
                          src={
                            emp.picture ||
                            `https://i.pravatar.cc/30?img=${index}`
                          }
                          alt="Employee"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>

                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          {emp.firstname} {emp.lastname}
                        </p>
                        <p className="text-gray-500 text-xs">{emp.jobType}</p>
                        <p className="text-gray-500 text-xs">{emp.jobRole}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const HRMSDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row h-screen">
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-purple-800 text-white p-2 rounded"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
        <aside
          className={`fixed top-0 left-0 h-full bg-gray-200 w-64 p-4  md:block ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
      transition-transform duration-300 md:translate-x-0 md:relative md:w-1/6`}
        >
          <div className="text-purple-600 font-bold text-2xl mb-6 ">HRMS</div>
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "dashboard"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("dashboard")}
                >
                  Dashboard
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "allemployees"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("allemployees")}
                >
                  All Employees
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "alldepartments"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("alldepartments")}
                >
                  All Departments
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "payroll"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("payroll")}
                >
                  Payroll
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "attendance"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("attendance")}
                >
                  Attendance
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "jobs"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("jobs")}
                >
                  Jobs
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "leave"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("leave")}
                >
                  Leave
                </button>
              </li>

              <li>
                <button
                  className={`text-purple-600 font-medium ${
                    activePage === "holidays"
                      ? "bg-purple-300 p-1 rounded-lg"
                      : "hover:bg-purple-500 rounded-lg"
                  }`}
                  onClick={() => setActivePage("holidays")}
                >
                  Holidays
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="bg-gray-100 flex-1 p-5">
          <Routes>
            <Route
              path="*"
              element={
                activePage === "dashboard" ? (
                  <Dashboard />
                ) : activePage === "attendance" ? (
                  <Attendance />
                ) : activePage === "jobs" ? (
                  <Jobs />
                ) : activePage === "holidays" ? (
                  <Holiday />
                ) : activePage === "alldepartments" ? (
                  <Departments />
                ) : activePage === "allemployees" ? (
                  <AllEmployees />
                ) : activePage === "payroll" ? (
                  <Payroll />
                ) : (
                  <Leave />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default HRMSDashboard;
