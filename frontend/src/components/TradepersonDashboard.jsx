import { useState, useEffect } from "react";
import axios from "axios";
import TradepersonProfileForm from "./TradepersonProfileForm";
import TradepersonProfilePreview from "./TradepersonProfilePreview";
import Chat from "../components/Chat";
import NotificationBell from "./NotificationBell";
import JobInvitations from "./JobInvitations";
import ManageApplications from "./ManageApplication";


const TradepersonDashboard = ({ tradepersonId, clientId}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; 
    } else {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get("/api/profile/tradeperson", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile", error);
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
