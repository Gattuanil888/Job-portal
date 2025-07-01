import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // ✅ correct import
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoute.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import { clerkMiddleware } from '@clerk/express';

dotenv.config(); // ✅ correct usage

const app = express();

async function startServer() {
  await connectDB();
  await connectCloudinary();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/webhooks',clerkMiddleware());

  app.get('/', (req, res) => res.send("API Working"));
  app.post('/webhooks', clerkWebhooks);
  app.use('/api/users', userRoutes);
  app.use('/api/company', companyRoutes);
  app.use('/upload', express.static('upload'));
  app.use('/api/jobs', jobRoutes);

  Sentry.setupExpressErrorHandler(app);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}

startServer(); // 🔁 start server
