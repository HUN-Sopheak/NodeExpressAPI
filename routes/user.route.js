const userController = require('../controllers/user.controller');
const user = (router, authenticateToken) => {
	router.get('/user/get', authenticateToken, userController.lists);
	router.get('/user/create', authenticateToken, userController.lists);
};

module.exports = user;
