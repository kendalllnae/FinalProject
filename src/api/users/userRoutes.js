// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Define a route for getting a user profile
router.get('/profile', (req, res) => {
  res.send('User profile data');
});

// Define a route for user registration
router.post('/register', (req, res) => {
  // Logic for user registration
  res.send('User registered');
});

// Export the router to be used in server.js
module.exports = router;
