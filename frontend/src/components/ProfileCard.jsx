import SendInvitation from './SendInvitation';
import RateUser from './RateUser';
import { downloadResume } from '../utils/api';

const ProfileCard = ({ profile, userType }) => {
  // restructure api call
  const handleDownloadResume = async () => {
    try {
      const { data, message } = await downloadResume(profile._id);

      if (message) {
        alert(message);
        return;
      }

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Failed to download resume');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
      {/* Profile Picture */}
      <img src={'http://localhost:5000' + profile.profilePicture} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />

      {/* Full Name */}
      <h3 className="text-xl font-bold">{profile.fullName}</h3>

      {/* Displaying skills */}
      <p className="text-gray-600 mb-4">{profile.skills.join(', ')}</p>

      {/* Resume Download Button */}
      <button
        onClick={handleDownloadResume}
        className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
      >
        Download Resume
      </button>

      {/* Conditional rendering of SendInvitation and RateUser based on userType */}
      {userType === 'freelancer' && (
        <div>
          <SendInvitation recipientId={profile._id} recipientType="freelancer" />
          <RateUser userId={profile._id} userType="freelancer" />
        </div>
      )}

      {userType === 'tradeperson' && (
        <div>
          <SendInvitation recipientId={profile._id} recipientType="tradeperson" />
          <RateUser userId={profile._id} userType="tradeperson" />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
