import React from 'react';

const JobCard = ({ job }) => {
    return (
        <div className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <button>Apply Now</button>
        </div>
    );
};

export default JobCard;
