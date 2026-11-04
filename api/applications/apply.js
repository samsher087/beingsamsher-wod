import jwt from 'jsonwebtoken';
import { connectDB, User, TrainingApplication } from '../_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName, email, phone, age, city, state, experienceLevel, reason, emergencyContactName, emergencyContactPhone } = body;

    let app = null;
    if (userId) {
      app = await TrainingApplication.findOne({ user: userId });
    }
    if (!app && email) {
      app = await TrainingApplication.findOne({ email: email.toLowerCase() });
    }

    if (app) {
      app.fullName = fullName || app.fullName;
      app.phone = phone || app.phone;
      if (age) app.age = Number(age);
      if (city) app.city = city;
      if (state) app.state = state;
      if (experienceLevel) app.experienceLevel = experienceLevel;
      if (reason) app.reason = reason;
      if (emergencyContactName) app.emergencyContactName = emergencyContactName;
      if (emergencyContactPhone) app.emergencyContactPhone = emergencyContactPhone;
      await app.save();
    } else {
      app = await TrainingApplication.create({
        user: userId,
        fullName,
        email: (email || '').toLowerCase(),
        phone,
        age: Number(age) || 22,
        city: city || 'India',
        state: state || 'India',
        experienceLevel: experienceLevel || 'Intermediate',
        reason: reason || 'Passionate about Well of Death stunt riding under Master Naju.',
        emergencyContactName: emergencyContactName || 'Family Contact',
        emergencyContactPhone: emergencyContactPhone || phone,
        status: 'Application Submitted',
        trainingFee: 9999,
        appliedAt: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      application: app,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
