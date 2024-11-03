// client/src/pages/PatientDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: appointmentsData } = await axios.get('/api/patient/appointments', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAppointments(appointmentsData);
            setNotifications(appointmentsData.flatMap(app => app.notifications));
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Notifications</h3>
                {notifications.map((note, index) => (
                    <div key={index} className="border p-3 mb-2 bg-blue-100">
                        <p>{note.message}</p>
                        <p className="text-xs text-gray-600">{new Date(note.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Appointments</h3>
                {appointments.map((app) => (
                    <div key={app._id} className="border p-3 mb-2">
                        <p>Doctor: {app.doctorId.name}</p>
                        <p>Status: {app.status}</p>
                        {app.medicalReport && (
                            <div className="bg-gray-200 p-2 mt-2 rounded">
                                <h4 className="font-semibold">Medical Report:</h4>
                                <p>{app.medicalReport}</p>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default PatientDashboard;
























// import React, { useState, useEffect } from 'react';
// import socket from '../services/socket';

// export default function PatientDashboard() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     socket.on('notification', (notification) => {
//       setNotifications((prev) => [...prev, notification]);
//     });

//     return () => {
//       socket.off('notification');
//     };
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-4">Patient Dashboard</h2>
//       <div className="bg-white shadow rounded p-4 mb-6">
//         <h3 className="text-xl font-semibold">Book Appointment</h3>
//         {/* Appointment booking form */}
//       </div>
//       <div className="bg-white shadow rounded p-4">
//         <h3 className="text-xl font-semibold">Notifications</h3>
//         <ul className="mt-4">
//           {notifications.map((note, index) => (
//             <li key={index} className="border-b p-2">
//               {note}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
