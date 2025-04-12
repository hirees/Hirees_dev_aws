import express from 'express';
import { register, login, logout, updateProfile,getStudents, forgotPassword, verifyCode, resetPassword, modifyProfile, getMinimalStudentDetails, getStudentById, getCompanyByUserId, getCompanyViewStats} from '../controllers/user.controller.js';
import isAuth from '../middleware/isauth.js';
import { singleUpload} from '../middleware/multer.js';

const router = express.Router();

router.post('/register',singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/update', isAuth,singleUpload, updateProfile);
router.get("/students", getStudents);
router.post('/forgot-password',forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password',resetPassword);
router.put('/updatepfp',isAuth,singleUpload,modifyProfile);
router.post('/students-minimal', isAuth, getMinimalStudentDetails);  // Get minimal student details for initial display
router.post('/students/:studentId', isAuth, getStudentById);  // Get full student details with view tracking

// Routes for company data
router.post('/companies/user/:userId', isAuth, getCompanyByUserId);  // Get company by user ID (for displaying remaining views)
router.post('/companies/:companyId/view-stats', isAuth, getCompanyViewStats);  // Get company view statistics

export default router;
