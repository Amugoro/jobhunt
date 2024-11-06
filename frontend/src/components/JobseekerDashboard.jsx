import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobseekerDashboard = () => {
  const [userData, setUserData] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [photo, setPhoto] = useState('');
  const [resume, setResume] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/jobseeker/profile');
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data');
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get('/api/jobseeker/applied-jobs');
        setAppliedJobs(res.data);
      } catch (error) {
        console.error('Error fetching applied jobs');
      }
    };

    fetchUserData();
    fetchAppliedJobs();
  }, []);

  const uploadFile = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append(type, file);
      await axios.post(`/api/jobseeker/upload-${type}`, formData);
    } catch (error) {
      console.error('Error uploading file');
    }
  };

  return (
    <div>
      <h1>Welcome {userData.name}</h1>
      <div>
        <h3>Your Applied Jobs</h3>
        {appliedJobs.map((job) => (
          <div key={job.jobId}>
            <h4>{job.jobId.title}</h4>
            <p>{job.jobId.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Your Profile</h3>
        <p>Skills: {userData.skills}</p>
        <p>Bio: {userData.bio}</p>
        <button onClick={() => uploadFile(photo, 'photo')}>Upload Photo</button>
        <button onClick={() => uploadFile(resume, 'resume')}>Upload Resume</button>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
