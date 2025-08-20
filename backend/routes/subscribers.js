const express = require('express');
const Subscriber = require('../models/subscribers');
const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if email already exists
    const existingSubscriber = await Subscriber.findByEmail(email);
    if (existingSubscriber) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }
    
    const id = await Subscriber.create(email);
    res.status(201).json({ id, message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;