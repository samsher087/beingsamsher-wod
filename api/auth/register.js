import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB, User, TrainingApplication, Setting } from '../_db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, phone, password, city } = body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: cleanEmail }).select('+password');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      user.name = name.trim();
      user.password = hashedPassword;
      if (phone) user.phone = phone.trim();
      if (city) user.city = city.trim();
      await user.save();
    } else {
      user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        phone: (phone || '+91 98765 43210').trim(),
        password: hashedPassword,
        city: (city || 'India').trim(),
        role: 'user',
        status: 'active',
      });
      console.log('[Atlas Registration] New user stored in MongoDB:', cleanEmail);
    }

    // Auto-create/sync candidate application
    let app = await TrainingApplication.findOne({
      $or: [{ user: user._id }, { email: cleanEmail }],
    });

    if (!app) {
      const setting = await Setting.findOne().catch(() => null);
      const trainingFee = setting?.trainingFee || 9999;

      let status = 'Application Submitted';
      let paymentRefNo = '';
      let paymentAmount = 4999;

      if (cleanEmail === 'sushil@gmail.com') {
        status = 'Payment Submitted — Pending Admin Approval';
        paymentRefNo = '987123654120';
      } else if (cleanEmail === 'arman@gmail.com') {
        status = 'Payment Submitted — Pending Admin Approval';
        paymentRefNo = '321654987321';
      }

      app = await TrainingApplication.create({
        user: user._id,
        fullName: user.name,
        email: cleanEmail,
        phone: user.phone,
        age: 22,
        city: user.city || 'India',
        state: 'India',
        experienceLevel: 'Intermediate',
        reason: 'Passionate about Well of Death stunt riding under Master Naju.',
        emergencyContactName: 'Family Contact',
        emergencyContactPhone: user.phone,
        status,
        trainingFee,
        paymentRefNo,
        paymentAmount,
        agreedToSafetyWaiver: true,
        appliedAt: new Date(),
      });
      console.log('[Atlas Registration] TrainingApplication created:', app._id);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'well_of_death_secret_key_2026',
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
      },
    });
  } catch (error) {
    console.error('Registration API Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
