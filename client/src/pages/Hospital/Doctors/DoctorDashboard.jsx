import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/doctor/${doctorId}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleUpdateStatus = async (appointmentId, status, rescheduleInfo = null) => {
    try {
      const response = await axios.patch(`/api/doctor/appointments/${appointmentId}`, {
        status,
        rescheduleInfo,
      });
      setActionMessage(response.data.message);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <p className="text-green-500">{actionMessage}</p>

      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="border p-4 rounded-lg">
            <p><strong>Patient:</strong> {appointment.patientName}</p>
            <p><strong>Reason:</strong> {appointment.sickness}</p>
            <p><strong>Date:</strong> {appointment.appointmentDate}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdateStatus(appointment._id, 'accepted')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdateStatus(appointment._id, 'rejected')}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  handleUpdateStatus(appointment._id, 'rescheduled', {
                    newDate: '2024-12-01',
                    newTime: '10:00 AM',
                  })
                }
              >
                Reschedule
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
