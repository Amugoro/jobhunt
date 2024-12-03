const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const { login } = require ('../controllers/adminAuthController');

const router = express.Router();

router.post('/login', login);
// User management
router.get('/users', isAdmin, adminController.getAllUsers);
router.put('/users/:userId/status', isAdmin, adminController.updateUserStatus);
router.put('/users/:userId/ban', isAdmin, adminController.banUser);
router.post('/users/:userId/reset-password', isAdmin, adminController.resetPassword);
router.get('/jobs', isAdmin, adminController.getAllJobs);
router.put('/jobs/:jobId/status', isAdmin, adminController.updateJobStatus);
router.get('/jobs/flagged', isAdmin, adminController.getFlaggedJobs);
router.delete('/jobs/:jobId', isAdmin, adminController.deleteJob);
router.post('/subadmin/generate', isAdmin, adminController.generateSubadmin);



module.exports = router;
