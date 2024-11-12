// components/NotificationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get(`/api/notifications/${userId}`);
      setNotifications(res.data);
    };

    fetchNotifications();

    // Real-time updates with Socket.io
    // eslint-disable-next-line no-undef
    const socket = io('http://localhost:5000');
    socket.on('notify', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showBrowserNotification(notification.message);
    });

    return () => socket.disconnect();
  }, [userId]);

  const showBrowserNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('New Alert', { body: message });
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Notifications</h2>
      {notifications.map((notif, index) => (
        <div key={index} className="border-b py-2">
          <p className={notif.isRead ? 'text-gray-600' : 'text-black font-bold'}>
            {notif.message}
          </p>
          <small className="text-gray-400">{new Date(notif.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
