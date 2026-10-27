import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'well_of_death_secret_key_2026'
      );

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User account not found' });
      }

      if (user.status === 'suspended') {
        return res.status(403).json({
          message: 'Account is suspended. Please contact administrator.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('[Auth Error]:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid or expired session token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};
