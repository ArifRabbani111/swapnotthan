const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Create the Express app first
const app = express();
const PORT = process.env.PORT || 3000;

// Then import your routes
const eventsRouter = require('./routes/events');
const membersRouter = require('./routes/members');
const subscribersRouter = require('./routes/subscribers');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/auth', authRouter);
app.use('/admin', adminRouter);

// Serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});