const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const hashPassword = require('../config/hashPassword');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({
			where: {
				username: username,
				deleted_at: null,
			},
		});

		if (user) {
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (passwordMatch) {
				const token = jwt.sign(
					{ username },
					process.env.JWT_SECRET_KEY,
					{
						expiresIn: '1w',
					}
				);
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
				res.status(401).json({ message: 'Invalid password' });
			}
		} else {
			res.status(401).json({ message: 'Invalid username' });
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const rigister = async (req, res) => {
	const { full_name, username, password } = req.body;
	try {
		const hashedPassword = await hashPassword(password);
		const newUser = await User.create({
			full_name,
			username,
			password: hashedPassword,
		});
		res.json(newUser);
	} catch (err) {
		res.status(500).json({ message: err.message }).end();
	}
};

const logout = async (req, res) => {
	const authorizationHeader = req.headers.authorization;
	if (authorizationHeader) {
		const token = authorizationHeader.split(' ')[1];
		res.json({ message: 'Logout successful' });
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

module.exports = {
	login: login,
	rigister: rigister,
	logout: logout,
};
