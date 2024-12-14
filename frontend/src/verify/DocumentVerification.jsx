import React, { useState } from 'react';
import axios from 'axios';

const DocumentVerification = () => {
  const [document, setDocument] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [documentType, setDocumentType] = useState('individual');
  const [status, setStatus] = useState(null);

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleFaceImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFaceImage(reader.result); 
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('document', document);
    formData.append('documentType', documentType);
    // eslint-disable-next-line no-undef
    formData.append('userId', userId); 
    formData.append('faceImage', faceImage);

    try {
      const response = await axios.post('/verify-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus(response.data.status); 
    } catch (error) {
      setStatus('Verification failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Upload Document for Verification
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Document Type
          </label>
          <select
            onChange={(e) => setDocumentType(e.target.value)}
            value={documentType}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="individual">Individual (ID/Passport)</option>
            <option value="company">Company (Business Registration)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Document
          </label>
          <input
            type="file"
            onChange={handleDocumentChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {documentType === 'individual' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload a Selfie (For Face Verification)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFaceImageChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify Document
          </button>
        </div>
      </form>

      {status && (
        <p
          className={`mt-4 text-center text-lg ${
            status === 'Verification failed'
              ? 'text-red-500'
              : 'text-green-500'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default DocumentVerification;
