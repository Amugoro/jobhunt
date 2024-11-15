import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch existing notifications from the server
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications/${userId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Initialize Socket.IO client
    const socket = io('http://jwskilledhunt.org/backend', {
      transports: ['websocket', 'polling'],
    });

    // Listen for new notifications
    socket.on('notify', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      showBrowserNotification(notification.message);
    });

    // Clean up on component unmount
    return () => socket.disconnect();
  }, [userId]);

  // Function to show browser notification
  const showBrowserNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('New Alert', { body: message });
    }
  };

  // Request browser notification permission on component mount
  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <div key={index} className="border-b py-2">
            <p className={notif.isRead ? 'text-gray-600' : 'text-black font-bold'}>
              {notif.message}
            </p>
            <small className="text-gray-400">{new Date(notif.createdAt).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationList;
