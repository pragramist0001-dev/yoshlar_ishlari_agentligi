const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register); // Protect this in production or use for initial setup
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;
