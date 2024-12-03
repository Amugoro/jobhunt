import React, { useState } from 'react';
import axios from 'axios';

const AdminCreateSubadmin = () => {
  const [subadminInfo, setSubadminInfo] = useState({
    fullName: '',
    email: '',
    permissions: {
      viewUsers: false,
      deleteUsers: false,
      viewJobs: true,
      createJobs: true,
      deleteJobs: true,
    },
  });
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState(null);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setSubadminInfo({
      ...subadminInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input changes for permissions
  const handlePermissionsChange = (e) => {
    setSubadminInfo({
      ...subadminInfo,
      permissions: {
        ...subadminInfo.permissions,
        [e.target.name]: e.target.checked,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send request to backend
      const { data } = await axios.post('/api/admin/subadmin/generate', {
        fullName: subadminInfo.fullName,
        email: subadminInfo.email,
        permissions: subadminInfo.permissions,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      // Display generated credentials
      setCredentials(data.credentials);
      setMessage('Subadmin created successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error creating subadmin. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex-wrap">
      <h1 className="text-2xl font-bold mb-4">Create Subadmin</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={subadminInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="mb-2 p-2 w-full border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={subadminInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 w-full border border-gray-300 rounded"
        />

        <div className="mb-4">
          <h3 className="mb-2">Permissions</h3>
          <label className="block">
            <input
              type="checkbox"
              name="viewUsers"
              checked={subadminInfo.permissions.viewUsers}
              onChange={handlePermissionsChange}
              className="mr-2"
            />
            View Users
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="deleteUsers"
              checked={subadminInfo.permissions.deleteUsers}
              onChange={handlePermissionsChange}
              className="mr-2"
            />
            Delete Users
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="viewJobs"
              checked={subadminInfo.permissions.viewJobs}
              onChange={handlePermissionsChange}
              className="mr-2"
            />
            View Jobs
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="createJobs"
              checked={subadminInfo.permissions.createJobs}
              onChange={handlePermissionsChange}
              className="mr-2"
            />
            Create Jobs
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="deleteJobs"
              checked={subadminInfo.permissions.deleteJobs}
              onChange={handlePermissionsChange}
              className="mr-2"
            />
            Delete Jobs
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Create Subadmin
        </button>
      </form>

      {credentials && (
        <div className="mt-4 bg-white p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Subadmin Credentials</h2>
          <p><strong>Username:</strong> {credentials.username}</p>
          <p><strong>Password:</strong> {credentials.password}</p>
        </div>
      )}
    </div>
  );
};

export default AdminCreateSubadmin;
