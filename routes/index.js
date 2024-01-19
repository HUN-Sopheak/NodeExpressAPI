// route/index.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth'); // Adjust the path accordingly
const router = express.Router();
const authController = require('../controllers/authController');

// Public route accessible without a token
router.post('/login', authController.login);

// Protected route using the authenticateToken middleware
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;