const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const connection = async () => {
    try {
        const client = await pool.connect();
        console.log(`Database connected: ${process.env.DB_NAME}`);
    } catch (e) {
        console.error(`Error connecting to DB: ${e.message}`);
    }
};

module.exports = {pool, connection};