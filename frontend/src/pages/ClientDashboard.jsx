import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PostJob from '../components/client/PostJob';
import ViewFreelancers from '../components/client/ViewFreelancers';
import ViewTradePersons from '../components/client/ViewTradePersons';
import Invitations from '../components/client/Invitations';
import Messages from '../components/client/Messages';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-5">
          <h2 className="text-2xl font-bold mb-8">Client Dashboard</h2>
          <ul>
            <li>
              <Link to="/client/post-job" className="block py-2 hover:bg-blue-800">Post a Job</Link>
            </li>
            <li>
              <Link to="/client/freelancers" className="block py-2 hover:bg-blue-800">View Freelancers</Link>
            </li>
            <li>
              <Link to="/client/trade-persons" className="block py-2 hover:bg-blue-800">View Trade Persons</Link>
            </li>
            <li>
              <Link to="/client/invitations" className="block py-2 hover:bg-blue-800">Invitations</Link>
            </li>
            <li>
              <Link to="/client/messages" className="block py-2 hover:bg-blue-800">Messages</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5">
          <Routes>
            <Route path="/client/post-job" element={<PostJob />} />
            <Route path="/client/freelancers" element={<ViewFreelancers />} />
            <Route path="/client/trade-persons" element={<ViewTradePersons />} />
            <Route path="/client/invitations" element={<Invitations />} />
            <Route path="/client/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
