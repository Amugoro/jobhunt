
const express = require('express');
const multer = require('multer');
const { createOrUpdateProfile, getProfile } = require('../controllers/freelancerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Setup multer for profile picture upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Check the field name and set the destination directory
        if (file.fieldname === 'profilePicture') {
            cb(null, 'uploads/profiles/'); 
        } else if (file.fieldname === 'resume') {
            cb(null, 'uploads/resumes/'); 
        } else {
            cb(new Error('Invalid field name'), null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/profile', protect, upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]), createOrUpdateProfile);
router.get('/profile', protect, getProfile);

module.exports = router;
