import { useState } from 'react';
import axios from 'axios';
import { clientSendInvitation } from '../utils/api';

const SendInvitation = ({ recipientId, recipientType }) => {
  const [message, setMessage] = useState('');

  const handleSendInvitation = async () => {
    try {
      const fd = { recipientId, recipientType, message };

      const encodedData = new URLSearchParams(fd).toString();

      await clientSendInvitation(encodedData); 

      alert('Invitation sent successfully');
      setMessage('');
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
