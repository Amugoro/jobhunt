

const TradepersonProfilePreview = ({ profile }) => {
  return (
    <div className="profile-preview p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Profile Preview</h2>

      {profile.profilePicture && (
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="profile-picture w-32 h-32 rounded-full mb-4"
        />
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Trade Skills</h3>
        <p>{profile.tradeSkills}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <p>{profile.experience}</p>
      </div>
    </div>
  );
};

export default TradepersonProfilePreview;
