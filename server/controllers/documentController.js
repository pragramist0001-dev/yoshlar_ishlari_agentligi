const Document = require('../models/Document');

const getAllDocuments = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const documents = await Document.find(query).sort({ date: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDocument = async (req, res) => {
    try {
        const { title, category, date } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';

        if (!fileUrl) return res.status(400).json({ message: 'File is required' });

        const document = new Document({ title, fileUrl, category, date });
        await document.save();
        res.status(201).json(document);
    } catch (error) {
        console.error('Create Document Error:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        const updates = req.body;
        if (req.file) updates.fileUrl = `/uploads/${req.file.filename}`;

        Object.keys(updates).forEach(key => document[key] = updates[key]);
        await document.save();
        res.json(document);
    } catch (error) {
        console.error('Update Document Error:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllDocuments, createDocument, updateDocument, deleteDocument };
