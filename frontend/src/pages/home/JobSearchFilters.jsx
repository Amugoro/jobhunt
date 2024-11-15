import React from 'react';

const JobSearchFilters = () => {
  return (
    <div className=" py-8 px-4 flex flex-wrap justify-center gap-4">
      <button className="bg-purple-600 text-white py-2 px-10 rounded w-full sm:w-auto">
        Location
      </button>
      <button className="bg-purple-600 text-white py-2 px-10 rounded w-full sm:w-auto">
        Industry
      </button>
      <button className="bg-purple-600 text-white py-2 px-10 rounded w-full sm:w-auto">
        Categories
      </button>
      <button className="bg-purple-600 text-white py-2 px-10 rounded w-full sm:w-auto">
        Find Jobs
      </button>
    </div>
  );
};

export default JobSearchFilters;
