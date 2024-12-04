import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDashboard = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({
    sickness: '',
    dateStarted: '',
    medication: '',
    appointmentDate: '',
    specialization: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/patient/${patientId}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleFormChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post('/api/patient/appointments', {
        ...appointmentForm,
        patientId,
      });
      console.log(response.data.message);
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Book Appointment</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="sickness"
            placeholder="Sickness"
            value={appointmentForm.sickness}
            onChange={handleFormChange}
            className="w-full border p-2"
          />
          <input
            type="date"
            name="dateStarted"
            value={appointmentForm.dateStarted}
            onChange={handleFormChange}
            className="w-full border p-2"
          />
          <input
            type="text"
            name="medication"
            placeholder="Medication"
            value={appointmentForm.medication}
            onChange={handleFormChange}
            className="w-full border p-2"
          />
          <input
            type="date"
            name="appointmentDate"
            value={appointmentForm.appointmentDate}
            onChange={handleFormChange}
            className="w-full border p-2"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Doctor Specialization"
            value={appointmentForm.specialization}
            onChange={handleFormChange}
            className="w-full border p-2"
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Your Appointments</h2>
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="border p-4 rounded-lg">
              <p><strong>Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;
