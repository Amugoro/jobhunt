import { useState, useEffect } from "react";
import axios from 'axios';
import JobPostForm from './JobPostForm';
import Chat from '../components/Chat';
import NotificationBell from './NotificationBell';
import ProfileList from './ProfileList';
import DocumentVerification from '../verify/DocumentVerification';
import VerifiedBadge from "../verify/VerifiedBadge";
import { UnverifiedBadge } from '../verify/UnverifiedBadge';

const ClientDashboard = ({ clientId, freelancerId, tradepersonId }) => {
  const [activeSection, setActiveSection] = useState('profile'); 
  const [activeReceiver, setActiveReceiver] = useState(freelancerId);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  useEffect(() => {
    // Fetch the client's verification status on load
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get(`/api/profile/client/${clientId}`);
        setIsVerified(response.data.isVerified);
      } catch (error) {
        console.error("Error fetching client verification status:", error);
      }
    };
    fetchVerificationStatus();
  }, [clientId]);

  const handleVerificationComplete = (data) => {
    if (data.status === "verified") {
      setIsVerified(true);
      setShowVerificationForm(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileList />;
      case 'jobPost':
        return <JobPostForm />;
      case 'chat':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Chat</h3>
            <div className="mb-4">
              <button
                className={`px-4 py-2 mr-2 rounded ${
                  activeReceiver === freelancerId ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveReceiver(freelancerId)}
              >
                Chat with Freelancer
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeReceiver === tradepersonId ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveReceiver(tradepersonId)}
              >
                Chat with Tradeperson
              </button>
            </div>
            <Chat currentUserId={clientId} receiverId={activeReceiver} />
          </div>
        );
      case 'verification':
        return (
          <div className="mb-6">
            {showVerificationForm && (
              <DocumentVerification
                userId={clientId}
                onVerificationComplete={handleVerificationComplete}
              />
            )}
            {isVerified ? <VerifiedBadge /> : <UnverifiedBadge />}
            <button
              onClick={() => setShowVerificationForm(!showVerificationForm)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showVerificationForm ? "Cancel Verification" : "Verify Now"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-4 space-y-6 hidden md:block">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('profile')}
            className="w-full text-left px-4 py-2 hover:bg-purple-500"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('jobPost')}
            className="w-full text-left px-4 py-2 hover:bg-purple-500"
          >
            Job Post
          </button>
          <button
            onClick={() => setActiveSection('chat')}
            className="w-full text-left px-4 py-2 hover:bg-purple-500"
          >
            Chat
          </button>
          <button
            onClick={() => setActiveSection('verification')}
            className="w-full text-left px-4 py-2 hover:bg-purple-500"
          >
            Verification
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
          <NotificationBell />
        </div>

        <div className="mb-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
