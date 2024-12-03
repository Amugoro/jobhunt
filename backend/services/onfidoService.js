const axios = require('axios');
const User = require('../models/User');
const fs = require('fs');

const verifyDocument = async (req, res) => {
  const { documentType, faceImage, userId } = req.body;
  const documentPath = req.file.path;

  try {
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Step 2: Create an Onfido applicant using actual user data
    const applicantResponse = await axios.post('https://api.onfido.com/v3.3/applicants', {
      first_name: user.firstName,
      last_name: user.lastName,
    }, {
      headers: {
        Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const applicantId = applicantResponse.data.id;

    // Step 3: Upload document for verification (ID or company registration)
    const formData = new FormData();
    formData.append('file', fs.createReadStream(documentPath));
    formData.append('type', documentType === 'individual' ? 'passport' : 'business_license');

    const documentResponse = await axios.post(`https://api.onfido.com/v3.3/applicants/${applicantId}/documents`, formData, {
      headers: {
        Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    // Step 4: If face image is provided, upload it and start face verification
    if (faceImage) {
      const faceFormData = new FormData();
      faceFormData.append('file', faceImage); 
      await axios.post(`https://api.onfido.com/v3.3/applicants/${applicantId}/faces`, faceFormData, {
        headers: {
          Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Step 5: Create a check to verify document and face
      await axios.post(`https://api.onfido.com/v3.3/applicants/${applicantId}/checks`, {
        checks: ['document', 'face'],
      }, {
        headers: {
          Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Step 6: If no face image is provided, only check the document
      await axios.post(`https://api.onfido.com/v3.3/applicants/${applicantId}/checks`, {
        checks: ['document'],
      }, {
        headers: {
          Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    }

    // Step 7: Retrieve verification result
    const verificationResult = await axios.get(`https://api.onfido.com/v3.3/applicants/${applicantId}/checks`, {
      headers: {
        Authorization: `Token token=${process.env.ONFIDO_API_KEY}`,
      },
    });

    const result = verificationResult.data.data[0].result;

    // Step 8: If verification is successful (clear), update the user's verification status
    if (result === 'clear') {
      await User.findByIdAndUpdate(userId, { verified: true });
      return res.status(200).send('Document and face verification successful');
    } else {
      return res.status(400).send('Document or face verification failed');
    }

  } catch (error) {
    console.error('Error during document verification:', error);
    res.status(500).send('Verification process failed');
  } finally {
  
    if (fs.existsSync(documentPath)) {
      fs.unlinkSync(documentPath);  
    }
  }
};

module.exports = { verifyDocument };
