import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import NotificationList from './NotificationList';

const socket = io('https://jwskilledhunt.org/backend');

const JobseekerDashboard = () => {
  const [userData, setUserData] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch user data and applied jobs
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/jobseeker/profile');
        setUserData(res.data);
        if (res.data.resume) setResumePreview(res.data.resume);
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

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);
  const fetchAllJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setAllJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs');
    }
  };


  const handleProfilePhotoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      const res = await axios.post('/api/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
    } catch (error) {
      console.error('Error uploading profile photo', error);
    }
  };

  // Handle resume file upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('/api/jobseeker/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResumePreview(response.data.resumeUrl);
      alert('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume');
    }
  };

  // Handle sending messages to recruiters
  const handleSendMessage = (receiverId) => {
    const senderId = userData._id;
    socket.emit('send_message', {
      sender: senderId,
      receiver: receiverId,
      message: newMessage,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: senderId, receiver: receiverId, message: newMessage },
    ]);
    setNewMessage('');
  };

  return (
    <div className="dashboard p-6">
      <h1 className="text-2xl">Welcome, {userData.name}</h1>
       {/* Profile Photo Upload Section */}
       <div className="profile-photo-upload">
       <h3>Upload Profile Photo</h3>
       <form onSubmit={handleProfilePhotoUpload}>
         <input
           type="file"
           accept="image/*"
           onChange={(e) => setProfilePhoto(e.target.files[0])}
         />
         <button type="submit">Upload Photo</button>
       </form>
       {userData.profilePhoto && (
         <img
           src={userData.profilePhoto}
           alt="Profile"
           style={{ width: '100px', height: '100px', borderRadius: '50%' }}
         />
       )}
     </div>
     <NotificationList userId={userId} />

      {/* Resume Upload */}
      <div className="my-4">
        <h3>Upload Your Resume</h3>
        <input type="file" onChange={handleResumeUpload} />
        {resumePreview && (
          <div className="mt-3">
            <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              View Uploaded Resume
            </a>
          </div>
        )}
      </div>

      {/* Applied Jobs */}
      <div className="applied-jobs my-6">
        <h3>Your Applied Jobs</h3>
        {appliedJobs.map((job) => (
          <div key={job.jobId} className="job border p-4 my-2">
            <h4>{job.jobId.title}</h4>
            <p>{job.jobId.description}</p>
          </div>
        ))}
      </div>

      {/* View All Jobs Section */}
      <div className="all-jobs">
        <h3>All Job Posts</h3>
        {allJobs.map((job) => (
          <div key={job._id} className="job">
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <span>Category: {job.category}</span>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="chat">
        <h3>Chat with Recruiters</h3>
        <div className="messages border p-3 h-32 overflow-auto mb-3">
          {messages.map((message, index) => (
            <div key={index} className={message.sender === userData._id ? 'text-right' : 'text-left'}>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="w-full border p-2"
        />
        <button onClick={() => handleSendMessage('receiverId')} className="bg-blue-500 text-white py-2 px-4 mt-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
