const jwt = require('jsonwebtoken');
const secretKey = require('../secretKeyGenerate');

const authenticateToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Unauthorized - Missing Token' });
        }

        jwt.sign(token, secretKey, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: 'Forbidden - Invalid Token' });
            }
            res.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in authenticateToken:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    authenticateToken,
};