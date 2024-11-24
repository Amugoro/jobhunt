import  { useEffect, useState } from 'react';
import axios from 'axios';

const JobInvitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://app.jwskilledhunt.org/api/jobs/invitations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvitations(response.data);
    };
    fetchInvitations();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Invitations</h2>
      {invitations.map((invitation) => (
        <div key={invitation._id} className="bg-green-100 p-4 mb-4 rounded-lg shadow">
          <h3>{invitation.title}</h3>
          <p>{invitation.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobInvitations;
