import SendInvitation from './SendInvitation';
import RateUser from './RateUser';
import axios from 'axios';

const ProfileCard = ({ profile, userType }) => {
  const handleDownloadResume = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://jobhunt-b23g.onrender.com/api/client/download-resume/${profile._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
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
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Profile Picture */}
      <img src={profile.profilePicture} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
      
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
