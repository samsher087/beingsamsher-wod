import jwt from 'jsonwebtoken';
import { connectDB, User, TrainingApplication } from '../../_db.js';

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

    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '').trim();

    let userId = null;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'well_of_death_secret_key_2026');
      userId = decoded.id;
    } catch (e) {
      if (token.startsWith('wod_token_')) {
        userId = token.split('_')[2];
      }
    }

    let application = null;
    if (userId) {
      application = await TrainingApplication.findOne({ user: userId });
      if (!application) {
        const user = await User.findById(userId);
        if (user) {
          application = await TrainingApplication.findOne({ email: user.email.toLowerCase() });
        }
      }
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
