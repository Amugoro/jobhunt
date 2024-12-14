const TradepersonProfilePreview = ({ profile = {} }) => {
  return (
    <div className="profile-preview p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

      {profile.profilePicture && (
        <img
          src={`http://localhost:5000${profile.profilePicture}`}
          alt="Profile"
          className="profile-picture w-32 h-32 rounded-full mb-4"
        />
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Username</h3>
        <p>{profile.tradeUsername || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Trade Skills</h3>
        <p>{profile.tradeSkills || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Trade Role</h3>
        <p>{profile.tradeRole || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <p>{profile.experience || 'N/A'}</p>
      </div>
    </div>
  );
};

export default TradepersonProfilePreview;
