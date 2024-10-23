// frontend/src/components/PatientProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientProfile = () => {
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/patients/dashboard', {
        headers: { 'x-auth-token': token }
      });
      setPatient(res.data.patient);
      setAppointments(res.data.appointments);
    };
    fetchPatientProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
      <p><strong>Name:</strong> {patient.fullname}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      {/* Other profile details */}
      <h3 className="text-xl mt-6 mb-2">Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id} className="border p-2 mb-2">
            <p>Doctor: {appt.doctorId.fullname}</p>
            <p>Sickness: {appt.sickness}</p>
            <p>Appointment Date: {appt.appointmentDate}</p>
            {/* Add more details if necessary */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientProfile;
