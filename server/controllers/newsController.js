const News = require('../models/News');

const getAllNews = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const news = await News.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await News.countDocuments(query);

        res.json({
            news,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNewsBySlug = async (req, res) => {
    try {
        const news = await News.findOne({ slug: req.params.slug });
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Increment view count (called separately by frontend for unique views)
const incrementNewsView = async (req, res) => {
    try {
        const news = await News.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.json({ views: news.views });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNews = async (req, res) => {
    try {
        console.log('Create News Request Body:', req.body);
        console.log('Create News Request File:', req.file);

        const { title, description, content, category } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const news = new News({ title, description, content, category, image });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        console.error('Create News ERROR:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            console.error('Validation Errors:', messages);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Bunday sarlavhali yangilik allaqachon mavjud' });
        }
        res.status(400).json({ message: error.message, stack: error.stack });
    }
};

const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        const updates = req.body;
        if (req.file) updates.image = `/uploads/${req.file.filename}`;

        Object.keys(updates).forEach(key => news[key] = updates[key]);
        await news.save();
        res.json(news);
    } catch (error) {
        console.error('Update News ERROR:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            console.error('Validation Errors:', messages);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Bunday sarlavhali yangilik allaqachon mavjud' });
        }
        res.status(400).json({ message: error.message, stack: error.stack });
    }
};

const deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllNews, getNewsBySlug, incrementNewsView, createNews, updateNews, deleteNews };
