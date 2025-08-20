const express = require('express');
const Event = require('../models/events');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.getAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { title, date, location, description, image_url } = req.body;
    const id = await Event.create({ title, date, location, description, image_url });
    res.status(201).json({ id, message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add these routes to events.js

// Get a single event
router.get('/:id', async (req, res) => {
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

// Update an event
router.put('/:id', async (req, res) => {
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

// Delete an event
router.delete('/:id', async (req, res) => {
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

module.exports = router;