const { v4: uuidv4 } = require('uuid');

const generateSecretKey = () => {
	return uuidv4();
};

module.exports = generateSecretKey();
