import { useState } from 'react';
import { createOrUpdateTradePersonProfile } from '../utils/api';

const TradepersonProfileForm = ({ onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    tradeSkills: '',
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

    const formDataToSend = new FormData();
    formDataToSend.append('tradeSkills', formData.tradeSkills);
    formDataToSend.append('experience', formData.experience);
    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }

    try {
      // restuctured to make use of api and format data for url encoded parsing
      const { success, profile, message } = await createOrUpdateTradePersonProfile(formDataToSend);

      if (success) {
        alert('Profile created successfully');
        onProfileUpdated(profile);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Your Profile</h2>

      <input
        type="text"
        name="tradeSkills"
        placeholder="Trade Skills (comma separated)"
        className="block w-full p-2 border mb-4"
        value={formData.tradeSkills}
        onChange={handleChange}
      />

      <textarea
        name="experience"
        placeholder="Experience"
        className="block w-full p-2 border mb-4"
        value={formData.experience}
        onChange={handleChange}
      ></textarea>

      <input
        type="file"
        name="profilePicture"
        accept="image/*"
        className="block w-full p-2 border mb-4"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Profile
      </button>
    </form>
  );
};

export default TradepersonProfileForm;
