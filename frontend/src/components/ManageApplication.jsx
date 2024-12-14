import { useEffect, useState } from 'react';
import { fetchApplications } from '../utils/api';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      const { success, jobs, message } = await fetchApplications();
      setLoading(false);

      if (success) {
        setApplications(jobs);
      } else {
        setError(message); 
        alert(message);
      }
    };
    getApplications();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      {loading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p className="text-red-500">{error}</p> 
      ) : (
        applications.map((app) => (
          <div key={app._id} className="bg-yellow-100 p-4 mb-4 rounded-lg shadow">
            <h3>{app.title}</h3>
            <p>{app.description}</p>
            <span>{app.status}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageApplications;
