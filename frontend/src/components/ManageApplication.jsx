import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/jobs/my-applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    };
    fetchApplications();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      {applications.map((app) => (
        <div key={app._id} className="bg-yellow-100 p-4 mb-4 rounded-lg shadow">
          <h3>{app.title}</h3>
          <p>{app.description}</p>
          <span>{app.status}</span>
        </div>
      ))}
    </div>
  );
};

export default ManageApplications;
