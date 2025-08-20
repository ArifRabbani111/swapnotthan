const express = require('express');
const Member = require('../models/members');
const router = express.Router();

// Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new member
router.post('/', async (req, res) => {
  try {
    const { name, position, image_url, facebook_url, linkedin_url } = req.body;
    const id = await Member.create({ name, position, image_url, facebook_url, linkedin_url });
    res.status(201).json({ id, message: 'Member created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Add these routes to members.js

// Get a single member
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a member
router.put('/:id', async (req, res) => {
  try {
    const { name, position, image_url, facebook_url, linkedin_url } = req.body;
    const [result] = await pool.query(
      'UPDATE members SET name = ?, position = ?, image_url = ?, facebook_url = ?, linkedin_url = ? WHERE id = ?',
      [name, position, image_url, facebook_url, linkedin_url, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM members WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;