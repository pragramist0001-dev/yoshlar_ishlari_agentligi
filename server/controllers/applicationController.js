const Application = require('../models/Application');

const createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        console.error('Create Application Error:', error);
        res.status(400).json({ message: error.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (error) {
        console.error('Update Application Status Error:', error);
        res.status(400).json({ message: error.message });
    }
};

const getNewApplicationsCount = async (req, res) => {
    try {
        const count = await Application.countDocuments({ status: 'new' });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createApplication, getAllApplications, updateApplicationStatus, getNewApplicationsCount };
