import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            to="/route3"
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

const PopModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Trigger link to open the modal */}
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        className="text-blue-500 underline"
      >
        Open Modal
      </Link>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PopModal;
