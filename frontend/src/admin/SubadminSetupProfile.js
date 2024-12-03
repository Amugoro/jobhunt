import React, { useState } from 'react';
import axios from 'axios';

const SubadminSetupProfile = () => {
  const [formData, setFormData] = useState({ fullName: '', newPassword: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subadmin/profile/setup', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('subadminToken')}` },
      });
      setSuccessMessage('Profile setup successfully!');
    } catch (err) {
      setError('Failed to set up profile');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Set Up Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Set Up</button>
      </form>
    </div>
  );
};

export default SubadminSetupProfile;
