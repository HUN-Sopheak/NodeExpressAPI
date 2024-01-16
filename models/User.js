const db = require('../config/database');

class User {
  constructor({ id, username, email, password, createdAt, updatedAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async getAllUsers() {
    const [rows, fields] = await db.execute('SELECT * FROM users');
    return rows.map((user) => new User(user));
  }

  static async getUserById(userId) {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return rows.length ? new User(rows[0]) : null;
  }

  static async createUser({ username, email, password }) {
    const [result] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    const userId = result.insertId;
    return await this.getUserById(userId);
  }
}