const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Attempt to connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }

    console.log('\x1b[32mConnected to the database successfully!\x1b[0m');
});

// Handle errors during the connection
connection.on('error', (err) => {
    console.error('Database connection error:', err);
    // You might want to handle errors, close connections, or take other appropriate actions here
});

module.exports = connection;