const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', auth, adminOnly, getDashboardStats);

module.exports = router;
