import jwt from 'jsonwebtoken';
import {
  connectDB,
  User,
  TrainingApplication,
  Payment,
  Setting,
  GalleryItem,
  PublicVideo,
  AdminAuditLog,
  Course,
} from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname.replace(/^\/api/, '').replace(/\/$/, '') || '/';
    const method = req.method.toUpperCase();
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // 1. ADMIN USERS: /admin/users
    if (path.startsWith('/admin/users')) {
      if (method === 'GET') {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: users.length, users });
      }
      if (method === 'PUT') {
        const parts = path.split('/');
        const userId = req.query.id || parts[parts.indexOf('users') + 1];
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        user.status = user.status === 'active' ? 'suspended' : 'active';
        await user.save();
        return res.status(200).json({ success: true, user });
      }
    }

    // 2. ADMIN OVERVIEW: /admin/overview
    if (path === '/admin/overview' && method === 'GET') {
      const totalUsers = await User.countDocuments({ role: 'user' });
      const totalApplications = await TrainingApplication.countDocuments();
      const pendingApplications = await TrainingApplication.countDocuments({
        status: { $regex: /pending|submitted/i },
      });
      const paidAndUnlockedStudents = await TrainingApplication.countDocuments({
        status: { $regex: /unlocked|approved/i },
      });
      const successfulPayments = await Payment.find({ status: 'successful' });
      const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
      const galleryCount = await GalleryItem.countDocuments().catch(() => 6);
      const publicVideosCount = await PublicVideo.countDocuments().catch(() => 6);
      const recentApplications = await TrainingApplication.find().populate('user', 'name email phone').sort({ createdAt: -1 }).limit(8);
      const recentPayments = await Payment.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(8);

      return res.status(200).json({
        success: true,
        metrics: {
          totalUsers,
          totalApplications,
          pendingApplications,
          paidAndUnlockedStudents,
          successfulPaymentsCount: successfulPayments.length,
          totalRevenue,
          galleryCount: galleryCount || 6,
          publicVideosCount: publicVideosCount || 6,
        },
        recentApplications,
        recentPayments,
      });
    }

    // 3. ADMIN AUDIT LOGS: /admin/audit-logs
    if (path === '/admin/audit-logs' && method === 'GET') {
      const logs = await AdminAuditLog.find().populate('admin', 'name email').sort({ createdAt: -1 }).limit(100);
      return res.status(200).json({ success: true, count: logs.length, logs });
    }

    // 4. ADMIN APPLICATIONS: /applications/admin/all or /applications/admin/:id/status
    if (path === '/applications/admin/all' && method === 'GET') {
      const applications = await TrainingApplication.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: applications.length, applications });
    }
    if (path.startsWith('/applications/admin') && method === 'PUT') {
      const parts = path.split('/');
      const appId = req.query.id || parts[parts.indexOf('admin') + 1];
      const app = await TrainingApplication.findById(appId);
      if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
      const { status, adminNotes, rejectionReason, trainingFee } = body;
      if (status) app.status = status;
      if (adminNotes !== undefined) app.adminNotes = adminNotes;
      if (rejectionReason !== undefined) app.rejectionReason = rejectionReason;
      if (trainingFee && Number(trainingFee) > 0) app.trainingFee = Number(trainingFee);
      if (status === 'Training Unlocked') {
        await Payment.findOneAndUpdate({ application: app._id }, { status: 'successful', verifiedAt: new Date() });
      }
      await app.save();
      return res.status(200).json({ success: true, application: app });
    }

    // 5. ADMIN PAYMENTS: /payments/admin/all
    if (path === '/payments/admin/all' && method === 'GET') {
      const payments = await Payment.find().populate('user', 'name email phone').sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: payments.length, payments });
    }

    // 6. SETTINGS: /settings or /settings/admin
    if (path.startsWith('/settings')) {
      let settings = await Setting.findOne();
      if (!settings) settings = await Setting.create({});
      if (method === 'PUT') {
        Object.assign(settings, body);
        await settings.save();
      }
      return res.status(200).json({ success: true, settings });
    }

    // 7. GALLERY: /gallery
    if (path === '/gallery') {
      if (method === 'GET') {
        const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
        return res.status(200).json({ success: true, count: items.length, items });
      }
      if (method === 'POST') {
        const item = await GalleryItem.create(body);
        return res.status(201).json({ success: true, item });
      }
    }

    // 8. VIDEOS: /videos
    if (path === '/videos') {
      if (method === 'GET') {
        const videos = await PublicVideo.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: videos.length, videos });
      }
      if (method === 'POST') {
        const video = await PublicVideo.create(body);
        return res.status(201).json({ success: true, video });
      }
    }

    // 9. COURSES: /courses/...
    if (path.startsWith('/courses')) {
      const course = await Course.findOne();
      return res.status(200).json({ success: true, course });
    }

    return res.status(404).json({ success: false, message: `Route ${method} ${path} not found` });
  } catch (error) {
    console.error('API Catch-All Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
