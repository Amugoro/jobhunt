
import JobPostForm from './JobPostForm';
import Chat from '../components/Chat';
import NotificationBell from './NotificationBell';
import ProfileList from './ProfileList';
import { useState } from "react";

const ClientDashboard = ({ clientId, freelancerId, tradepersonId }) => {
  const [activeReceiver, setActiveReceiver] = useState(freelancerId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
        <NotificationBell />
      </div>
      <ProfileList />
      <JobPostForm />
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
    </div>
  );
};

export default ClientDashboard;
