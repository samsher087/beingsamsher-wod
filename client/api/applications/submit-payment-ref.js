import jwt from 'jsonwebtoken';
import { connectDB, User, TrainingApplication, Payment } from '../_db.js';

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
    const { paymentRefNo, paymentMethod, amount, paymentNotes } = body;

    let app = null;
    if (userId) {
      app = await TrainingApplication.findOne({ user: userId });
    }

    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const paidAmount = Number(amount) || app.trainingFee || 9999;
    const cleanRefNo = (paymentRefNo || '').trim();

    app.paymentRefNo = cleanRefNo;
    app.paymentMethod = paymentMethod || 'UPI / QR Transfer';
    app.paymentAmount = paidAmount;
    app.status = 'Payment Submitted — Pending Admin Approval';
    await app.save();

    // Create or update Payment record
    let payment = await Payment.findOne({ application: app._id });
    if (!payment) {
      payment = await Payment.create({
        user: app.user,
        application: app._id,
        amount: paidAmount,
        currency: 'INR',
        paymentMethod: app.paymentMethod,
        transactionId: cleanRefNo,
        paymentRefNo: cleanRefNo,
        status: 'pending',
      });
    } else {
      payment.paymentRefNo = cleanRefNo;
      payment.transactionId = cleanRefNo;
      payment.amount = paidAmount;
      payment.status = 'pending';
      await payment.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Payment reference submitted successfully',
      application: app,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
}
