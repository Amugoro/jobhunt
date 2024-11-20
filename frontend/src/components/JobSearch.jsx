import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobPostForm from './JobPostForm';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      // Fetch user skills from the backend
      axios
        .get('https://jobhunt-b23g.onrender.com/api/user/skills', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setSkills(response.data.skills);
          fetchJobs();
          fetchAppliedJobs();
        })
        .catch((error) => {
          console.error('Error fetching skills:', error);
        });
    }
  }, [navigate]);

  const applyForJob = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `https://jobhunt-b23g.onrender.com/api/jobs/apply/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Applied successfully!');
      fetchAppliedJobs();
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };


  const fetchAppliedJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://jobhunt-b23g.onrender.com/api/jobs/applied', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(response.data.map((job) => job._id));
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  // Fetch job listings with filters
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jobhunt-b23g.onrender.com/api/jobs', {
        params: { category, location },
      });

      // Filter jobs based on user's skills
      const filteredJobs = response.data.filter((job) =>
        job.skillsRequired.some((skill) => skills.includes(skill))
      );

      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPosted = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]); // Add the new job to the beginning of the job list
  };

  useEffect(() => {
    fetchJobs();
  }, [category, location, skills]);

  return (
    <div className="job-search-page">
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
      <JobPostForm onJobPosted={handleJobPosted} />

      {/* Job Listings */}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <div className="job-listings">
          {jobs.length === 0 ? (
            <p>No jobs found that match your skills and selected filters.</p>
          ) : (
            jobs.map((job) => (
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
                    onClick={() => applyForJob(job._id)}
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
