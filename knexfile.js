require('dotenv').config();

module.exports = {
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: './migrations',
	},
	seeds: {
		directory: './seeds',
	},
};