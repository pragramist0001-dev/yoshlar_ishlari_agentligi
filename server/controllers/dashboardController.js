const News = require('../models/News');
const Project = require('../models/Project');
const Document = require('../models/Document');
const Application = require('../models/Application');

const getDashboardStats = async (req, res) => {
    try {
        const [newsCount, projectsCount, docsCount, appsCount, recentApps] = await Promise.all([
            News.countDocuments(),
            Project.countDocuments(),
            Document.countDocuments(),
            Application.countDocuments(),
            Application.find().sort({ createdAt: -1 }).limit(5)
        ]);

        res.json({
            stats: [
                { label: 'Yangiliklar', value: newsCount.toString(), icon: 'Newspaper', color: 'bg-green-500' },
                { label: 'Loyihalar', value: projectsCount.toString(), icon: 'Target', color: 'bg-purple-500' },
                { label: 'Hujjatlar', value: docsCount.toString(), icon: 'FileText', color: 'bg-orange-500' },
                { label: 'Murojaatlar', value: appsCount.toString(), icon: 'Users', color: 'bg-blue-500' },
            ],
            recentApplications: recentApps
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
