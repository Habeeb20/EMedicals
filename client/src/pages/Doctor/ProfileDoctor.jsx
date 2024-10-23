import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileDoctor = () => {
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          throw new Error("Token is not found");
        }

        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_D}/doctorprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response.data);

        setDoctor(response.data.doctor);
        setAppointments(response.data.doctor.appointments || []);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setError('Unauthorized access, please login again');
          localStorage.removeItem('token');
          navigate('/doctorlogin');
        } else {
          console.log(err);
          setError('Failed to fetch profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center text-indigo-900">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-navy-800 mb-4">Doctor Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={doctor.profilePicture}
          alt={`${doctor.fullname}'s profile`}
          className="w-32 h-32 rounded-full border-4 border-navy-700 shadow-lg mb-4"
        />
      </div>
      <div className="space-y-2 text-navy-700">
        <p><strong>Name:</strong> {doctor.fullname}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>LGA:</strong> {doctor.LGA}</p>
        <p><strong>State:</strong> {doctor.state}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Office Address:</strong> {doctor.officeAddress}</p>
        <p><strong>Gender:</strong> {doctor.gender}</p>
        <p><strong>Current Workplace:</strong> {doctor.currentWorkplace}</p>
      </div>

      {/* Appointments Section */}
      <h3 className="text-2xl font-semibold text-navy-800 mt-6 mb-2">Appointments</h3>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <ul className="mt-2">
          {appointments.map((appt) => (
            <li key={appt._id} className="border border-navy-300 bg-navy-50 p-4 rounded-lg mb-2 shadow-md">
              <p><strong>Patient:</strong> {appt.patientId?.fullname}</p>
              <p><strong>Sickness:</strong> {appt.sickness}</p>
              <p><strong>Appointment Date:</strong> {new Date(appt.appointmentDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileDoctor;
