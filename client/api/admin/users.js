import { connectDB, User, AdminAuditLog } from '../_db.js';

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

    if (req.method === 'GET') {
      const users = await User.find({}).select('-password').sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    }

    if (req.method === 'PUT') {
      const url = new URL(req.url, 'http://localhost');
      const parts = url.pathname.split('/');
      // e.g. /api/admin/users/:id/status or query ?id=...
      const userId = req.query.id || parts[parts.indexOf('users') + 1];

      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.status = user.status === 'active' ? 'suspended' : 'active';
      await user.save();

      return res.status(200).json({
        success: true,
        message: `User status changed to ${user.status}`,
        user,
      });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('admin/users Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
