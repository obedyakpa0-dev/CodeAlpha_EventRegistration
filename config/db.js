const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const query = (text, param) => pool.query(text, param);


module.exports = { query };

pool.connect((err, client, release) => {
    if (err) {
        console.error('DB connection error:', err.message);
    } else {
        console.log('DB connected successfully!');
        release();
    }
});