const express = require('express');
const { createApplication, getAllApplications, updateApplicationStatus, getNewApplicationsCount } = require('../controllers/applicationController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', createApplication);
router.get('/', auth, adminOnly, getAllApplications);
router.get('/count', auth, adminOnly, getNewApplicationsCount);
router.patch('/:id', auth, adminOnly, updateApplicationStatus);

module.exports = router;
