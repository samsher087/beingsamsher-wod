import {
  connectDB,
  User,
  TrainingApplication,
  Payment,
  GalleryItem,
  PublicVideo,
} from '../_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

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

    const recentApplications = await TrainingApplication.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(8);

    const recentPayments = await Payment.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(8);

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
  } catch (error) {
    console.error('admin/overview Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}

