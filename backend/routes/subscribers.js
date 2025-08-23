const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM subscribers ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;