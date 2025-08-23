const express = require('express');
const pool = require('../config/db');
const Event = require('../models/events');
const Member = require('../models/members');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

// Admin dashboard
router.get('/', (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

// Event management
router.get('/events', async (req, res) => {
  try {
    const events = await Event.getAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single event
router.get('/events/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/events', async (req, res) => {
  try {
    const { title, date, location, description, image_url } = req.body;
    const id = await Event.create({ title, date, location, description, image_url });
    res.status(201).json({ id, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route for events (update)
router.put('/events/:id', async (req, res) => {
  try {
    const { title, date, location, description, image_url } = req.body;
    const [result] = await pool.query(
      'UPDATE events SET title = ?, date = ?, location = ?, description = ?, image_url = ? WHERE id = ?',
      [title, date, location, description, image_url, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route for events
router.delete('/events/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Member management
router.get('/members', async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single member
router.get('/members/:id', async (req, res) => {
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

router.post('/members', async (req, res) => {
  try {
    const { name, position, image_url, facebook_url, linkedin_url } = req.body;
    const id = await Member.create({ name, position, image_url, facebook_url, linkedin_url });
    res.status(201).json({ id, message: 'Member created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route for members (update)
router.put('/members/:id', async (req, res) => {
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

// DELETE route for members
router.delete('/members/:id', async (req, res) => {
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