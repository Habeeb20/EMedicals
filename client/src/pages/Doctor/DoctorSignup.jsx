import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import im from "../../assets/EMedicals/floatingLogo.png"
const specializations = [
  'General Practitioner',
  'Pediatrician',
  'Surgeon',
  'Cardiologist',
  'Dermatologist',
  'Gynecologist',
  'Psychiatrist',
  'Ophthalmologist',
  'Orthopedic',
  'ENT Specialist',
  "nurosurgeon",
  "family doctor"

];

const states = [
  { name: 'Abia', lgas: ['Aba North', 'Aba South', 'Umuahia North', 'Umuahia South'] },
  { name: 'Adamawa', lgas: ['Yola North', 'Yola South', 'Ganye', 'Mubi North'] },
  { name: 'Akwa Ibom', lgas: ['Uyo', 'Ikot Ekpene', 'Abak', 'Eket'] },
  { name: 'Anambra', lgas: ['Awka North', 'Awka South', 'Onitsha North', 'Onitsha South'] },

  { name: 'Zamfara', lgas: ['Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum'] },
];

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    password: '',
    state: '',
    LGA: '',
    address: '',
    specialization: '',
    licenseNumber: '',
    qualifications: '',
    medicalCertificate: null,
    medicalSchool: '',
    yearsOfExperience: '',
    currentWorkplace: '',
    profilePicture: null,
    uniqueNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      LGA: '', // Reset LGA when state changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const res = await axios.post(`${import.meta.env.VITE_API_D}/doctorsignup`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data) {
        navigate('/doctorverifyemail');
        toast.success('Successfully registered');
        console.log('Form submitted:', res.data);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err.response?.data?.message || 'A network error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Doctor Signup</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Date of Birth */}
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {/* Phone Number */}
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* State */}
          <select
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {/* Local Government Area (LGA) */}
          <select
            name="LGA"
            value={formData.LGA}
            onChange={handleChange}
            required={!!formData.state}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select LGA</option>
            {formData.state &&
              states
                .find((state) => state.name === formData.state)
                .lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
          </select>
          {/* Address */}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Specialization */}
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {/* License Number */}
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
            placeholder="License Number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Qualifications */}
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
            placeholder="Qualifications"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Medical Certificate */}
          <label>medical Certificate</label>
          <input
            type="file"
            name="medicalCertificate"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Medical School */}
          <input
            type="text"
            name="medicalSchool"
            value={formData.medicalSchool}
            onChange={handleChange}
            required
            placeholder="Medical School"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Years of Experience */}
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
            placeholder="Years of Experience"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Current Workplace */}
          <input
            type="text"
            name="currentWorkplace"
            value={formData.currentWorkplace}
            onChange={handleChange}
            required
            placeholder="Current Workplace"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Profile Picture */}
          <label>profile picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
     
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
