const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // In a real app, you would check against a users table in the database
  // For now, we'll use a simple hardcoded admin
  if (username === 'admin' && password === 'admin123') {
    const payload = {
      user: {
        id: 1,
        username: 'admin'
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;