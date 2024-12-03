const express = require('express');
const multer = require('multer');
const { verifyUserDocument } = require('../controllers/verification');
const router = express.Router();



const upload = multer({ dest: 'uploads/' }); 

// Endpoint to verify document and face image
router.post('/verify-document', upload.fields([
  { name: 'document', maxCount: 1 },
  { name: 'faceImage', maxCount: 1 }
]), verifyUserDocument);


module.exports = router;
