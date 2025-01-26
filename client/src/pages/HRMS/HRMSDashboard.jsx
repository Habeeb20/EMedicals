import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
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
        toast.success("successfully fetched");

        const uniqueJobRoles = [
          ...new Set(response.data.map((emp) => emp.jobRole)),
        ];
        setJobRoles(uniqueJobRoles);
        const unqiueDepartments = [
          ...new Set(response.data.map((dep) => dep.department)),
        ];
        setDepartments(unqiueDepartments);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error(" couldnt get your staffs due to an error occured");
      }
    };
    handleGetMystaffs();
  }, []);

  //count unique job roles and departments

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

          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h2 className="text-black text-sm"></h2>
            <p className="text-2xl font-bold">{employee.length}</p>
            <p className="text-black text-xs">Updated:</p>
          </div>
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
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border">
            <p>Attendance Chart Placeholder</p>
          </div>
        </section>
      </main>
    </div>
  );
};

const AllEmployees = () => {
    const [employee, setEmployee] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')


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
                <th className="p-4 text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
  {employee && employee.length > 0 ? (
    employee.map((emp, index) => (
      <tr key={index} className="border-b hover:bg-gray-50">
        <td className="p-4 text-sm">{emp.uniqueNumber}</td>
        <td className="p-4 text-sm flex items-center space-x-2">
          <img
            src={emp.picture || `https://i.pravatar.cc/30?img=${index}`}
            alt="Employee"
            className="w-8 h-8 rounded-full"
          />
          <span>
            {emp.firstname} {emp.lastname}
          </span>
        </td>
        <td className="p-4 text-sm">{emp.firstname}{emp.lastname}</td>
        <td className="p-4 text-sm">{emp.jobRole}</td>
        <td className="p-4 text-sm">{emp.jobType}</td>

        <td className="p-4 text-sm flex space-x-2">
          <Link to={`details/${emp._id}`}>
            <button className="text-gray-500">
              <span className="material-icons">View more</span>
            </button>
          </Link>

          <button className="text-purple-500">
            <span className="material-icons">edit</span>
          </button>
          <button className="text-red-500">
            <span className="material-icons">delete</span>
          </button>
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
            <div className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">4</button>
            </div>
          </div>
        </div>

    </>
 );
};

const Payroll = () => {
  return <div>payroll</div>;
};

const Holiday = () => {
  return <div>holiday</div>;
};

const Attendance = () => {
  return <div>attendance</div>;
};

const Departments = () => {
  const [employee, setEmployee] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [groupedByDepartment, setGroupedByDepartment] = useState({})
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
            const{department} = employee
            if(!acc[department]){
                acc[department] = []
            }
            acc[department].push(employee);
            return acc
        }, {})
        setGroupedByDepartment(grouped)
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
        <h1 className="text-2xl font-bold text-gray-800">All Departments</h1>
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
              <button className="text-blue-500 hover:underline">View All</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{dept.members} Members</p>
            <ul>
              {Array.isArray(members) && members?.map((emp) => (
                <li
                  key={emp.id}
                  className="flex items-center space-x-3 py-2 border-b last:border-b-0"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  
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
  const [jobType, setJobType] = useState([])
  const [groupedByDepartment, setGroupedByDepartment] = useState({})
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
            const{jobType} = employee
            if(!acc[jobType]){
                acc[jobType] = []
            }
            acc[jobType].push(employee);
            return acc
        }, {})
        setGroupedByDepartment(grouped)
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error(" couldnt get your staffs due to an error occured");
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
              <button className="text-blue-500 hover:underline">View All</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{dept.members} Members</p>
            <ul>
              {Array.isArray(members) && members?.map((emp) => (
                <li
                  key={emp.id}
                  className="flex items-center space-x-3 py-2 border-b last:border-b-0"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
                      : "hover:bg-purple-700"
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
