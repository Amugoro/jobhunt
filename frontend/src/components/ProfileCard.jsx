import SendInvitation from './SendInvitation';
import RateUser from './RateUser';
import { downloadResume } from '../utils/api';

const ProfileCard = ({ profile, userType }) => {
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

  // Default fallback for undefined or empty properties
  const profilePicture = profile?.profilePicture
    ? `http://localhost:5000${profile.profilePicture}`
    : '/default-profile-picture.png'; // Add a placeholder image path here

  const username = profile?.username || 'No Name Available';
  const skills = profile?.skills?.length > 0 ? profile.skills.join(', ') : 'No skills listed';
  const role = profile?.role || 'Role not specified'; // Add role display
  const experience =
    profile?.experience?.length > 0
      ? profile.experience.map((exp) => `${exp.title} at ${exp.company} (${exp.years} years)`).join(', ')
      : 'No experience listed'; // Format and fallback for experience

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
      {/* Profile Picture */}
      <img
        src={profilePicture}
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />

      {/* Full Name */}
      <h3 className="text-xl font-bold">{username}</h3>

      {/* Role */}
      <p className="text-gray-700 font-semibold">Role: {role}</p>

      {/* Displaying Skills */}
      <p className="text-gray-600 mb-4">Skills: {skills}</p>

      {/* Experience */}
      <p className="text-gray-600 mb-4">Experience: {experience}</p>

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
          <SendInvitation recipientId={profile?._id} recipientType="freelancer" />
          <RateUser userId={profile?._id} userType="freelancer" />
        </div>
      )}

      {userType === 'tradeperson' && (
        <div>
          <SendInvitation recipientId={profile?._id} recipientType="tradeperson" />
          <RateUser userId={profile?._id} userType="tradeperson" />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
