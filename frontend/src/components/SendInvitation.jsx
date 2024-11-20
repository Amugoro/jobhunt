import { useState } from 'react';
import axios from 'axios';

const SendInvitation = ({ recipientId, recipientType }) => {
  const [message, setMessage] = useState('');

  const handleSendInvitation = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://jobhunt-b23g.onrender.com/api/client/send-invitation',
        { recipientId, recipientType, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Invitation sent successfully');
      setMessage(''); // Clear the message field after sending
    } catch (error) {
      console.error('Failed to send invitation', error);
      alert('Failed to send invitation');
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Invitation message..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSendInvitation}
        className="bg-green-500 text-white p-2 rounded mt-2"
      >
        Send Invitation
      </button>
    </div>
  );
};

export default SendInvitation;
