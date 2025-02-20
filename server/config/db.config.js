// server/config/db.config.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  // Default XAMPP password is empty
    database: 'gtms_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Database configuration loaded');

module.exports = pool.promise();