import React from 'react';

const AppointmentCard = ({ name, illness, time, days }) => {
  return (
    <div className="bg-white text-black rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{illness}</p>
      <div className="flex justify-between mt-2">
        <p>{days}</p>
        <p>{time}</p>
      </div>
      <button className="bg-blue-600 text-white mt-4 p-2 w-full rounded-md">
        View Appointment
      </button>
    </div>
  );
};

export default AppointmentCard;
