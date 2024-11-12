import React, { useState } from 'react';

function JobCard({ job, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [category, setCategory] = useState(job.category);
  const [industry, setIndustry] = useState(job.industry);
  const [requirements, setRequirements] = useState(job.requirements);

  // Handle saving the updated job data
  const handleSave = (e) => {
    e.preventDefault();
    const updatedJob = {
      title,
      description,
      category,
      industry,
      requirements,
    };
    onSave(job._id, updatedJob); // Save updates to the backend
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="job-card">
      {isEditing ? (
        <form onSubmit={handleSave} className="job-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry"
            required
          />
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Requirements"
            required
          />
          <div className="job-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Industry:</strong> {job.industry}</p>
          <p><strong>Requirements:</strong> {job.requirements}</p>
          <p><strong>Posted by:</strong> {job.recruiter.fullName}</p>
          <div className="job-card-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(job._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default JobCard;
