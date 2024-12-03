import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminUsers from './AdminUsers';
import AdminCreateSubadmin from './AdminCreateSubadmin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [flaggedJobs, setFlaggedJobs] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Example: token stored in localStorage
        if (!token) {
          throw new Error('No token found');
        }

        // Verify token with API
        const { data } = await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/admin-login'); 
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
      fetchJobs();
      fetchFlaggedJobs();
      fetchDashboardStats();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get('/api/admin/jobs');
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFlaggedJobs = async () => {
    try {
      const { data } = await axios.get('/api/admin/jobs/flagged');
      setFlaggedJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      setDashboardStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return null; // Optionally, add a loading spinner here
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold">Users</h2>
          <AdminUsers />
          <p>Total: {dashboardStats.users || users.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold">Jobs</h2>
          <p>Total: {dashboardStats.jobs || jobs.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold">Flagged Jobs</h2>
          <p>Total: {dashboardStats.flaggedJobs || flaggedJobs.length}</p>
        </div>
      </div>

      {/* Users List */}
      <h2 className="text-xl md:text-2xl font-bold mb-4">Users</h2>
      <ul className="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        {users.map((user) => (
          <li key={user._id} className="border-b py-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      {/* Jobs List */}
      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Jobs</h2>
      <ul className="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        {jobs.map((job) => (
          <li key={job._id} className="border-b py-2">
            {job.title}
          </li>
        ))}
      </ul>

      {/* Flagged Jobs List */}
      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Flagged Jobs</h2>
      <ul className="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        {flaggedJobs.map((job) => (
          <li key={job._id} className="border-b py-2">
            {job.title}
          </li>
        ))}
      </ul>

      {/* Subadmin Creation */}
      <div className="mt-8">
        <AdminCreateSubadmin />
      </div>
    </div>
  );
};

export default AdminDashboard;
