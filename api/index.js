import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from '../server/config/db.js';
import { seedDatabase } from '../server/utils/seedData.js';

import authRoutes from '../server/routes/authRoutes.js';
import applicationRoutes from '../server/routes/applicationRoutes.js';
import paymentRoutes from '../server/routes/paymentRoutes.js';
import courseRoutes from '../server/routes/courseRoutes.js';
import galleryRoutes from '../server/routes/galleryRoutes.js';
import videoRoutes from '../server/routes/videoRoutes.js';
import settingRoutes from '../server/routes/settingRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';
import uploadRoutes from '../server/routes/uploadRoutes.js';

dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure DB connected & seeded if empty
let isSeeded = false;
app.use(async (req, res, next) => {
  try {
    const conn = await connectDB();
    if (conn && !isSeeded) {
      isSeeded = true;
      seedDatabase().catch((e) => console.warn('[Seed Warn]:', e.message));
    }
  } catch (err) {
    console.warn('[DB Middleware Warn]:', err.message);
  }
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Fallback 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `API endpoint '${req.originalUrl}' not found` });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;

