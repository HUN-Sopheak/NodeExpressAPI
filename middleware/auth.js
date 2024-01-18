const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateSecretKey = async () => {
	try {
		const saltRounds = 10;
		const randomString = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(randomString, saltRounds);
	} catch (error) {
		console.error('Error generating secret key:', error.message);
		throw error;
	}
};

const authenticateToken = async (req, res, next) => {
	try {
		const token = req.header('Authorization');

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Unauthorized - Missing Token' });
		}

		// Generate a new secret key dynamically
		const dynamicSecretKey = await generateSecretKey();

		// Verify the token using the dynamically generated secret key
		jwt.verify(token, dynamicSecretKey, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ message: 'Forbidden - Invalid Token' });
			}

			req.user = user;
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
