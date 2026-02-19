const mongoose = require('mongoose');
require('dotenv').config();
const { seedAll } = require('./controllers/seedController');

const manualSeed = async () => {
    try {
        console.log('Connecting to MongoDB...', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected.');

        // Mock req and res
        const req = { body: {} };
        const res = {
            json: (data) => console.log('Seed Success:', JSON.stringify(data, null, 2)),
            status: (code) => ({
                json: (data) => console.error('Seed Error:', code, data)
            })
        };

        console.log('Starting seed process...');
        await seedAll(req, res);

        console.log('Seed process completed.');
        process.exit(0);
    } catch (err) {
        console.error('Manual seed failed:', err);
        process.exit(1);
    }
};

manualSeed();
