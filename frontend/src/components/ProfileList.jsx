import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { getClientProfile } from '../utils/api';

const ProfileList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [tradespersons, setTradespersons] = useState([]);
  const [error, setError] = useState('');
  const [showFreelancers, setShowFreelancers] = useState(false);
  const [showTradespersons, setShowTradespersons] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // For displaying full profile

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { success, freelancers, tradespersons, message } = await getClientProfile();
        if (success) {
          setFreelancers(freelancers);
          setTradespersons(tradespersons);
        } else {
          setError(message);
        }
      } catch (err) {
        setError('Failed to load profiles');
        console.error(err);
      }
    };

    fetchProfiles();
  }, []);

  const toggleCategory = (category) => {
    if (category === 'freelancer') {
      setShowFreelancers((prev) => !prev); // Toggle freelancers
      if (!showFreelancers) setShowTradespersons(false); // Hide tradespersons if showing freelancers
    } else if (category === 'tradeperson') {
      setShowTradespersons((prev) => !prev); // Toggle tradespersons
      if (!showTradespersons) setShowFreelancers(false); // Hide freelancers if showing tradespersons
    }
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile); // Set the selected profile to display in a modal or popup
  };

  const closeProfileView = () => {
    setSelectedProfile(null); // Close the profile view
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => toggleCategory('freelancer')}
          className={`p-2 rounded ${showFreelancers ? 'bg-purple-700 text-white' : 'bg-blue-500 text-white'}`}
        >
          Freelancers
        </button>
        <button
          onClick={() => toggleCategory('tradeperson')}
          className={`p-2 rounded ${showTradespersons ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
        >
          Tradespersons
        </button>
      </div>

      {/* Freelancer Names and Roles List */}
      {showFreelancers && !showTradespersons && (
        <ul className="list-disc pl-5 mb-4">
          {freelancers.map((profile) => (
            <li
              key={profile._id}
              className="cursor-pointer text-blue-600 underline"
              onClick={() => handleProfileClick(profile)}
            >
              {profile.fullName} - {profile.role} 
            </li>
          ))}
        </ul>
      )}

      {/* Tradesperson Names and Roles List */}
      {showTradespersons && !showFreelancers && (
        <ul className="list-disc pl-5 mb-4">
          {tradespersons.map((profile) => (
            <li
              key={profile._id}
              className="cursor-pointer text-green-600 underline"
              onClick={() => handleProfileClick(profile)}
            >
              {profile.fullName} - {profile.tradeRole}
            </li>
          ))}
        </ul>
      )}

      {/* Full Profile View (Modal or Popup) */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={closeProfileView}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Profile Card */}
            <ProfileCard profile={selectedProfile} userType={selectedProfile.role} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
