import React,  {useState} from 'react'
import { FaHospital, FaPrescriptionBottle, FaVials, FaBookDead, FaUserMd } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import im from "../assets/EMedicals/young-woman-doctor-white-coat-with-stethoscope-pointing-with-index-finger-side-with-serious-face-standing-orange-wall-removebg-preview 1.png"

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Choose an Option</h2>
        <div className="flex flex-col space-y-4">
          <Link
            to="/loginhospitaladmin"
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
          >
            Login as Admin
          </Link>
          <Link
            to="/logindoctordashboardhospital"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Login as Doctor
          </Link>
          <Link
            to="/loginnursehospital"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-center"
          >
            Login as Nurse
          </Link>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Modal2 = ({isOpenModal, onCloseModal}) => {
  if(!isOpenModal) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Choose an Option</h2>
        <div className="flex flex-col space-y-4">
          <Link
            to="/cemeterylogin" 
            onClick={ onCloseModal}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
          >
            Login as cemetary Admin
          </Link>
          <Link
            to="/mlogin"
            onClick={onCloseModal}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Login as mortician or mortuary owner
          </Link>
          <Link
            to="/undertakerlogin"
            onClick={onCloseModal}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-center"
          >
            Login as an undertaker 
          </Link>
        </div>
        <button
          onClick={onCloseModal}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
const AdminHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  return (
    <div>
      <main className="flex-1 p-6 text-black">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img 
             src={im}
              alt="User" 
              className="w-16 h-16 rounded-full border-2 border-blue-500" 
            />
            <div>
            <Link to="/signin">
          <button className='rounded-md bg-blue-500 text-white p-2'>
            Back
          </button>
          </Link>
              <h1 className="text-xl font-bold">Welcome!</h1>
              <p className="text-gray-500">How is it going today?</p>
            </div>
          </div>
          {/* Doctor Image */}
      
          <img 
            src={im}
            alt="Doctor" 
            className="hidden md:block rounded-lg " 
          />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            readOnly
        
            className="w-full p-4 pl-12 rounded-full shadow-md focus:outline-none border border-gray-300"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            
          </span>
        </div>

        {/* Grid Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link  to="#"
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        className="text-blue-500 underline">
        <div className="bg-blue-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaHospital className="text-4xl text-blue-500" />
            <div>
              <h3 className="text-xl font-bold text-none">Hospitals</h3>
              <p className="text-gray-500 text-none">login as a hospital personnel</p>
            </div>
          </div>
        </Link>
         
          
        <Link to='/medicalpharmacylogin'>
        <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaPrescriptionBottle className="text-4xl text-purple-500" />
            <div>
              <h3 className="text-xl font-bold">Pharmacy</h3>
              <p className="text-gray-500">login as a pharmacist</p>
            </div>
          </div>

        </Link>

          <Link to='/lablogin'>
          <div className="bg-teal-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaVials className="text-4xl text-teal-500" />
            <div>
              <h3 className="text-xl font-bold">Laboratory</h3>
              <p className="text-gray-500">login as a lab technician</p>
            </div>
          </div>

          </Link>

        

        
        <Link  to="#"
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen2(true);
        }}
        className="text-gray-500 underline">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaBookDead className="text-4xl text-gray-500" />
            <div>
              <h3 className="text-xl font-bold">Death Services</h3>
              <p className="text-gray-500">login as a morticians</p>
            </div>
          </div>

          </Link>

            <Link to='/doctorlogin'>
            <div className="bg-pink-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaUserMd className="text-4xl text-pink-500" />
            <div>
              <h3 className="text-xl font-bold">Doctors</h3>
              <p className="text-gray-500">login as a doctor</p>
            </div>
          </div>

            </Link>

            <Link to='/wellnesslogin'>
            <div className="bg-orange-100 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <FaUserMd className="text-4xl text-orange-500" />
            <div>
              <h3 className="text-xl font-bold">wellness centers</h3>
              <p className="text-gray-500">register your Gym center, spa etc</p>
            </div>
          </div>

            </Link>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Modal2 isOpenModal={isModalOpen2} onCloseModal={() => setIsModalOpen2(false)} />
         
        </div>
      </main>
      
    </div>
  )
}

export default AdminHome
