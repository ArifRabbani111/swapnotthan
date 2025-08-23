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
// Get event details
router.get('/:id/details', async (req, res) => {
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

// Register for event
router.post('/:id/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const eventId = req.params.id;
    
    // Check if already registered
    const [existing] = await pool.query(
      'SELECT * FROM event_registrations WHERE event_id = ? AND email = ?', 
      [eventId, email]
    );
    
    if (existing.length > 0) {
      return res.status(409).json({ message: 'You are already registered for this event' });
    }
    
    // Register the user
    const [result] = await pool.query(
      'INSERT INTO event_registrations (event_id, name, email, phone) VALUES (?, ?, ?, ?)',
      [eventId, name, email, phone]
    );
    
    res.status(201).json({ 
      message: 'Registration successful', 
      id: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event registrations
router.get('/:id/registrations', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM event_registrations WHERE event_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;