import React from 'react';

const PatientCard = ({ name, checkupType, amount, status }) => {
  return (
    <div className="bg-white text-black rounded-lg p-4 shadow-md mb-4">
      <div className="flex items-center mb-4">
        <img
          src="/profile.jpg"
          alt="patient"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p>{checkupType}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">Amount</p>
        <p>{amount}</p>
      </div>
      <div className="flex justify-between mt-2">
        <button className="bg-blue-600 text-white p-2 w-full rounded-md mr-2">
          Make Appointment
        </button>
        <button className="bg-blue-600 text-white p-2 w-full rounded-md">
          Add payment
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
