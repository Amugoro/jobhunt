import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import io from 'socket.io-client';
import NotificationList from './NotificationList';

const socket = io('http://localhost:5000'); // Replace with your server URL

function RecruiterDashboard() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [invitationMessage, setInvitationMessage] = useState('');
  const [newJob, setNewJob] = useState({ title: '', description: '', category: 'remote' });
  const [editingJob, setEditingJob] = useState(null);
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]); // To store messages
  const [currentMessage, setCurrentMessage] = useState(''); // Current message from recruiter
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch job seekers and jobs
    const fetchJobSeekers = async () => {
      try {
        const response = await axios.get('/api/recruiter/jobseekers');
        setJobSeekers(response.data);
      } catch (error) {
        console.error('Error fetching job seekers', error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/recruiter/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobSeekers();
    fetchJobs();

    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage'); // Clean up on component unmount
    };
  }, []);

   // Fetch all jobs posted by recruiter
   const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/recruiter/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  // Fetch applicants for a selected job
  const fetchApplicants = async (jobId) => {
    try {
      const response = await axios.get(`/api/recruiter/jobs/${jobId}/applicants`);
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants', error);
    }
  };

  // View job seeker profile
  const viewJobSeekerProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/recruiter/jobseekers/${userId}`);
      setJobSeekerProfile(response.data);
    } catch (error) {
      console.error('Error fetching job seeker profile', error);
    }
  };

  // Shortlist an applicant
  const handleShortlist = async (userId) => {
    try {
      await axios.post(`/api/recruiter/jobs/${selectedJob._id}/shortlist/${userId}`);
      alert('Applicant shortlisted successfully');
    } catch (error) {
      console.error('Error shortlisting applicant', error);
    }
  };


  const handleInvite = async (jobseekerId) => {
    if (!invitationMessage) {
      alert('Please write an invitation message');
      return;
    }

    setSendingInvitation(true);
    try {
      const response = await axios.post('/api/recruiter/invitations', {
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

  const handlePostJob = async () => {
    try {
      const response = await axios.post('/api/recruiter/jobs', newJob);
      setJobs([...jobs, response.data]);
      setNewJob({ title: '', description: '', category: 'remote' });
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job', error);
      alert('Failed to post job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/recruiter/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Failed to delete job');
    }
  };

  const handleUpdateJob = async () => {
    try {
      const response = await axios.put(`/api/recruiter/jobs/${editingJob._id}`, editingJob);
      setJobs(jobs.map((job) => (job._id === editingJob._id ? response.data : job)));
      setEditingJob(null);
      alert('Job updated successfully');
    } catch (error) {
      console.error('Error updating job', error);
      alert('Failed to update job');
    }
  };

  const handleSendMessage = (jobseekerId) => {
    if (currentMessage.trim() === '') return;

    const message = {
      sender: 'recruiter', 
      content: currentMessage,
      jobseekerId,
    };

    socket.emit('chatMessage', message); // Send message to server
    setCurrentMessage(''); // Reset message input
  };

  return (
    <div>
      <h2>Recruiter Dashboard</h2>

      <NotificationList userId={userId} />

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

      {/* Job List */}
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

        {/* Job Management Section */}
      <h3>My Job Posts</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.title} - {job.category}
            <button onClick={() => {
              setSelectedJob(job);
              fetchApplicants(job._id);
            }}>
              View Applicants
            </button>
          </li>
        ))}
      </ul>

        {/* Applicants Section */}
        {selectedJob && (
          <div>
            <h3>Applicants for {selectedJob.title}</h3>
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant._id}>
                  {applicant.fullName}
                  <button onClick={() => viewJobSeekerProfile(applicant._id)}>View Profile</button>
                  {applicant.resumeUrl && (
                    <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                      Download Resume
                    </a>
                  )}
                  <button onClick={() => handleShortlist(applicant._id)}>Shortlist</button>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Job Seekers List */}
      <h3>Job Seekers List</h3>
      <ul>
        {jobSeekers.map((jobseeker) => (
          <li key={jobseeker._id}>
            {jobseeker.fullName}
            <button onClick={() => handleInvite(jobseeker._id)}>
              {sendingInvitation ? 'Sending...' : 'Send Invitation'}
            </button>

            {/* Chat Interface */}
            <div className="chat-container">
              <h4>Chat with {jobseeker.fullName}</h4>
              <div className="messages">
                {chatMessages
                  .filter((msg) => msg.jobseekerId === jobseeker._id)
                  .map((msg, idx) => (
                    <div
                      key={idx}
                      className={`message ${msg.sender === 'recruiter' ? 'sent' : 'received'}`}
                    >
                      {msg.content}
                    </div>
                  ))}
              </div>
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={() => handleSendMessage(jobseeker._id)}>Send</button>
            </div>
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

      <div className="text-right">
      <a
        href="/donate"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Support Us Through Donation
      </a>
    </div>

    </div>
  );
}

export default RecruiterDashboard;
