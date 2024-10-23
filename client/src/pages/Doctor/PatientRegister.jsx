// frontend/src/components/PatientRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    state: '',
    homeAddress: '',
    LGA: '',
    allergics: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/patients/register', formData);
      alert('Patient registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to register patient');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register as Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullname" onChange={handleChange} placeholder="Full Name" className="input" />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="input" />
        <input type="text" name="phoneNumber" onChange={handleChange} placeholder="Phone Number" className="input" />
        <input type="text" name="state" onChange={handleChange} placeholder="State" className="input" />
        <input type="text" name="homeAddress" onChange={handleChange} placeholder="Home Address" className="input" />
        <input type="text" name="LGA" onChange={handleChange} placeholder="LGA" className="input" />
        <textarea name="allergics" onChange={handleChange} placeholder="Allergics" className="input"></textarea>
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default PatientRegister;
