import express from 'express';
import { registerCompany,getCompany, getCompanyById, updateCompany, getCompaniesWithJobInfo, joinCompany, getAllCompanies, requestJoinCompany, verifyAndJoinCompany} from '../controllers/company.controller.js';
import isAuth from '../middleware/isauth.js';
import { singleUpload } from '../middleware/multer.js';
import { getDashboardData } from '../controllers/dashboard.controller.js';


const router = express.Router();

router.post('/register',isAuth, registerCompany);
router.get('/get',isAuth,getCompany);
router.get('/get/:id',getCompanyById);
router.put('/update/:id',isAuth,singleUpload,updateCompany);
router.get('/companyinfo',getCompaniesWithJobInfo);
router.get('/dashboard', isAuth, getDashboardData);
router.post('/join', isAuth, joinCompany);
router.get('/getall', isAuth, getAllCompanies);
router.post('/request-join', requestJoinCompany);
router.post('/verify-join', verifyAndJoinCompany);

export default router;