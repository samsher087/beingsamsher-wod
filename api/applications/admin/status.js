import { connectDB, TrainingApplication, Payment } from '../../_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const url = new URL(req.url, 'http://localhost');
    const parts = url.pathname.split('/');
    // Could be /api/applications/admin/:id/status or query ?id=... or in body appId
    const idIndex = parts.indexOf('admin') + 1;
    const appId = req.query.id || req.query.appId || body.appId || (idIndex < parts.length ? parts[idIndex] : null);

    if (!appId) {
      return res.status(400).json({ success: false, message: 'Application ID is required' });
    }

    const app = await TrainingApplication.findById(appId);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const { status, adminNotes, rejectionReason, trainingFee } = body;
    if (status) app.status = status;
    if (adminNotes !== undefined) app.adminNotes = adminNotes;
    if (rejectionReason !== undefined) app.rejectionReason = rejectionReason;
    if (trainingFee && Number(trainingFee) > 0) app.trainingFee = Number(trainingFee);

    if (status === 'Training Unlocked') {
      await Payment.findOneAndUpdate(
        { application: app._id },
        { status: 'successful', verifiedAt: new Date() }
      );
    }

    await app.save();

    return res.status(200).json({
      success: true,
      message: `Application updated to ${app.status}`,
      application: app,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
