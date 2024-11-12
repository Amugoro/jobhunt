import React from 'react';

const JobListing = () => {
  const jobs = [
    { title: "Web Developer", company: "Tech Solutions", location: "Remote", salary: "$60k - $80k", type: "Full-Time" },
    { title: "Database Administrator", company: "Data Corp", location: "San Francisco", salary: "$70k - $90k", type: "Part-Time" },
    { title: "Digital Marketing Manager", company: "Brand Factory", location: "New York", salary: "$50k - $70k", type: "Remote" },
    { title: "Product Designer", company: "Creative Agency", location: "Los Angeles", salary: "$80k - $100k", type: "Full-Time" }
  ];

  return (
    <section className="job-listing py-8 px-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">New & Random Jobs</h2>
      <ul className="space-y-6">
        {jobs.map((job, index) => (
          <li key={index} className="job-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h3>
            <p className="text-lg text-gray-600 mb-1">{job.company} - {job.location}</p>
            <p className="text-lg text-gray-600 mb-3">{job.salary} - {job.type}</p>
            <button className="view-details bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200">
              View Details
            </button>
          </li>
        ))}
      </ul>
      <button className="view-more mt-8 w-full py-3 text-lg font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
        View More
      </button>
    </section>
  );
};

export default JobListing;
