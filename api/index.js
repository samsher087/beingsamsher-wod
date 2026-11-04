import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../server/config/db.js';

import authRoutes from '../server/routes/authRoutes.js';
import applicationRoutes from '../server/routes/applicationRoutes.js';
import paymentRoutes from '../server/routes/paymentRoutes.js';
import courseRoutes from '../server/routes/courseRoutes.js';
import galleryRoutes from '../server/routes/galleryRoutes.js';
import videoRoutes from '../server/routes/videoRoutes.js';
import settingRoutes from '../server/routes/settingRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';
import uploadRoutes from '../server/routes/uploadRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure DB connected on each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[DB Middleware Warn]:', err.message);
  }
  next();
});

// Direct Health Check
app.get(['/api/health', '/health'], (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: 'online',
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes (supporting both /api/* and /*)
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/applications', '/applications'], applicationRoutes);
app.use(['/api/payments', '/payments'], paymentRoutes);
app.use(['/api/courses', '/courses'], courseRoutes);
app.use(['/api/gallery', '/gallery'], galleryRoutes);
app.use(['/api/videos', '/videos'], videoRoutes);
app.use(['/api/settings', '/settings'], settingRoutes);
app.use(['/api/admin', '/admin'], adminRoutes);
app.use(['/api/upload', '/upload'], uploadRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
