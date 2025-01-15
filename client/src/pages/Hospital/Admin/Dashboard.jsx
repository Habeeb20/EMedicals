// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [nurses, setNurses] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [formData, setFormData] = useState({ name: "", specialty: "" });

//   const fetchData = async () => {
//     try {
//       const doctorRes = await axios.get("http://localhost:5000/api/doctors");
//       const nurseRes = await axios.get("http://localhost:5000/api/nurses");
//       const patientRes = await axios.get("http://localhost:5000/api/patients");
//       setDoctors(doctorRes.data);
//       setNurses(nurseRes.data);
//       setPatients(patientRes.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/doctors", formData);
//       fetchData();
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-3 gap-6">
//         {/* Doctors Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Doctors</h2>
//           <ul className="bg-white shadow p-4 rounded">
//             {doctors.map((doc) => (
//               <li key={doc._id} className="border-b py-2">
//                 {doc.name} - {doc.specialty}
//               </li>
//             ))}
//           </ul>
//           <form className="mt-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Doctor Name"
//               className="border p-2 rounded w-full mb-2"
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="specialty"
//               placeholder="Specialty"
//               className="border p-2 rounded w-full mb-2"
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Doctor
//             </button>
//           </form>
//         </div>

//         {/* Nurses Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Nurses</h2>
//           <ul className="bg-white shadow p-4 rounded">
//             {nurses.map((nurse) => (
//               <li key={nurse._id} className="border-b py-2">
//                 {nurse.name} - {nurse.department}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Patients Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Patients</h2>
//           <ul className="bg-white shadow p-4 rounded">
//             {patients.map((patient) => (
//               <li key={patient._id} className="border-b py-2">
//                 {patient.name} - {patient.condition}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { useUserActions } from "../context/AuthContext";

// const AdminDashboard = () => {
//   const { fetchUsers, addUser, updateUser, deleteUser } = useUserActions();
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "" });

//   useEffect(() => {
//     fetchUsers().then(setUsers);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await addUser(formData);
//     fetchUsers().then(setUsers);
//     setFormData({ name: "", email: "", role: "", password: "" });
//   };

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers().then(setUsers);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <form onSubmit={handleSubmit} className="mb-6 space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <select
//           value={formData.role}
//           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           className="border p-2 w-full"
//         >
//           <option value="">Select Role</option>
//           <option value="Doctor">Doctor</option>
//           <option value="Nurse">Nurse</option>
//           <option value="Patient">Patient</option>
//         </select>
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//           Add User
//         </button>
//       </form>
//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Role</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">{user.role}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(user._id)}
//                   className="bg-red-500 text-white py-1 px-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
