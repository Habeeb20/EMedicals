import React from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const notificationsData = [
  { id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago' },
  { id: 2, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago' },
  { id: 3, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago' },
  { id: 4, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago' },
  { id: 5, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago' },
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex items-center space-x-4">
          <button className="text-blue-600">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-blue-700">Notifications</h1>
        </div>
        <button className="text-gray-400 text-sm">Edit Profile</button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {notificationsData.map((notification) => (
          <NotificationCard key={notification.id} message={notification.message} time={notification.time} />
        ))}
      </div>
    </div>
  );
};

const NotificationCard = ({ message, time }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <FaUserCircle size={28} />
        </div>
        {/* Notification Message */}
        <div>
          <p className="text-gray-700 font-semibold">{message}</p>
          <p className="text-gray-400 text-sm">{time}</p>
        </div>
      </div>
      {/* Unread Indicator */}
      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
        2
      </div>
    </div>
  );
};

export default Notifications;
