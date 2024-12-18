import { useCallback, useState, useEffect } from 'react';
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
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      fetchUserDetails();
  }, []);

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

  const fetchJobs = useCallback(
    async (role) => {
      setLoading(true);
      try {
        const params = { category, location, search: searchQuery };
        const { success, jobs, message } = await fetchAllJobs(params);

        if (success) {
          const filteredJobs = jobs.filter((job) => {
            if (role === 'freelancer') {
              return job.category === 'Tech';
            } else if (role === 'tradeperson') {
              return job.category === 'Trade';
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
    },
    [category, location, searchQuery] // Dependencies that fetchJobs relies on
  );

  const handleJobPosted = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  useEffect(() => {
    if (userRole) {
      fetchJobs(userRole);
    }
  }, [category, fetchJobs, location, skills, userRole]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/apply/${job._id}`)}
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
    </div>
  );
};

export default JobSearch;
