import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobPostForm from './JobPostForm';
import JobSearchFilters from '../pages/home/JobSearchFilters';
import { fetchAllJobs, getUserData } from '../utils/api';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [userRole, setUserRole] = useState(null); // Track user role
  const [selectedJob, setSelectedJob] = useState(null); // Selected job for application
  const [proposal, setProposal] = useState(''); // Proposal content
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserDetails();
    }
  }, [navigate]);

  const fetchUserDetails = async () => {
    const { success, user, message } = await getUserData();
    if (success) {
      setSkills(user.tradeSkills);
      setUserRole(user.role);
      fetchJobs(user.role); // Fetch jobs based on role
      fetchAppliedJobs();
    } else {
      alert(message);
    }
  };

  const applyForJob = async (jobId, proposalContent) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `/api/jobs/apply/${jobId}`,
        { proposal: proposalContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Applied successfully!');
      fetchAppliedJobs();
      setIsModalOpen(false); // Close modal after applying
      setProposal(''); // Reset proposal content
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const fetchAppliedJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/jobs/applied', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(response.data.map((job) => job._id));
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const fetchJobs = async (role) => {
    setLoading(true);
    try {
      const params = { category, location, search: searchQuery };
      const { success, jobs, message } = await fetchAllJobs(params);

      if (success) {
        // Role-specific filtering
        const filteredJobs = jobs.filter((job) => {
          if (role === 'freelancer') {
            return job.category === 'Tech'; // Freelancers see Tech jobs only
          } else if (role === 'tradeperson') {
            return job.category === 'Trade'; // Tradespeople see Trade jobs only
          }
          return true;
        });

        setJobs(filteredJobs);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPosted = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  useEffect(() => {
    if (userRole) {
      fetchJobs(userRole);
    }
  }, [category, location, skills, userRole]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle job application modal open
  const openApplyModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProposal('');
  };

  return (
    <div className="job-search-page">
      <JobSearchFilters setSearchQuery={setSearchQuery} />
      <h2 className="text-2xl font-bold mb-4">Job Search</h2>

      {/* Filters */}
      <div className="filters mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mr-4"
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Trade">Trade</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Location</option>
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Job Posting Form (Visible only to Clients) */}
      {userRole === 'client' && <JobPostForm onJobPosted={handleJobPosted} />}

      {/* Job Listings */}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <div className="job-listings">
          {filteredJobs.length === 0 ? (
            <p>No jobs found that match your search and selected filters.</p>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-item border p-4 mb-4">
                <h3 className="font-semibold text-xl">{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.description}</p>
                <p>
                  <strong>Category:</strong> {job.category} | <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Skills Required:</strong> {job.skillsRequired.join(', ')}
                </p>
                {appliedJobs.includes(job._id) ? (
                  <button className="bg-gray-400 text-white p-2 rounded mt-2" disabled>
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => openApplyModal(job)}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                  >
                    Apply
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Apply Job Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="font-semibold text-xl">{selectedJob.title}</h3>
            <p>{selectedJob.company}</p>
            <p>{selectedJob.description}</p>
            <textarea
              className="w-full p-2 border mt-4"
              placeholder="Write your proposal here..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
            />
            <div className="mt-4">
              <button
                onClick={() => applyForJob(selectedJob._id, proposal)}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Submit Proposal
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
