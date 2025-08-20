const pool = require('../config/db');

class Subscriber {
  static async create(email) {
    try {
      const [result] = await pool.query(
        'INSERT INTO subscribers (email) VALUES (?)',
        [email]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM subscribers WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Subscriber;