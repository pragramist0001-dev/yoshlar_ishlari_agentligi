const express = require('express');
const { getAllProjects, getProjectById, incrementProjectView, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/:id/view', incrementProjectView);
router.post('/', auth, adminOnly, upload.single('image'), createProject);
router.put('/:id', auth, adminOnly, upload.single('image'), updateProject);
router.delete('/:id', auth, adminOnly, deleteProject);

module.exports = router;
