// RealTimeNotifications.jsx
import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-3">Notifications</h4>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li key={index} className="bg-white p-3 rounded shadow">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeNotifications;
