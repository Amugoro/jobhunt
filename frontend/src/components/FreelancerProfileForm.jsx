import { useState } from 'react';
import { createOrUpdateFreelancerProfile } from '../utils/api';

const FreelancerProfileForm = () => {

  const [formData, setFormData] = useState({
    objective: '',
    skills: '',
    experience: [],
    profilePicture: null,
    resume: null,
  });

  const [experiences, setExperiences] = useState([
    { company: '', role: '', startDate: '', endDate: '', description: '' },
  ]);

  const [preview, setPreview] = useState({
    profilePicture: '',
    resume: '',
    skills: [],
    experiences: [],
    objective: '',
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    if (name === 'skills') {
      setPreview({
        ...preview,
        skills: value.trim() ? value.split(',').map((skill) => skill.trim()) : [],
      });
    } else {
      setPreview({ ...preview, [name]: value });
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });


    if (e.target.name === 'profilePicture' && file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview({ ...preview, profilePicture: reader.result });
      reader.readAsDataURL(file);
    }
  };


  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    setPreview({ ...preview, experiences: updatedExperiences });
  };

  const toBinary = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = (error) => reject(error);
    });



  const handleSubmit = async (e) => {
    e.preventDefault();

    // **Validation**
    if (!formData.skills || formData.skills.split(',').length < 1) {
      alert('Please enter at least one skill.');
      return;
    }

    /*/if (experiences.some((exp) => !exp.company || !exp.role || !exp.startDate)) {
      alert('Please fill out all experience fields.');
      return;
    }*/

    // **Create Form Data**
    // const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('objective', formData.objective);
    form.append('skills', formData.skills);
    form.append('experience', JSON.stringify(experiences));
    if (formData.profilePicture) form.append('profilePicture', formData.profilePicture);
    if (formData.resume) form.append('resume', formData.resume);

    try {
      // **Send Data to Backend**
      // await axios.post('http://localhost:5000/api/freelancer/profile', form, { 
      //   headers: {
      //     // 'Content-Type': 'multipart/form-data',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const { success, profile, message } = await createOrUpdateFreelancerProfile(form);
      if (success) {
        alert('Profile created/updated successfully!');
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert('Error creating profile');
    }
  };

  return (
    <div className="flex gap-8">
      {/* **Form Section** */}
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg w-2/3">
        <h2 className="text-2xl font-bold mb-4">Freelancer Profile</h2>

        {/* Objective Input */}
        <label>Objective</label>
        <textarea
          name="objective"
          placeholder="Your Objective"
          value={formData.objective}
          onChange={handleChange}
          className="block w-full p-2 border mb-4"
        ></textarea>

        {/* Skills Input */}
        <label>Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          placeholder="e.g., JavaScript, Python, React"
          value={formData.skills}
          onChange={handleChange}
          className="block w-full p-2 border mb-4"
        />

        {/* Experiences Section */}
        <label>Experience</label>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              className="block w-full p-2 border mb-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
              className="block w-full p-2 border mb-2"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              className="block w-full p-2 border mb-2"
            />
            <input
              type="date"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              className="block w-full p-2 border mb-2"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              className="block w-full p-2 border"
            ></textarea>
          </div>
        ))}

        {/* File Inputs */}
        <label>Profile Picture</label>
        <input type="file" name="profilePicture" onChange={handleFileChange} className="mb-4" />
        <label>Resume</label>
        <input type="file" name="resume" onChange={handleFileChange} className="mb-4" />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Profile</button>
      </form>

      {/* **Preview Section** */}
      <div className="w-1/3 bg-gray-50 p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4">Profile Preview</h3>
        {preview.profilePicture && <img src={preview.profilePicture} alt="Profile" className="w-32 h-32 object-cover mb-4 rounded-full" />}
        <h4 className="font-semibold">Objective:</h4>
        <p>{preview.objective || 'Not provided'}</p>
        <h4 className="font-semibold mt-4">Skills:</h4>
        <ul>
          {preview.skills.length > 0 ? preview.skills.map((skill, index) => <li key={index}>{skill}</li>) : <li>Not provided</li>}
        </ul>
        <h4 className="font-semibold mt-4">Experience:</h4>
        {preview.experiences.length > 0 ? (
          preview.experiences.map((exp, index) => (
            <div key={index}>
              <p>{exp.company} - {exp.role}</p>
              <p>{exp.startDate} to {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))
        ) : (
          <p>No experience provided</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfileForm;
