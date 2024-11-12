import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSearch = ({ userSkills }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        const allJobs = res.data;

        // Sort jobs with matching skills at the top
        const sortedJobs = allJobs.sort((a, b) => {
          const aMatches = userSkills.some(skill => a.skillsRequired.includes(skill));
          const bMatches = userSkills.some(skill => b.skillsRequired.includes(skill));
          return bMatches - aMatches;
        });

        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
      } catch (error) {
        console.error('Error fetching jobs');
      }
    };

    fetchJobs();
  }, [userSkills]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'all') {
      setFilteredJobs(jobs);
    } else {
      const categoryFilteredJobs = jobs.filter(job => job.category === selectedCategory);
      setFilteredJobs(categoryFilteredJobs);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Job Listings</h1>

      {/* Job Filter */}
      <div className="mb-6 flex justify-center">
        <select
          onChange={handleCategoryChange}
          value={category}
          className="block w-full md:w-1/3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Jobs</option>
          <option value="onsite">Onsite Job</option>
          <option value="remote">Remote Job</option>
          <option value="hybrid">Hybrid Job</option>
        </select>
      </div>

      {/* Job List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{job.category}</span></p>
          </div>
        ))}
      </div>

      {/* No Jobs Found */}
      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No jobs available for the selected category.</p>
      )}
    </div>
  );
};

export default JobSearch;
