import { useState } from 'react';
import { createOrUpdateTradePersonProfile } from '../utils/api';

const TradepersonProfileForm = ({ onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    tradeUsername: '',
    tradeSkills: '',
    tradeRole: '',
    experience: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.tradeUsername || !formData.tradeSkills || !formData.tradeRole || !formData.experience) {
      alert('All fields are required!');
      return;
    }

    // Prepare FormData for API
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await createOrUpdateTradePersonProfile(formDataToSend);

      if (response.success) {
        alert('Profile created successfully');
        onProfileUpdated(response.profile); // Pass updated profile to parent
      } else {
        alert(response.message || 'Failed to create profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Your Profile</h2>

      <input
        type="text"
        name="tradeUsername"
        placeholder="Username"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={formData.tradeUsername}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="tradeSkills"
        placeholder="Trade Skills (comma-separated)"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={formData.tradeSkills}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="tradeRole"
        placeholder="Role (e.g., tiler, painter)"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={formData.tradeRole}
        onChange={handleChange}
        required
      />

      <textarea
        name="experience"
        placeholder="Experience"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={formData.experience}
        onChange={handleChange}
        required
      ></textarea>

      <label className="block text-gray-600 mb-2">Upload Profile Picture</label>
      <input
        type="file"
        name="profilePicture"
        accept="image/*"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Save Profile
      </button>
    </form>
  );
};

export default TradepersonProfileForm;
