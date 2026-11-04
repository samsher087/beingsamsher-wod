import jwt from 'jsonwebtoken';
import { connectDB, Payment } from '../_db.js';

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

    let payments = [];
    if (userId) {
      payments = await Payment.find({ user: userId }).sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
