// import React from 'react';
// import { FaHospital, FaPrescriptionBottle, FaVials, FaBookDead, FaUserMd } from 'react-icons/fa'; 
// import im from '../assets/EMedicals/young-woman-doctor-white-coat-with-stethoscope-pointing-with-index-finger-side-with-serious-face-standing-orange-wall-removebg-preview 1.png'
// import Navbar from '../components/Navbar';
// export default function LandingPage() {
//   return (
//    <div>
//     <Navbar />
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="hidden md:block w-1/4 bg-white shadow-lg p-6">
//         <ul className="space-y-6">
//           <li className="text-blue-600 font-bold text-lg">
//             <a href="/hospital">Hospitals</a>
//           </li>
//           <li className="text-blue-600 font-bold text-lg">
//             <a href="/pharmacy">Pharmacy</a>
//           </li>
//           <li className="text-blue-600 font-bold text-lg">
//             <a href="/laboratory">Laboratory</a>
//           </li>
//           <li className="text-blue-600 font-bold text-lg">
//             <a href="/doctors">Doctors</a>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Profile Section */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <img 
//               src="https://via.placeholder.com/80" 
//               alt="User" 
//               className="w-16 h-16 rounded-full border-2 border-blue-500" 
//             />
//             <div>
//               <h1 className="text-xl font-bold">Welcome! Adewale</h1>
//               <p className="text-gray-500">How is it going today?</p>
//             </div>
//           </div>
//           {/* Doctor Image */}
//           <img 
//             src={im}
//             alt="Doctor" 
//             className="hidden md:block rounded-lg " 
//           />
//         </div>

//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search Hospital, Doctor..."
//             className="w-full p-4 pl-12 rounded-full shadow-md focus:outline-none border border-gray-300"
//           />
//           <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
//             🔍
//           </span>
//         </div>

//         {/* Grid Boxes */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-blue-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
//             <FaHospital className="text-4xl text-blue-500" />
//             <div>
//               <h3 className="text-xl font-bold">Hospitals</h3>
//               <p className="text-gray-500">Find healthcare centers</p>
//             </div>
//           </div>
          
//           <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
//             <FaPrescriptionBottle className="text-4xl text-purple-500" />
//             <div>
//               <h3 className="text-xl font-bold">Pharmacy</h3>
//               <p className="text-gray-500">Find nearby pharmacies</p>
//             </div>
//           </div>

//           <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
//             <FaVials className="text-4xl text-teal-500" />
//             <div>
//               <h3 className="text-xl font-bold">Laboratory</h3>
//               <p className="text-gray-500">Find test centers</p>
//             </div>
//           </div>

//           <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
//             <FaBookDead className="text-4xl text-gray-500" />
//             <div>
//               <h3 className="text-xl font-bold">Death Services</h3>
//               <p className="text-gray-500">Funeral services</p>
//             </div>
//           </div>

//           <div className="bg-pink-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
//             <FaUserMd className="text-4xl text-pink-500" />
//             <div>
//               <h3 className="text-xl font-bold">Doctors</h3>
//               <p className="text-gray-500">Find specialized doctors</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//    </div>
//   );
// }














import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import m from "../assets/EMedicals/dd.jpeg"
import m1 from "../assets/EMedicals/dddd.jpeg"
import m2 from "../assets/EMedicals/doc.jpeg"
import { Link } from 'react-router-dom';
import LPage from '../components/Landing/LPage';
import LPage2 from '../components/Landing/LPage2';

const LandingHome = () => {
  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true });
  const { ref: subTextRef, inView: subTextInView } = useInView({ triggerOnce: true });

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 font-sans">
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-blue-700">EMedicals</div>
        <div className="hidden md:flex space-x-6">
          <a href="/logintelemedicine" className="hover:text-blue-700">Telemedicine</a>
          <a href="#" className="hover:text-blue-700">Health Plans</a>
          {/* <a href="#" className="hover:text-blue-700">For Partners</a>
          <a href="#" className="hover:text-blue-700">Resources</a> */}
          <a href="#" className="hover:text-blue-700">About</a>
        </div>
        <Link to="/signin">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Sign In</button>

        </Link>
       
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10">
        {/* Text Section */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="w-full md:w-1/2"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Building Africa’s <span className="underline decoration-green-400">Digital Health Future</span>
          </h1>
          <p
            ref={subTextRef}
            className="text-lg text-gray-600"
            style={{ opacity: subTextInView ? 1 : 0, transition: 'opacity 1s' }}
          >
            EMedicals optimises healthcare delivery, ensuring quality care is accessible and affordable for everyone. Experience the future of healthcare today.
          </p>

          <div className="flex space-x-4 mt-6">

            <button className="flex items-center space-x-1 text-blue-700">
              <span>Learn More</span> <span className="text-xl">&rarr;</span>
            </button>
            <Link to="/signin">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg">Get Started – It’s free</button>

            </Link>
           
          </div>
        </motion.div>

        {/* Images Section */}
        <div className="relative w-full md:w-1/2 mt-10 md:mt-0">
          <motion.img
            src={m}
            alt="Doctor"
            className="absolute w-1/2 top-0 right-0 rounded-lg shadow-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.img
            src={m1}
            alt="Consultation"
            className="absolute w-2/5 bottom-0 left-0 rounded-lg shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </div>
      </section>
      <LPage />
      <LPage2 />

    
    </div>
  );
};

export default LandingHome;
