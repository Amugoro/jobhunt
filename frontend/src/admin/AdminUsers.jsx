import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch users based on filter
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        params: filter ? { role: filter } : {}, // Add filter if specified
      });
      setUsers(data.users);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  // Fetch specific user details
  const fetchUserDetails = async (userId) => {
    try {
      const { data } = await axios.get(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setSelectedUser(data.user);
    } catch (err) {
      setError('Failed to fetch user details');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]); // Refetch users when the filter changes

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700">
          Filter by Category:
        </label>
        <select
          id="roleFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 block w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none"
        >
          <option value="">All Users</option>
          <option value="client">Clients</option>
          <option value="freelancer">Freelancers</option>
          <option value="tradeperson">Tradepersons</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.role}</p>
            <button
              onClick={() => fetchUserDetails(user._id)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded hover:bg-indigo-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-8 p-6 bg-white rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <p><strong>Name:</strong> {selectedUser.fullName}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
          <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
