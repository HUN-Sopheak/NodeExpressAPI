const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
	const { username, password } = req.body;
	if (username === 'admin' && password === '12345') {
		const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1w' });
		res.json({
			data: {
				token,
				token_type: 'bearer',
				expires_in: 604800,
			},
			message: 'Login successful',
		});
	} else {
		res.status(401).json({ message: 'Invalid credentials' });
	}
};
