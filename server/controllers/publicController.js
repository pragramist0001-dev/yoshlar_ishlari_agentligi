const News = require('../models/News');
const Project = require('../models/Project');
const Document = require('../models/Document');
const Application = require('../models/Application');

const getPublicStats = async (req, res) => {
    try {
        const [newsCount, projectsCount, docsCount, appsCount] = await Promise.all([
            News.countDocuments(),
            Project.countDocuments(),
            Document.countDocuments(),
            Application.countDocuments(),
        ]);

        // Mapping to the labels used in HomeStats.tsx or similar
        res.json([
            { label: 'Agentlik Yangiliklari', value: newsCount.toString(), icon: 'Newspaper' },
            { label: 'Yoshlar Loyihalari', value: projectsCount.toString(), icon: 'Target' },
            { label: 'Rasmiy Hujjatlar', value: docsCount.toString(), icon: 'FileText' },
            { label: 'Kelib tushgan murojaatlar', value: appsCount.toString(), icon: 'Users' },
        ]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPublicStats };
