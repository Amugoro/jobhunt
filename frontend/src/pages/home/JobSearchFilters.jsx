import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobSearchFilters = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query); 
    if (onSearchChange) {
      onSearchChange(query); 
    }
  };

  return (
    <section className="py-10 h-60vh">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Get Hired in Your Dream Field</h1>
        <div className="flex justify-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Find jobs"
              className="bg-purple-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          <Link to="/job-search">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:text-blue-600 transition">
              Post Jobs+/ Hire
            </button>
          </Link>
        </div>
        <p className="mt-4 text-gray-500">
          Trending Keywords: IT Web Development, Remote, Freelance, Tradesperson
        </p>
      </div>
    </section>
  );
};

export default JobSearchFilters;
