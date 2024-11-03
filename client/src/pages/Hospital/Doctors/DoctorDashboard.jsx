// client/src/pages/DoctorDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/doctor/appointments', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAppointments(data);
        };
        fetchData();
    }, []);

    const handleStatusChange = async (appointmentId, status) => {
        await axios.put(`/api/doctor/appointments/${appointmentId}/status`, { status }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAppointments(appointments.map(app => app._id === appointmentId ? { ...app, status } : app));
    };

    const handleReportSubmit = async (appointmentId, report) => {
        await axios.put(`/api/doctor/appointments/${appointmentId}/report`, { medicalReport: report }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
            {appointments.map(app => (
                <div key={app._id} className="border p-4 mb-4 rounded bg-gray-100">
                    <p>Patient: {app.patientId.name}</p>
                    <p>Status: {app.status}</p>
                    <button onClick={() => handleStatusChange(app._id, 'accepted')} className="btn btn-primary">Accept</button>
                    <button onClick={() => handleStatusChange(app._id, 'rejected')} className="btn btn-secondary">Reject</button>
                    <textarea placeholder="Enter medical report" onBlur={(e) => handleReportSubmit(app._id, e.target.value)} className="w-full p-2 mt-2 rounded border"></textarea>
                </div>
            ))}
        </div>
    );
};

export default DoctorDashboard;
