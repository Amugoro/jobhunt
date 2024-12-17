import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Initialize socket
const socket = io("https://jobhunt-server-iota.vercel.app"); 

const Chat = ({ currentUserId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Request chat history
    socket.emit("getChatHistory", { currentUserId, receiverId });

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (message) => {
      if (message.receiverId === receiverId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socket.on("newMessageNotification", (data) => {
      setNotification(data.message);
      if (Notification.permission === "granted") {
        new Notification(data.message);
      }
    });

    socket.on("fileUploaded", (fileUrl) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: <img src={fileUrl} alt="file" className="file-preview" /> },
      ]);
    });

    // Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("newMessageNotification");
      socket.off("fileUploaded");
    };
  }, [currentUserId, receiverId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      senderId: currentUserId,
      receiverId,
      message: newMessage,
      timestamp: new Date(),
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      const messageData = {
        senderId: currentUserId,
        receiverId,
        message: response.data.fileUrl,
        timestamp: new Date(),
      };

      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);

      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
      >
        {isChatOpen ? "Close Chat" : "Chat"}
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white rounded-lg shadow-lg p-4">
          <div className="messages max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.senderId === currentUserId ? "sent" : "received"
                }`}
              >
                {msg.message.startsWith("http") ? (
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
            className="input w-full border p-2 mb-2"
          />
          <input type="file" onChange={handleFileChange} className="file-input mb-2" />
          {file && (
            <button
              onClick={handleFileUpload}
              className="bg-gray-200 text-black px-4 py-1 rounded-md"
            >
              Upload
            </button>
          )}
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded-md float-right"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
