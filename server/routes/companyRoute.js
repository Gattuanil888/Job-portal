import express from 'express';
import multer from 'multer';
import {
  ChangeJobApplicationsStatus,
  ChangeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
  updateCompanyLogo // ✅ Add this import
} from '../controllers/companyController.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', upload.single('image'), registerCompany);
router.post('/login', upload.none(), loginCompany);
router.get('/company', protectCompany, getCompanyData);
router.get('/getcompanydata', protectCompany, getCompanyData);
router.post('/post-job', protectCompany, postJob);
router.get('/applicants', protectCompany, getCompanyJobApplicants);
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);
router.post('/change-status', protectCompany, ChangeJobApplicationsStatus);
router.post('/change-visibility', protectCompany, ChangeVisiblity);

// ✅ Route to update company logo
router.post('/update-logo', protectCompany, upload.single('image'), updateCompanyLogo);

export default router;
