import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { clientPostJob } from '../utils/api';

const JobPostForm = ({ onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech',
    subcategory: 'Onsite',
    skillsRequired: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // restuctured to make use of api and format data for url encoded parsing
  // the onJobPosted function isn't available here
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request without sending the Authorization header
      const fd = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',')
      };

      const encodedData = new URLSearchParams(fd).toString();

      const { success, job, message } = await clientPostJob(encodedData);

      if (success) {
        // Notify parent that a job has been posted
        // onJobPosted(job);

        alert('Job posted successfully');

        // Reset the form
        setFormData({
          title: '',
          description: '',
          category: 'Tech',
          subcategory: 'Onsite',
          skillsRequired: '',
          location: ''
        });
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error posting job:', error.response || error.message);
      alert('Failed to post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        className="block w-full p-2 border mb-4"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Job Description"
        className="block w-full p-2 border mb-4"
        value={formData.description}
        onChange={handleChange}
      />
      <select
        name="category"
        className="block w-full p-2 border mb-4"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Tech">Tech</option>
        <option value="Trade">Trade</option>
      </select>
      {formData.category === 'Tech' && (
        <select
          name="subcategory"
          className="block w-full p-2 border mb-4"
          value={formData.subcategory}
          onChange={handleChange}
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      )}
      {formData.category === 'Trade' && (
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="block w-full p-2 border mb-4"
          value={formData.location}
          onChange={handleChange}
        />
      )}
      <input
        type="text"
        name="skillsRequired"
        placeholder="Skills Required (comma separated)"
        className="block w-full p-2 border mb-4"
        value={formData.skillsRequired}
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Post Job
      </button>
    </form>
  );
};

JobPostForm.propTypes = {
  onJobPosted: PropTypes.func.isRequired,
};

export default JobPostForm;
