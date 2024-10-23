// frontend/src/components/BookAppointment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    sickness: '',
    started: '',
    drugsTaken: ''
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors
    axios.get('http://localhost:5000/api/doctors').then(res => {
      setDoctors(res.data);
    }).catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', formData);
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="doctorId" onChange={handleChange} className="input">
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.fullname}</option>
          ))}
        </select>
        <textarea name="sickness" onChange={handleChange} placeholder="Describe your sickness" className="input"></textarea>
        <input type="date" name="started" onChange={handleChange} className="input" />
        <textarea name="drugsTaken" onChange={handleChange} placeholder="Any drugs taken?" className="input"></textarea>
        <button type="submit" className="btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
