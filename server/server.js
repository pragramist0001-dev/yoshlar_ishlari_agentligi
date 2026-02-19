const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
});
app.use('/api/', limiter);

// Routes
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const documentRoutes = require('./routes/documentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Seed route
const { auth, adminOnly } = require('./middleware/auth');
const { seedAll } = require('./controllers/seedController');
app.post('/api/seed', auth, adminOnly, seedAll);

app.get('/', (req, res) => {
    res.json({ message: 'Yoshlar Ishlari Agentligi Termiz Branch API' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    // Handle Multer Limit Error
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max limit is 50MB' });
    }
    // Handle Multer Filter Error
    if (err.message && err.message.includes('File upload only supports')) {
        return res.status(400).json({ message: err.message });
    }
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Database Connection & Admin Seeding
const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log('Local MongoDB not found. Starting MongoMemoryServer for development...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('MongoMemoryServer started successfully at:', uri);
        } else {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    }

    // Seed Admin if not exists
    try {
        const User = require('./models/User');
        const adminExists = await User.findOne({ role: 'superadmin' });
        if (!adminExists) {
            console.log('Creating default superadmin...');
            const admin = new User({
                name: 'Super Admin',
                email: 'admin@yoshlar.uz',
                password: 'adminpassword123',
                role: 'superadmin'
            });
            await admin.save();
            console.log('Default superadmin created: admin@yoshlar.uz / adminpassword123');
        }
    } catch (seedErr) {
        console.error('Error seeding admin:', seedErr);
    }

    // Auto-seed demo content (news, projects, documents, settings)
    try {
        const News = require('./models/News');
        const Project = require('./models/Project');
        const Document = require('./models/Document');
        const Settings = require('./models/Settings');

        const newsCount = await News.countDocuments();
        const projectCount = await Project.countDocuments();
        const docCount = await Document.countDocuments();

        if (newsCount === 0 || projectCount === 0 || docCount === 0) {
            console.log('Seeding demo content...');
            const { seedAll: seedFn } = require('./controllers/seedController');
            // Call seedAll with mock req/res
            await seedFn(
                { body: {} },
                {
                    json: (data) => console.log('Seed result:', JSON.stringify(data.results)),
                    status: (code) => ({ json: (data) => console.error('Seed failed:', data.message) })
                }
            );
            console.log('Demo content seeded successfully!');
        }
    } catch (seedErr) {
        console.error('Error seeding content:', seedErr);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
