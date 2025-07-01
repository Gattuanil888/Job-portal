// ✅ FIXED jobRoutes.js
import express from 'express';
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();

// ✅ This now maps to GET /api/jobs
router.get('/', getJobs);

// ✅ This maps to GET /api/jobs/:id
router.get('/:id', getJobById);

export default router;
