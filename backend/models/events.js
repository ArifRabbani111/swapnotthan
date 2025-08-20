const pool = require('../config/db');

class Event {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM events ORDER BY date ASC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(event) {
    try {
      const { title, date, location, description, image_url } = event;
      const [result] = await pool.query(
        'INSERT INTO events (title, date, location, description, image_url) VALUES (?, ?, ?, ?, ?)',
        [title, date, location, description, image_url]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Event;