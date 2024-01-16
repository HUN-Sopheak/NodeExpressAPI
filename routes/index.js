// route/index.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth'); // Adjust the path accordingly
const router = express.Router();

// Public route accessible without a token
router.get('/public-route', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Protected route using the authenticateToken middleware
router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
