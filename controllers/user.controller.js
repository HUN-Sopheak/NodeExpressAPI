const User = require('../models/user.model');

const lists = async (req, res) => {
	try {
		const users = await User.findAll({
			where: {
				deleted_at: null,
			},
			attributes: { exclude: ['password'] }, // Exclude the 'password' field
		});
		res.json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	lists: lists,
};
