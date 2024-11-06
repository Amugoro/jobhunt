import React from 'react';

function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Posted by:</strong> {job.recruiter.fullName}</p>
      <div className="job-card-actions">
        <button onClick={() => onEdit(job)}>Edit</button>
        <button onClick={() => onDelete(job._id)}>Delete</button>
      </div>
    </div>
  );
}

export default JobCard;
