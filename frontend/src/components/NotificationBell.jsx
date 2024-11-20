import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://jobhunt-b23g.onrender.com', {
  auth: { token: localStorage.getItem('token') },
  transports: ['websocket', 'polling'],
});

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Listen for incoming notifications
  useEffect(() => {
    socket.on('receiveNotification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="material-icons text-gray-600">notifications</span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
          <ul>
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500">No notifications</li>
            ) : (
              notifications.map((notif, index) => (
                <li
                  key={index}
                  className="p-4 border-b border-gray-200 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {notif.content}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
