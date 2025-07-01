import jwt from 'jsonwebtoken';
import Company from '../models/company.js';

export const protectCompany = async (req, res, next) => {
  try {
    const token = req.headers.token;

    console.log("🔐 Token Header:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decoded.id).select('-password');
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    req.company = company; // ✅ attach company
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
