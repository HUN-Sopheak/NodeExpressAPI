// middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid Token' });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
