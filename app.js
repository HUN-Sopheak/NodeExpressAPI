require('dotenv').config();
const express = require('express');
const app = express();
// const db = require('./config/database');
const knex = require('knex');
const config = require('./knexfile');
const port = process.env.API_PORT || 3000;
const routes = require('./routes');

const db = knex(config);

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server is running on port: http://localhost:${port}`);
});
