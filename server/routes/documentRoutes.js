const express = require('express');
const { getAllDocuments, createDocument, updateDocument, deleteDocument } = require('../controllers/documentController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getAllDocuments);
router.post('/', auth, adminOnly, upload.single('file'), createDocument);
router.put('/:id', auth, adminOnly, upload.single('file'), updateDocument);
router.delete('/:id', auth, adminOnly, deleteDocument);

module.exports = router;
