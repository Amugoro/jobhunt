
import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-transparent py-4 px-6 flex justify-center items-center space-x-4">
      <input 
        type="text" 
        placeholder="Job Title" 
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
      />
      <input 
        type="text" 
        placeholder="Location" 
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
      />
      <button 
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
    >
      Find Jobs
    </button>
    </div>
  );
};

export default SearchBar;

