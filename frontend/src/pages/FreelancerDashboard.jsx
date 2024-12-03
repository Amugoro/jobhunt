import FreelancerProfileForm from "../components/FreelancerProfileForm";
import Chat from "../components/Chat";
import NotificationBell from "../components/NotificationBell";
import ManageApplications from "../components/ManageApplication";
import JobInvitations from "../components/JobInvitations";
import DocumentVerification from "../verify/DocumentVerification";
import { useState } from "react";
import axios from "axios";
import VerifiedBadge from "../verify/VerifiedBadge";
import {UnverifiedBadge} from '../verify/UnverifiedBadge'

const FreelancerDashboard = ({  freelancerId, clientId }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);


  const fetchFreelancerProfile = async (token) => {
    try {
      const response = await axios.get(`/api/profile/freelancer/${freelancerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { profile } = response.data;
      setIsVerified(profile?.isVerified || false); 
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>
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
           userId={freelancerId}
           onVerificationComplete={handleVerificationComplete}
         />
       </div>
     )}


      <FreelancerProfileForm />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Real-Time Chat</h3>
        <Chat currentUserId={freelancerId} receiverId={clientId} />
      </div>
    </div>
  );
};

export default FreelancerDashboard;
