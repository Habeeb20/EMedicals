import React from "react";
import Navbar from "../../components/Navbar";

const LabPatientDetails= () => {
  // Mock data for appointments
  const appointments = [
    { title: "General Checkup", date: "08-09-2023", status: "Completed" },
    { title: "Malaria Treatment", date: "08-09-2023", status: "Completed" },
    { title: "General Checkup", date: "08-09-2023", status: "Completed" },
  ];

  return (
   <>
   <Navbar />
     <div className="min-h-screen bg-gray-100 flex flex-col justify-between relative">
      {/* Header */}
      <div className="bg-green-900 text-white rounded-b-3xl p-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h1 className="text-xl font-semibold">Kunal Mishra</h1>
              <p className="text-sm text-gray-300">918498493878</p>
              <p className="text-sm text-gray-300">33, male</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">
              Total Bill: <span className="font-bold">2400</span>
            </p>
            <p className="text-sm">
              Paid: <span className="font-bold">2400</span>
            </p>
            <p className="text-sm">
              Pending: <span className="font-bold">2400</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b text-gray-400 font-medium text-sm mt-2">
        <button className="py-2">Treatments</button>
        <button className="py-2">Payments</button>
        <button className="py-2">Prostho</button>
        <button className="py-2 text-green-900 border-b-2 border-green-900">
          Appointments
        </button>
      </div>

      {/* Appointments */}
      <div className="p-4">
        <h2 className="text-green-900 text-lg font-semibold mb-3">
          Appointments
        </h2>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-md flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  {/* Replace icon path */}
                  <img
                    src="https://via.placeholder.com/20"
                    alt="Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-green-900 font-semibold">
                    {appointment.title}
                  </p>
                  <p className="text-sm text-green-500">{appointment.status}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{appointment.date}</p>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button className="bg-green-900 text-white rounded-full w-12 h-12 flex items-center justify-center fixed bottom-20 right-6 shadow-lg">
          +
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center text-gray-500">
        <div className="flex flex-col items-center">
          <i className="fas fa-home"></i>
          <p className="text-xs">Home</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-folder"></i>
          <p className="text-xs">OPD</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-calendar"></i>
          <p className="text-xs">Appointments</p>
        </div>
        <div className="flex flex-col items-center text-green-900">
          <i className="fas fa-user-circle"></i>
          <p className="text-xs">Patients</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-flask"></i>
          <p className="text-xs">Lab Work</p>
        </div>
      </div>
    </div>
   </>
  );
};

export default LabPatientDetails;
