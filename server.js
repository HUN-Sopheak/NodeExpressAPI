const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./config/database');

const port = process.env.API_PORT || 3000;

app.get('/', (req, res) => {
    res.json({ Message: "Hello, world!" });
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});