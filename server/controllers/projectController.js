const Project = require('../models/Project');

const getAllProjects = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Increment view count (called separately by frontend for unique views)
const incrementProjectView = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ views: project.views });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description, status, deadline } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const project = new Project({ title, description, status, image, deadline });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Create Project Error Details:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const updates = req.body;
        if (req.file) updates.image = `/uploads/${req.file.filename}`;

        Object.keys(updates).forEach(key => project[key] = updates[key]);
        await project.save();
        res.json(project);
    } catch (error) {
        console.error('Update Project Error Details:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProjects, getProjectById, incrementProjectView, createProject, updateProject, deleteProject };
