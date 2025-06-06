const jwt = require('jsonwebtoken');

// Placeholder for JWT_SECRET, ideally from .env
const jwtSecret = process.env.JWT_SECRET || 'your_default_fallback_secret_for_mvp';

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user; // Add user from payload to request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 