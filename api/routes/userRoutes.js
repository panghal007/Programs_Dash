const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Handle signup form submission
router.post('/signup', userController.signup);

// Handle login form submission
router.post('/login', userController.login);

module.exports = router;

