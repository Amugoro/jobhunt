
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { verifyDocument } = require('../services/onfidoService'); 

// Send an email about the verification status
const sendVerificationEmail = (email, status) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Verification Status',
    text: `Your account verification status is: ${status}`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Handle document verification and update user status
const verifyUserDocument = async (req, res) => {
    const { documentType, userId } = req.body;
    const document = req.files.document[0]; 
    const faceImage = req.files.faceImage[0];
  
    try {
      
      const isVerified = await verifyDocument(userId, document, faceImage, documentType);
  


      if (isVerified) {
        await User.findByIdAndUpdate(userId, { isVerified: true });
        await sendEmail(userId, "Verification Successful", "Your account is now verified.");
        res.json({ status: "verified", message: "Verification successful!" });
      } else {
        await sendEmail(userId, "Verification Failed", "Please retry the verification process.");
        res.json({ status: "unverified", message: "Verification failed. Try again." });
      }
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ status: "error", message: "Verification process failed." });
    }
};
module.exports = { verifyUserDocument };
