const jwt = require('jsonwebtoken');
const secretKey = require('../secretKeyGenerate');
const User = require('../models/user.model');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username: username,
        deleted_at: null,
      },
    });

    if (user && user.password === password) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1w' });
      res.json({
        data: {
          username: username,
          token,
          token_type: 'bearer',
          expires_in: 604800,
        },
        message: 'Login successful',
      });
    } else {
      // Provide specific messages for invalid username or password
      if (!user) {
        res.status(401).json({ message: 'Invalid username' });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  login: login,
};
