const express = require('express');
const { getSettings, updateSettings, addLeader, deleteLeader, uploadHeroMedia, deleteHeroMedia, addHeroSlide, deleteHeroSlide, seedDefaultHeroSlides } = require('../controllers/settingsController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { heroMediaUpload } = require('../middleware/upload');
const router = express.Router();

router.get('/', getSettings);
router.put('/', auth, adminOnly, updateSettings);

// Leadership
router.post('/leaders', auth, adminOnly, upload.single('image'), addLeader);
router.delete('/leaders/:id', auth, adminOnly, deleteLeader);

// Hero slides (multi-slide system)
router.post('/hero-slides', auth, adminOnly, heroMediaUpload.single('media'), addHeroSlide);
router.delete('/hero-slides/:id', auth, adminOnly, deleteHeroSlide);

// Legacy single hero media
router.post('/hero-media', auth, adminOnly, heroMediaUpload.single('media'), uploadHeroMedia);
router.delete('/hero-media', auth, adminOnly, deleteHeroMedia);

// Seed default slides
router.post('/hero-slides/seed', auth, adminOnly, seedDefaultHeroSlides);

module.exports = router;
