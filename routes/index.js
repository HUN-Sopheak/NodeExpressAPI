const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const authController = require('../controllers/auth.controller'); // Adjust the path accordingly
const router = express.Router();
const user = require('./user.route');

// login route
router.post('/login', authController.login);
//register user
router.post('/register', authController.rigister);

// user route
user(router, authenticateToken);

//logout
router.post('/logout', authenticateToken, authController.logout);
module.exports = router;
