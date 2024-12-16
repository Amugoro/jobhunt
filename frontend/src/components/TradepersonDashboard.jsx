import { useState, useEffect } from "react";
import TradepersonProfileForm from "./TradepersonProfileForm";
import TradepersonProfilePreview from "./TradepersonProfilePreview";
import Chat from "../components/Chat";
import JobInvitations from "./JobInvitations";
import ManageApplications from "./ManageApplication";
import DocumentVerification from "../verify/DocumentVerification";
import VerifiedBadge from "../verify/VerifiedBadge";
import { UnverifiedBadge } from "../verify/UnverifiedBadge";
import { getTradePersonProfile } from "../utils/api";

const Sidebar = ({ setActiveSection }) => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0">
    <h2 className="text-2xl font-bold p-4">Dashboard</h2>
    <ul className="mt-4">
      <li className="p-4 hover:bg-gray-700" onClick={() => setActiveSection("profile")}>
        Profile
      </li>
      <li className="p-4 hover:bg-gray-700" onClick={() => setActiveSection("jobInvitations")}>
        Job Invitations
      </li>
      <li className="p-4 hover:bg-gray-700" onClick={() => setActiveSection("manageApplications")}>
        Manage Applications
      </li>
      <li className="p-4 hover:bg-gray-700" onClick={() => setActiveSection("chat")}>
        Real-Time Chat
      </li>
      <li className="p-4 hover:bg-gray-700" onClick={() => setActiveSection("verifyDocuments")}>
        Document Verification
      </li>
    </ul>
  </div>
);

const TradepersonDashboard = ({ tradepersonId, clientId }) => {
  const [profile, setProfile] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { success, profile } = await getTradePersonProfile();
      if (success) {
        setProfile(profile);
        setIsVerified(profile?.isVerified || false);
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleVerificationComplete = (data) => {
    if (data.status === "verified") {
      setIsVerified(true);
      setShowVerificationForm(false);
    }
  };

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="ml-64 p-6 flex-1 bg-gray-100" style={{ minHeight: "100vh" }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Tradeperson Dashboard</h2>
        </div>

        {/* Section Rendering */}
        {activeSection === "profile" && (
          <div>
            {/* Verification Badge */}
            <div className="mb-6">
              {isVerified ? (
                <VerifiedBadge />
              ) : (
                <>
                  <UnverifiedBadge />
                  <button
                    onClick={() => setShowVerificationForm(!showVerificationForm)}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {showVerificationForm ? "Cancel Verification" : "Verify Now"}
                  </button>
                </>
              )}
            </div>

            {/* Document Verification Form */}
            {showVerificationForm && (
              <div className="mb-6">
                <DocumentVerification
                  userId={tradepersonId}
                  onVerificationComplete={handleVerificationComplete}
                />
              </div>
            )}

            {profile ? (
              <div>
                <TradepersonProfilePreview profile={profile} />
                <div className="mb-4">
                  <button
                    onClick={() => setActiveSection("profileForm")}
                    className="mt-4 bg-green-500 text-white px-4 py-2"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              <TradepersonProfileForm onProfileUpdated={handleProfileUpdated} />
            )}
          </div>
        )}

        {activeSection === "profileForm" && (
          <TradepersonProfileForm onProfileUpdated={handleProfileUpdated} />
        )}

        {activeSection === "jobInvitations" && <JobInvitations />}

        {activeSection === "manageApplications" && <ManageApplications />}

        {activeSection === "chat" && (
          <Chat currentUserId={tradepersonId} receiverId={clientId} />
        )}

        {activeSection === "verifyDocuments" && (
          <div>
            {isVerified ? (
              <VerifiedBadge />
            ) : (
              <DocumentVerification
                userId={tradepersonId}
                onVerificationComplete={handleVerificationComplete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradepersonDashboard;
