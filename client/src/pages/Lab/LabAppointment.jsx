// import Navbar from "../../components/Navbar";

// const LabDashboard = () => {
//     return (
//         <>
//         <Navbar />
//              <div className="bg-green-900 text-white min-h-screen p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <img
//               src="/path/to/avatar.jpg"
//               alt="Avatar"
//               className="w-10 h-10 rounded-full mr-2"
//             />
//             <div>
//               <p className="text-lg font-bold">Hi Rajesh!</p>
//               <p>Welcome back</p>
//             </div>
//           </div>
//           <button className="text-white">&#8942;</button>
//         </div>
  
//         {/* Profile Card */}
//         <div className="bg-gray-100 text-black rounded-lg p-4 mt-4">
//           <div className="flex items-center">
//             <img
//               src="/path/to/patient.jpg"
//               alt="Patient"
//               className="w-16 h-16 rounded-full mr-4"
//             />
//             <div>
//               <p className="text-lg font-bold">Olusola Thompson</p>
//               <p className="text-sm text-gray-600">800m away</p>
//               <div className="text-green-700 font-semibold flex items-center">
//                 <span className="mr-1">&#9733;</span> 4.7
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex space-x-2">
//               {['HIV', 'Blood test', 'Hepatitis', 'Eye', 'Infection'].map((tag, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-gray-200 text-green-900 px-2 py-1 rounded-full text-xs font-medium"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//             <button className="text-gray-600 text-xl">&#128214;</button>
//           </div>
//         </div>
  
//         {/* Medical History */}
//         <div className="mt-4">
//           <h2 className="text-xl font-bold text-white">Medical History</h2>
//           <div className="flex space-x-2 mt-2">
//             {['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25', 'Sat 26'].map(
//               (day, idx) => (
//                 <button
//                   key={idx}
//                   className={`px-4 py-2 rounded-md font-semibold ${
//                     day.includes('Wed') ? 'bg-white text-green-900' : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {day}
//                 </button>
//               )
//             )}
//           </div>
//         </div>
  
//         {/* Hospitals */}
//         <div className="mt-6">
//           <h2 className="text-xl font-bold text-white">Hospitals</h2>
//           <div className="mt-4 space-y-4">
//             {[
//               { name: 'God is Able', id: '345321231' },
//               { name: 'Floyd Miles', id: '987890345' },
//               { name: 'Cody Fisher', id: '453367122' },
//               { name: 'Dianne Russell', id: '345321231' },
//             ].map((hospital, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between items-center bg-gray-100 text-black p-4 rounded-lg"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src="/path/to/hospital.jpg"
//                     alt="Hospital"
//                     className="w-12 h-12 rounded-full mr-3"
//                   />
//                   <p className="font-bold text-lg">{hospital.name}</p>
//                 </div>
//                 <p className="text-gray-600 text-sm">{hospital.id}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//         </>
 
//     );
//   };
  
//   export default LabDashboard;
  





