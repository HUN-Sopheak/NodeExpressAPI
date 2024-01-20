require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/database');
const port = process.env.API_PORT || 3000;
const routes = require('./routes');
const sequelize = require('./config/database');
const User = require('./models/user.model');

(async () => {
	try {
		await sequelize.sync();
	} catch (error) {
		console.error('Error synchronizing database:', error);
	} finally {
		if (
			!sequelize.connectionManager.pool ||
			sequelize.connectionManager.pool.isDestroyed
		) {
			sequelize.close();
			console.log('Database connection closed');
		}
	}
})();

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server is running on port: http://locahost:${port}`);
});
