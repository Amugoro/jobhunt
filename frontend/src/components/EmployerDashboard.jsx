import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', description: '', category: 'remote' });
  const [invitationMessage, setInvitationMessage] = useState('');
  const [sendingInvitation, setSendingInvitation] = useState(false);

  // Fetch jobs, job seekers, and recruiters from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/employer/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    const fetchJobSeekers = async () => {
      try {
        const response = await axios.get('/api/employer/jobseekers');
        setJobSeekers(response.data);
      } catch (error) {
        console.error('Error fetching job seekers', error);
      }
    };

    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('/api/employer/recruiters');
        setRecruiters(response.data);
      } catch (error) {
        console.error('Error fetching recruiters', error);
      }
    };

    fetchJobs();
    fetchJobSeekers();
    fetchRecruiters();
  }, []);

  // Post a new job
  const handlePostJob = async () => {
    try {
      const response = await axios.post('/api/employer/jobs', newJob);
      setJobs([...jobs, response.data]);
      setNewJob({ title: '', description: '', category: 'remote' }); // Reset form
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job', error);
      alert('Failed to post job');
    }
  };

  // Edit job
  const handleUpdateJob = async () => {
    try {
      const response = await axios.put(`/api/employer/jobs/${editingJob._id}`, editingJob);
      setJobs(jobs.map((job) => (job._id === editingJob._id ? response.data : job)));
      setEditingJob(null); // Clear the form
      alert('Job updated successfully');
    } catch (error) {
      console.error('Error updating job', error);
      alert('Failed to update job');
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/employer/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Failed to delete job');
    }
  };

  // Delete jobseeker
  const handleDeleteJobSeeker = async (jobseekerId) => {
    try {
      await axios.delete(`/api/employer/jobseekers/${jobseekerId}`);
      setJobSeekers(jobSeekers.filter((jobseeker) => jobseeker._id !== jobseekerId));
      alert('Jobseeker deleted successfully');
    } catch (error) {
      console.error('Error deleting jobseeker', error);
      alert('Failed to delete jobseeker');
    }
  };

  // Delete recruiter
  const handleDeleteRecruiter = async (recruiterId) => {
    try {
      await axios.delete(`/api/employer/recruiters/${recruiterId}`);
      setRecruiters(recruiters.filter((recruiter) => recruiter._id !== recruiterId));
      alert('Recruiter deleted successfully');
    } catch (error) {
      console.error('Error deleting recruiter', error);
      alert('Failed to delete recruiter');
    }
  };

  // Send an invitation to a job seeker
  const handleInvite = async (jobseekerId) => {
    if (!invitationMessage) {
      alert('Please write an invitation message');
      return;
    }

    setSendingInvitation(true);

    try {
      const response = await axios.post('/api/employer/invitations', {
        jobseekerId,
        message: invitationMessage,
      });

      if (response.status === 201) {
        alert(`Invitation sent to Jobseeker ID: ${jobseekerId}`);
        setInvitationMessage('');
      }
    } catch (error) {
      console.error('Error sending invitation', error);
      alert('Failed to send invitation');
    } finally {
      setSendingInvitation(false);
    }
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>

      {/* Job Posting Form */}
      <h3>Post a New Job</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingJob ? handleUpdateJob() : handlePostJob();
        }}
      >
        <div>
          <label>Job Title</label>
          <input
            type="text"
            value={editingJob ? editingJob.title : newJob.title}
            onChange={(e) =>
              editingJob
                ? setEditingJob({ ...editingJob, title: e.target.value })
                : setNewJob({ ...newJob, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Job Description</label>
          <textarea
            value={editingJob ? editingJob.description : newJob.description}
            onChange={(e) =>
              editingJob
                ? setEditingJob({ ...editingJob, description: e.target.value })
                : setNewJob({ ...newJob, description: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Job Category</label>
          <select
            value={editingJob ? editingJob.category : newJob.category}
            onChange={(e) =>
              editingJob
                ? setEditingJob({ ...editingJob, category: e.target.value })
                : setNewJob({ ...newJob, category: e.target.value })
            }
            required
          >
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <button type="submit">{editingJob ? 'Update Job' : 'Post Job'}</button>
      </form>

      {/* Job List - Displaying Job Cards */}
      <h3>My Posted Jobs</h3>
      <div className="job-cards-container">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={setEditingJob}
            onDelete={handleDeleteJob}
          />
        ))}
      </div>

      {/* Job Seekers List */}
      <h3>Job Seekers List</h3>
      <ul>
        {jobSeekers.map((jobseeker) => (
          <li key={jobseeker._id}>
            {jobseeker.fullName}
            <button onClick={() => handleDeleteJobSeeker(jobseeker._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Recruiters List */}
      <h3>Recruiters List</h3>
      <ul>
        {recruiters.map((recruiter) => (
          <li key={recruiter._id}>
            {recruiter.fullName}
            <button onClick={() => handleDeleteRecruiter(recruiter._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Invitation Message */}
      <div>
        <label>Invitation Message</label>
        <textarea
          value={invitationMessage}
          onChange={(e) => setInvitationMessage(e.target.value)}
          placeholder="Write your invitation message"
        />
      </div>
    </div>
  );
}

export default EmployerDashboard;
