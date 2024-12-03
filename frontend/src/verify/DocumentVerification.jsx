
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
    <div className="document-verification">
      <h2>Upload Document for Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>Document Type</label>
        <select onChange={(e) => setDocumentType(e.target.value)} value={documentType}>
          <option value="individual">Individual (ID/Passport)</option>
          <option value="company">Company (Business Registration)</option>
        </select>

        <label>Upload Document</label>
        <input type="file" onChange={handleDocumentChange} required />
        
        {documentType === 'individual' && (
          <>
            <label>Upload a Selfie (For Face Verification)</label>
            <input type="file" accept="image/*" onChange={handleFaceImageChange} required />
          </>
        )}

        <button type="submit">Verify Document</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default DocumentVerification;
