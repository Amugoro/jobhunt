import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubadminDashboard = () => {
  const [message, setMessage] = useState('');

  const checkPermission = async () => {
    try {
      const { data } = await axios.get('/api/subadmin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('subadminToken')}`,
        },
      });
      setMessage(data.message);
    } catch (err) {
      setMessage('Permission denied: You cannot view or delete users');
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Subadmin Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default SubadminDashboard;
