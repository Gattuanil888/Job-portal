import express from 'express';
import upload from '../config/multer.js';
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume
} from '../controllers/userController.js';
import { requireAuth } from '@clerk/express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
const router = express.Router();


router.get('/user', requireAuth(), getUserData);
router.post('/apply', requireAuth(), applyForJob);
router.get('/applications', requireAuth(), getUserJobApplications);
router.post('/update-resume', requireAuth(), upload.single('resume'), updateUserResume);
router.post('/apply',generateToken ,applyForJob);
// ✅ This is the missing route for saving user
router.post('/', async (req, res) => {
  const { id, name, email, image } = req.body;

  try {
    const existingUser = await User.findById(id);
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    const newUser = new User({
      _id: id,
      name,
      email,
      image,
      resume: ''
    });

    await newUser.save();
    res.status(200).json({ message: 'User saved successfully' });
  } catch (err) {
    console.error('Save user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
