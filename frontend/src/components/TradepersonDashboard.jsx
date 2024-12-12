import { useState, useEffect } from "react";
import axios from "axios";
import TradepersonProfileForm from "./TradepersonProfileForm";
import TradepersonProfilePreview from "./TradepersonProfilePreview";
import Chat from "../components/Chat";
import NotificationBell from "./NotificationBell";
import JobInvitations from "./JobInvitations";
import ManageApplications from "./ManageApplication";
import DocumentVerification from "../verify/DocumentVerification";
import VerifiedBadge from "../verify/VerifiedBadge";
import { UnverifiedBadge } from '../verify/UnverifiedBadge'
import { getTradePersonProfile } from "../utils/api";


const TradepersonDashboard = ({ tradepersonId, clientId }) => {
  const [profile, setProfile] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { success, profile, message } = await getTradePersonProfile();
      if (success) {
        setProfile(profile);
        setIsVerified(profile?.isVerified || false); // Assume profile includes verification status
      } else {
        alert(message);
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
    <div className="tradeperson-dashboard">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Freelancer Dashboard</h2>
        <NotificationBell />

        <hr className="my-6" />
        <JobInvitations />
        <hr className="my-6" />
        <ManageApplications />
      </div>

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
        </div>
      ) : (
        <TradepersonProfileForm onProfileUpdated={handleProfileUpdated} />
      )}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Real-Time Chat</h3>
        <Chat currentUserId={tradepersonId} receiverId={clientId} />
      </div>
    </div>
  );
};

export default TradepersonDashboard;
