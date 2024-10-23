// frontend/src/components/AppointmentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ doctorId }) => {
  const [sickness, setSickness] = useState('');
  const [started, setStarted] = useState('');
  const [drugsTaken, setDrugsTaken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/appointments/book', {
        doctorId,
        sickness,
        started,
        drugsTaken,
      }, {
        headers: { 'x-auth-token': token }
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      alert('Error booking appointment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <textarea
        placeholder="Describe your sickness"
        className="w-full p-2 mb-4 border"
        value={sickness}
        onChange={(e) => setSickness(e.target.value)}
      ></textarea>
      <input
        type="date"
        placeholder="When did it start?"
        className="w-full p-2 mb-4 border"
        value={started}
        onChange={(e) => setStarted(e.target.value)}
      />
      <textarea
        placeholder="Drugs taken"
        className="w-full p-2 mb-4 border"
        value={drugsTaken}
        onChange={(e) => setDrugsTaken(e.target.value)}
      ></textarea>
      <button className="w-full bg-blue-500 text-white p-2" type="submit">Submit</button>
    </form>
  );
};

export default AppointmentForm;
