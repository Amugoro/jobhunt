import { useEffect, useState } from "react";
import FreelancerProfileForm from "../components/FreelancerProfileForm";
import Chat from "../components/Chat";
import NotificationBell from "../components/NotificationBell";
import ManageApplications from "../components/ManageApplication";
import JobInvitations from "../components/JobInvitations";
import DocumentVerification from "../verify/DocumentVerification";
import VerifiedBadge from "../verify/VerifiedBadge";
import { UnverifiedBadge } from "../verify/UnverifiedBadge";
import { getFreelancerProfile } from "../utils/api";

const FreelancerDashboard = ({ freelancerId, clientId }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchFreelancerProfile();
    }
  }, []);

  const fetchFreelancerProfile = async () => {
    try {
      const { success, profile, message } = await getFreelancerProfile();
      if (success) {
        setIsVerified(profile?.isVerified || false);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error fetching freelancer profile", error);
    }
  };

  const handleVerificationComplete = (data) => {
    if (data.status === "verified") {
      setIsVerified(true);
      setShowVerificationForm(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Profile":
        return <FreelancerProfileForm />;
      case "Chat":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Chat</h3>
            <Chat currentUserId={freelancerId} receiverId={clientId} />
          </div>
        );
      case "Notifications":
        return <NotificationBell />;
      case "Job Invitations":
        return <JobInvitations />;
      case "Manage Applications":
        return <ManageApplications />;
      case "Verification":
        return (
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

            {showVerificationForm && (
              <DocumentVerification
                userId={freelancerId}
                onVerificationComplete={handleVerificationComplete}
              />
            )}
          </div>
        );
      default:
        return <FreelancerProfileForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-lg shadow-lg p-6 mr-6">
        <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
        <ul className="space-y-4">
          {[
            "Profile",
            "Chat",
            "Notifications",
            "Job Invitations",
            "Manage Applications",
            "Verification",
          ].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-lg hover:bg-blue-100 ${
                activeSection === item ? "bg-blue-200 font-bold" : ""
              }`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4">{renderActiveSection()}</div>
    </div>
  );
};

export default FreelancerDashboard;
