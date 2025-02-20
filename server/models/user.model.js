// server/models/user.model.js

const path = require('path');
const db = require(path.join(__dirname, '../config/db.config'));
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const [result] = await db.query(
                'INSERT INTO users (full_name, email, username, password, id_document_path) VALUES (?, ?, ?, ?, ?)',
                [userData.full_name, userData.email, userData.username, hashedPassword, userData.id_document_path]
            );
            
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByUsername(username) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;