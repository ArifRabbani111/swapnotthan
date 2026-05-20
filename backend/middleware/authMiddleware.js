const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev-jwt-secret-change-in-production-min-32-chars' : null);
  if (!jwtSecret && process.env.NODE_ENV === 'production') {
    return res.status(500).json({ success: false, message: 'Server misconfiguration: JWT_SECRET not set' });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await Admin.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = { protect };
