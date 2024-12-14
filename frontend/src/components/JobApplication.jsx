import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState('');
  const [amount, setAmount] = useState('');
  const [pastWorkLink, setPastWorkLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `/api/jobs/apply/${jobId}`,
        { proposal, amount, pastWorkLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully');
      navigate('/job-search');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Error applying for the job');
    } finally {
      setLoading(false);
    }
  };

  if (!jobDetails) return <div>Loading...</div>;

  return (
    <div className="job-application-form">
      <h2>Apply for Job: {jobDetails.title}</h2>
      <textarea
        placeholder="Write your proposal here..."
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        className="w-full p-2 border mt-4"
      />
      <input
        type="number"
        placeholder="Amount you will charge"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border mt-4"
      />
      <input
        type="url"
        placeholder="Link to past work (if any)"
        value={pastWorkLink}
        onChange={(e) => setPastWorkLink(e.target.value)}
        className="w-full p-2 border mt-4"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  );
};

export default JobApplication;
