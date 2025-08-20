const pool = require('../config/db');

class Member {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM members');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(member) {
    try {
      const { name, position, image_url, facebook_url, linkedin_url } = member;
      const [result] = await pool.query(
        'INSERT INTO members (name, position, image_url, facebook_url, linkedin_url) VALUES (?, ?, ?, ?, ?)',
        [name, position, image_url, facebook_url, linkedin_url]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Member;