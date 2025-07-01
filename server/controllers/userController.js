import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary"; // Make sure cloudinary is installed
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

// Configure Cloudinary
// IMPORTANT: Make sure these environment variables are set in your Vercel project settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId; // Assuming req.auth.userId comes from Clerk's requireAuth

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });

  } catch (error) {
    console.error("Error in getUserData:", error); // Log the actual error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};

// apply job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId; // Assuming req.auth.userId comes from Clerk's requireAuth

  console.log("applyForJob called with userId:", userId, "jobId:", jobId);

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: 'Already Applied' });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: 'Job not found'
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now()
    });

    res.json({ success: true, message: 'Job applied successfully' });
  } catch (error) {
    console.error("Error in applyForJob:", error); // Log the actual error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user applied applicants
export const getUserJobApplications = async (req, res) => {
  console.log("Fetching applications for user:", req.auth.userId);

  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate('companyId', 'name email image')
      .populate('jobId', 'title description location category level salary')
      .exec();

    console.log("Applications found:", applications);

    // It's better to return an empty array and success: true if no applications,
    // unless the frontend explicitly expects success:false for no applications.
    // However, your frontend logic seems to handle length === 0, so returning success:true is fine.
    if (!applications || applications.length === 0) {
        return res.json({
            success: true, // Changed to true, as technically the request succeeded in finding no applications
            message: 'No applications found', // More user-friendly message
            applications: [] // Return an empty array
        });
    }

    return res.json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error("Error in getUserJobApplications:", error); // Log the actual error for debugging
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// update user profile(resume)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId; // Get user ID from authentication
    const selectedFile = req.file; // This is the file object from multer.memoryStorage()

    if (!selectedFile) {
      return res.status(400).json({ success: false, message: 'No resume file provided.' });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Convert the file buffer to a base64 string for Cloudinary upload
    const b64 = Buffer.from(selectedFile.buffer).toString("base64");
    const dataURI = "data:" + selectedFile.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const resumeUpload = await cloudinary.uploader.upload(dataURI, {
      folder: "job-portal-user-resumes", // Organize your resumes in a specific folder
      resource_type: "raw", // Use 'raw' for non-image files like PDFs, DOCX, etc.
      // You can also add public_id here if you want a specific name for the file in Cloudinary
      // public_id: `resume-${userId}-${Date.now()}` // Example
    });

    userData.resume = resumeUpload.secure_url; // Save the Cloudinary URL
    await userData.save(); // Save the updated user data to MongoDB

    return res.json({
      success: true,
      message: 'Resume updated successfully',
      resumeUrl: userData.resume // Optionally return the new URL
    });

  } catch (error) {
    console.error('Error in updateUserResume:', error); // Log the actual error for debugging
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong while updating resume.'
    });
  }
};