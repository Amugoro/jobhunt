import FreelancerProfileForm from "../components/FreelancerProfileForm";
import Chat from "../components/Chat";
import NotificationBell from "../components/NotificationBell";
import ManageApplications from "../components/ManageApplication";
import JobInvitations from "../components/JobInvitations";
import JobSearch from "../components/JobSearch";

const FreelancerDashboard = ({  freelancerId, clientId }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>
        <NotificationBell />
        <button><JobSearch /></button>
        <hr className="my-6" />
        <button><JobInvitations /></button>
        <hr className="my-6" />
        <button><ManageApplications /></button> 
      </div>

      <FreelancerProfileForm />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Real-Time Chat</h3>
        <Chat currentUserId={freelancerId} receiverId={clientId} />
      </div>
    </div>
  );
};

export default FreelancerDashboard;
