import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ currentUserId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Fetch chat history for the selected receiver
    socket.emit('getChatHistory', { currentUserId, receiverId });

    socket.on('chatHistory', (history) => {
      setMessages(history); // Only messages related to the current conversation
    });

    socket.on('receiveMessage', (message) => {
      // Only update messages if the message is for the current conversation
      if (message.receiverId === receiverId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socket.on('newMessageNotification', (data) => {
      setNotification(data.message);
      if (Notification.permission === 'granted') {
        new Notification(data.message);
      }
    });

    socket.on('fileUploaded', (fileUrl) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: <img src={fileUrl} alt="file" className="file-preview" /> },
      ]);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('receiveMessage');
      socket.off('newMessageNotification');
      socket.off('fileUploaded');
    };
  }, [currentUserId, receiverId]); // Add receiverId to dependencies so it reloads when it changes

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      senderId: currentUserId,
      receiverId,
      message: newMessage,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      const messageData = {
        senderId: currentUserId,
        receiverId,
        message: response.data.fileUrl, // URL of the uploaded file
        timestamp: new Date(),
      };

      socket.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, messageData]);

      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
            {msg.message.startsWith('http') ? (
              <img src={msg.message} alt="file" className="file-preview" />
            ) : (
              <p>{msg.message}</p>
            )}
          </div>
        ))}
      </div>

      {notification && <div className="notification">{notification}</div>}

      {file && (
        <div>
          <p>{file.name}</p>
          <div className="progress-bar">
            <div style={{ width: `${uploadProgress}%` }} className="progress"></div>
          </div>
        </div>
      )}

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="input"
      />
      <input type="file" onChange={handleFileChange} className="file-input" />
      {file && <button onClick={handleFileUpload} className="upload-button">Upload</button>}
      <button onClick={handleSendMessage} className="send-button">Send</button>
    </div>
  );
};

export default Chat;
