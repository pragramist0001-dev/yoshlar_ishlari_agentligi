const express = require('express');
const { getAllNews, getNewsBySlug, incrementNewsView, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getAllNews);
router.get('/:slug', getNewsBySlug);
router.post('/:slug/view', incrementNewsView);
router.post('/', auth, adminOnly, upload.single('image'), createNews);
router.put('/:id', auth, adminOnly, upload.single('image'), updateNews);
router.delete('/:id', auth, adminOnly, deleteNews);

module.exports = router;
